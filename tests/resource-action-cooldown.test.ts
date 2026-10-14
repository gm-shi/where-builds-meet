import umbraBuffs from "@gamedata/buff/bellstrike-umbra.json"
import umbraDots from "@gamedata/dot/bellstrike-umbra.json"
import spearSkills from "@gamedata/skill/heavenquaker-spear.json"
import swordSkills from "@gamedata/skill/strategic-sword.json"
import { describe, expect, it } from "vitest"

import {
  buildRotationTimeline,
  type RotationStep,
  type TimelineBuildInput,
  type TimelineRow,
} from "@/calculations/rotationTimeline"

import { castStep, delayStep } from "./helpers/rotationSteps"
import { asEffectDefinitions, asSkillRecords } from "./helpers/shippedData"

// A resource action's `cooldown` is the same per-action cooldown that damage,
// apply, and trigger actions honour: once it fires, later casts skip that action
// until the window elapses. Resource snapshots are taken when a row starts, so
// an empty Observe cast reads the meter after the previous cast's actions.
describe("resource action cooldown", () => {
  const build = (steps: RotationStep[], extra: Partial<TimelineBuildInput>): TimelineRow[] =>
    buildRotationTimeline({
      rotation: { name: "Resource action cooldown", steps },
      skills: {},
      eventDefinitions: {},
      dots: {},
      effectDefinitions: {},
      innerWayConditions: [],
      innerWayRules: [],
      setupEffects: [],
      weapons: [],
      initialResources: { Endurance: 0 },
      resourceMaximums: { Endurance: 100 },
      ...extra,
    })
  const enduranceAt = (rows: TimelineRow[], skill: string) =>
    rows.filter(row => row.step.skill === skill).map(row => row.resources?.Endurance)

  it("grants the resource once per cooldown window instead of on every cast", () => {
    const refund = { type: "addResource", value: "Endurance", amount: 20, time: 0, cooldown: 12 }
    const skills = {
      Refund: { castTime: 0, action: [refund] },
      // Same action shape under another skill: cooldowns are keyed per skill and action.
      OtherRefund: { castTime: 0, action: [refund] },
      Observe: { castTime: 0, action: [] },
    }
    const rows = build(
      [
        castStep("Refund"),
        castStep("Observe"),
        delayStep(1),
        castStep("Refund"),
        castStep("Observe"),
        castStep("OtherRefund"),
        castStep("Observe"),
        delayStep(11),
        castStep("Refund"),
        castStep("Observe"),
        castStep("Refund"),
        castStep("Observe"),
      ],
      { skills },
    )
    expect(enduranceAt(rows, "Observe")).toEqual([20, 20, 40, 60, 60])
  })

  it("still spends the skill's other resource actions while a refund cools down", () => {
    const skills = {
      Spend: {
        castTime: 0,
        action: [
          { type: "consumeResource", value: "Endurance", amount: 40, time: 0 },
          { type: "addResource", value: "Endurance", amount: 20, time: 0, cooldown: 12 },
        ],
      },
      Observe: { castTime: 0, action: [] },
    }
    const rows = build([castStep("Spend"), castStep("Observe"), delayStep(1), castStep("Spend"), castStep("Observe")], {
      skills,
      initialResources: { Endurance: 100 },
    })
    // 100 - 40 + 20, then 80 - 40 with the refund still cooling down.
    expect(enduranceAt(rows, "Observe")).toEqual([80, 40])
  })

  it("refunds Heavenquaker Sweep All Endurance once per 12 seconds", () => {
    const skills = {
      ...asSkillRecords(spearSkills),
      BloodBurstDamage: asSkillRecords(swordSkills).BloodBurstDamage,
      Empower: {
        castTime: 0,
        action: [{ type: "apply", target: "self", value: "EmpoweredRiverFlow", duration: 60, time: 0 }],
      },
      Observe: { castTime: 0, action: [] },
    }
    const rows = build(
      [
        castStep("Empower"),
        castStep("SweepAll"),
        castStep("Observe"),
        castStep("SweepAll"),
        castStep("Observe"),
        delayStep(12),
        castStep("SweepAll"),
        castStep("Observe"),
      ],
      {
        skills,
        effectDefinitions: asEffectDefinitions(umbraBuffs),
        dots: asSkillRecords(umbraDots),
        innerWayConditions: ["WolfchasersArtT4"],
        initialResources: { Endurance: 100 },
      },
    )
    // Each Sweep All spends 40; only the first and the post-cooldown cast refund 20.
    expect(enduranceAt(rows, "Observe")).toEqual([80, 40, 20])
  })
})

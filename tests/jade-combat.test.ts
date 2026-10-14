import system from "@gamedata/system.json"
import { describe, expect, it } from "vitest"

import { innerWayConditionsFor, innerWayEffectRulesFor } from "@/application/characterComposition"
import { martialArtDefinitions } from "@/application/gameData/martialArts"
import { allSkillDefinitions, effectDefinitions } from "@/application/gameData/skills"
import { emptyAttunementStats } from "@/calculations/attunementStats"
import { calculateDerivedStats } from "@/calculations/effectiveStats"
import { calculateRotationBaseline, type RotationSimulationBundle } from "@/calculations/rotationCalculator"
import type { EditableObject, RotationStep, SkillRecord, TimelineRow } from "@/calculations/rotationTimeline"
import { martialArtEffectsForRank } from "@/data/martialArtTalents"
import { emptyStats } from "@/data/statDefinitions"
import type { BuildSetup } from "@/gear"

import { castStep } from "./helpers/rotationSteps"

type Options = {
  innerWays?: BuildSetup["innerWays"]
  blossoms?: number
  probe?: { tags?: string[]; actions?: EditableObject[] }
  skills?: Record<string, SkillRecord>
  talentRank?: number
}

function calculate(steps: RotationStep[], options: Options = {}) {
  const innerWays = options.innerWays ?? []
  const stats = { ...emptyStats, maxHp: 10000, minPhys: 1000, maxPhys: 1000, precision: 1 }
  const weapons = ["vernalUmbrella", "inkwellFan"] as const
  const bundle: RotationSimulationBundle = {
    timeline: {
      rotation: { name: "Jade probe", ping: 0, steps },
      skills: {
        ...allSkillDefinitions,
        ...options.skills,
        Probe: { castTime: 20, tags: options.probe?.tags ?? ["DirectDamage"], action: options.probe?.actions ?? [] },
      },
      effectDefinitions,
      dots: {},
      eventDefinitions: {},
      setupEffects:
        options.talentRank === undefined
          ? []
          : martialArtEffectsForRank(martialArtDefinitions, weapons, options.talentRank),
      weapons: [...weapons],
      maxHP: stats.maxHp,
      initialResources: { ...system.initialResources, Blossoms: options.blossoms ?? system.initialResources.Blossoms },
      resourceMaximums: system.resourceMaximums,
      resourceRegeneration: system.resourceRegeneration,
      innerWayConditions: [...innerWayConditionsFor(innerWays, undefined, "silkbindJade")],
      innerWayRules: innerWayEffectRulesFor(innerWays, 21, "silkbindJade"),
      cooldownPolicy: "wait",
    },
    stats,
    derivedStats: calculateDerivedStats(stats, 0),
    attunement: emptyAttunementStats,
    enemy: {
      name: "Target",
      level: 96,
      defense: 0,
      physicalResistance: 0,
      bellstrikeResistance: 0,
      stonesplitResistance: 0,
      silkbindResistance: 0,
      bamboocutResistance: 0,
      judgementResistance: 0,
    },
    weapons: [...weapons],
    startAnchor: { rowId: "rotation-0" },
    statPriority: [],
    attunementPriority: [],
    innerWayPriority: [],
    setupComparisons: {},
  }
  return calculateRotationBaseline(bundle)
}

const rowsOf = (timeline: TimelineRow[], skill: string) =>
  timeline.filter(row => row.kind !== "damageGroup" && row.step.type === "skill" && row.step.skill === skill)
const blossomsAt = (row: TimelineRow, index = 0) =>
  row.actionStates[index]?.resources.Blossoms ?? row.resources.Blossoms
const sample = (time: number) => ({ type: "addResource", value: "Blossoms", amount: 0, time })
const blossomBarrage = (tier: number) => [{ innerWay: "BlossomBarrage", tier: `T${tier}` }]
const gourdToss = (tier: number) => [{ innerWay: "GourdToss", tier: `T${tier}` }]

describe("Silkbind Jade floating umbrella", () => {
  it("fires a paid shot each half second and recalls itself once fewer than 5 Blossoms remain", () => {
    const { timeline } = calculate([castStep("UnfadingFlower"), castStep("Probe")], {
      probe: { actions: [sample(19)] },
    })
    const launch = rowsOf(timeline, "UnfadingFlower")[0]
    const shots = rowsOf(timeline, "FloatingUmbrellaShot")
    const [recall] = rowsOf(timeline, "FloatingUmbrellaRecall")
    expect(shots.length).toBeGreaterThan(10)
    shots.forEach((shot, index) => {
      expect(shot.startTime - launch.startTime).toBeCloseTo(0.6 + 0.55 + index * 0.5, 9)
      expect(shot.resources.Blossoms).toBeGreaterThanOrEqual(5)
    })
    // The last shot leaves less than one shot's cost, which ends the drone on that volley.
    expect(recall.startTime).toBeCloseTo(shots.at(-1)!.startTime, 9)
    expect(recall.resources.Blossoms).toBeLessThan(5)
    const probe = rowsOf(timeline, "Probe")[0]
    expect(probe.actionStates[0].buffs.has("FloatingUmbrella")).toBe(false)
    // Ending returns 15 Blossoms; afterwards only passive regeneration moves the meter.
    expect(blossomsAt(probe)).toBeCloseTo(
      recall.resources.Blossoms + 15 + 0.3 * (probe.startTime + 19 - recall.startTime),
      9,
    )
    expect(timeline.some(row => row.step.skill === "FloatingUmbrellaShot" && row.startTime > recall.startTime)).toBe(
      false,
    )
  })

  it.each([13, 14])("returns 3 Blossoms per shot on an Exhausted target at talent rank %s", rank => {
    const spentPerVolley = (exhausted: boolean, talentRank?: number) => {
      const { timeline } = calculate([castStep("Exhaust"), castStep("UnfadingFlower"), castStep("Probe")], {
        talentRank,
        skills: {
          Exhaust: {
            castTime: 0,
            action: exhausted ? [{ type: "apply", target: "target", value: "Exhausted", time: 0 }] : [],
          },
        },
      })
      const [, second, third] = rowsOf(timeline, "FloatingUmbrellaShot")
      return second.resources.Blossoms - third.resources.Blossoms
    }
    // Each volley spends 5 and regenerates 0.15 over the half second between volleys.
    expect(spentPerVolley(true, rank)).toBeCloseTo(5 - 3 - 0.15, 9)
    expect(spentPerVolley(false, rank)).toBeCloseTo(5 - 0.15, 9)
    expect(spentPerVolley(true)).toBeCloseTo(5 - 0.15, 9)
  })

  it("needs 50 Blossoms to throw the umbrella", () => {
    const { timeline, actionBreakdowns } = calculate([castStep("UnfadingFlower"), castStep("Probe")], { blossoms: 49 })
    const launch = rowsOf(timeline, "UnfadingFlower")[0]
    expect(rowsOf(timeline, "FloatingUmbrellaShot")).toHaveLength(0)
    expect(actionBreakdowns[`${launch.id}:0`]?.total ?? 0).toBe(0)
  })

  it("adds a paid extra shot to each volley while the target carries Lingering Bone", () => {
    const { timeline } = calculate([castStep("UnfadingFlower"), castStep("ForsakenFame"), castStep("Probe")])
    const lingering = rowsOf(timeline, "ForsakenFame")[0]
    const applied = lingering.startTime + 71 / 60
    const extra = rowsOf(timeline, "FloatingUmbrellaExtraShot")
    expect(extra.length).toBeGreaterThan(0)
    for (const shot of extra) {
      expect(shot.startTime).toBeGreaterThanOrEqual(applied)
      expect(shot.startTime).toBeLessThan(applied + 2)
      const volley = rowsOf(timeline, "FloatingUmbrellaShot").find(
        row => Math.abs(row.startTime - shot.startTime) < 1e-9,
      )!
      // Both shots of the volley are paid before the next volley.
      expect(volley.resources.Blossoms - shot.resources.Blossoms).toBeCloseTo(5, 9)
    }
  })

  it("is recalled by another umbrella skill but not by Hidden Sword, refunding at most once every 5 s", () => {
    const recalled = calculate(
      [
        castStep("UnfadingFlower"),
        castStep("SpringSorrow"),
        castStep("UnfadingFlower"),
        castStep("SpringSorrow"),
        castStep("Probe"),
      ],
      { blossoms: 60, innerWays: blossomBarrage(0) },
    ).timeline
    const recalls = rowsOf(recalled, "FloatingUmbrellaRecall")
    const casts = rowsOf(recalled, "SpringSorrow")
    expect(recalls.map(row => row.startTime)).toEqual(casts.map(row => row.startTime))
    expect(recalls[1].startTime - recalls[0].startTime).toBeLessThan(5)
    // Each cast starts before the drone's first shot, so between the cast start and its
    // hit only the recall refund and regeneration move the meter.
    const refunds = casts.map(row => blossomsAt(row) - row.resources.Blossoms - 0.3 * Number(row.actions[0].time))
    expect(refunds[0]).toBeCloseTo(15, 9)
    expect(refunds[1]).toBeCloseTo(0, 9)

    const kept = calculate([castStep("UnfadingFlower"), castStep("HiddenSwordLight1"), castStep("Probe")]).timeline
    const probe = rowsOf(kept, "Probe")[0]
    expect(rowsOf(kept, "FloatingUmbrellaRecall").filter(row => row.startTime < probe.startTime)).toHaveLength(0)
    expect(probe.buffs.has("FloatingUmbrella")).toBe(true)
  })
})

describe("Silkbind Jade Blossoms", () => {
  it("regenerate from battle start and stop at the 100 cap", () => {
    const { timeline } = calculate(
      [castStep("Probe"), castStep("SpringSorrow"), castStep("ColorfulPhoenix"), castStep("Observe")],
      { blossoms: 40, probe: { actions: [sample(10)] }, skills: { Observe: { castTime: 0, action: [sample(0)] } } },
    )
    expect(blossomsAt(rowsOf(timeline, "Probe")[0])).toBeCloseTo(43, 9)
    // 46 Blossoms plus Spring Sorrow's 20 and Colorful Phoenix's 45 overflow the cap.
    expect(blossomsAt(rowsOf(timeline, "Observe")[0])).toBe(100)
  })
})

describe("Silkbind Jade Combo", () => {
  const twoCasts = [castStep("SpringSorrow"), castStep("SpringSorrow"), castStep("Probe")]

  it.each([
    [undefined, false, 0],
    [0, true, 10],
    [3, true, 15],
  ])("Blossom Barrage T%s applies Combo on Spring Sorrow's hit: %s for %s s", (tier, applied, duration) => {
    const { timeline } = calculate(twoCasts, { innerWays: tier === undefined ? [] : blossomBarrage(tier) })
    const [first, second] = rowsOf(timeline, "SpringSorrow")
    expect(first.actionStates[0].debuffs.has("Combo")).toBe(false)
    expect(second.actionStates[0].debuffs.has("Combo")).toBe(applied)
    const combo = rowsOf(timeline, "Probe")[0].debuffs.get("Combo")
    expect((combo?.expiresAt ?? 0) - (combo?.appliedAt ?? 0)).toBeCloseTo(duration, 9)
  })

  it("refunds 5 s and 25 Blossoms at T6 only when the hit lands on a Combo target", () => {
    const sixth = calculate([...twoCasts.slice(0, 2), castStep("Probe")], { innerWays: blossomBarrage(6), blossoms: 0 })
    const fifth = calculate([...twoCasts.slice(0, 2), castStep("Probe")], { innerWays: blossomBarrage(5), blossoms: 0 })
    const gain = (timeline: TimelineRow[]) => blossomsAt(rowsOf(timeline, "Probe")[0])
    const regeneration = 0.3 * rowsOf(sixth.timeline, "Probe")[0].startTime
    expect(gain(fifth.timeline)).toBeCloseTo(40 + regeneration, 9)
    expect(gain(sixth.timeline)).toBeCloseTo(65 + regeneration, 9)
  })

  it("recovers Spring Sorrow charges one at a time, each Combo hit shortening the recovering charge", () => {
    const steps = Array.from({ length: 5 }, () => castStep("SpringSorrow"))
    const starts = (tier: number) =>
      rowsOf(calculate(steps, { innerWays: blossomBarrage(tier) }).timeline, "SpringSorrow").map(row => row.startTime)
    const cast = 67 / 60
    // T5: two charges, no refund. The third cast waits for the first charge (15 s); the
    // second only starts recovering when the first returns, so the fourth waits until 30 s.
    expect(starts(5)).toEqual([0, cast, 15, 30, 45].map(value => expect.closeTo(value, 9)))
    // T6: three charges. Casts two and three hit a Combo target, so the recovering
    // charge returns 10 s early; the fourth cast's own hit shortens the next one.
    expect(starts(6)).toEqual([0, cast, 2 * cast, 5, 15].map(value => expect.closeTo(value, 9)))
  })

  it.each([
    [["DirectDamage", "VernalUmbrella", "Ballistic"], true],
    [["DirectDamage", "VernalUmbrella", "Heavy"], false],
    [["DirectDamage", "InkwellFan", "Ballistic"], false],
  ])("raises the Combo bonus on Exhausted targets from T4 for %j: %s", (tags, eligible) => {
    const actions = (exhausted: boolean) => [
      { type: "apply", target: "target", value: "Combo", time: 0 },
      ...(exhausted ? [{ type: "apply", target: "target", value: "Exhausted", time: 0 }] : []),
      { type: "damage", phyCoef: 1, attrCoef: 1, time: 1 },
    ]
    const damage = (tier: number, exhausted: boolean) =>
      calculate([castStep("Probe")], { innerWays: blossomBarrage(tier), probe: { tags, actions: actions(exhausted) } })
        .metrics.totalDamage
    expect(damage(4, false) / damage(3, false)).toBeCloseTo(1, 12)
    expect(damage(4, true) / damage(3, true)).toBeCloseTo(eligible ? 1.3 / 1.25 : 1, 12)
    const plain = calculate([castStep("Probe")], {
      innerWays: blossomBarrage(3),
      probe: { tags, actions: [{ type: "damage", phyCoef: 1, attrCoef: 1, time: 1 }] },
    }).metrics.totalDamage
    expect(damage(3, false) / plain).toBeCloseTo(eligible ? 1.25 : 1, 12)
  })
})

describe("Silkbind Jade damage buckets", () => {
  it("multiplies the non-player bonus separately and adds Jadebreak's 10% to that bucket", () => {
    const forsakenFame = allSkillDefinitions.ForsakenFame
    const withoutBonus = { ForsakenFame: { ...forsakenFame, modifier: [] } }
    const damage = (steps: RotationStep[], skills?: Record<string, SkillRecord>) => {
      const { timeline, actionBreakdowns } = calculate(steps, { skills })
      const row = rowsOf(timeline, "ForsakenFame")[0]
      const index = row.actions.findIndex(action => action.type === "damage")
      return actionBreakdowns[`${row.id}:${index}`].total
    }
    const plain = [castStep("ForsakenFame")]
    const shielded = [castStep("JadewindShieldCancel"), castStep("ForsakenFame")]
    expect(damage(plain) / damage(plain, withoutBonus)).toBeCloseTo(1.45, 12)
    // Jadebreak's additive 30% cancels out of the ratio; its 10% joins the 45%.
    expect(damage(shielded) / damage(shielded, withoutBonus)).toBeCloseTo(1.55 / 1.1, 12)
  })
})

describe("Silkbind Jade fan cooldowns", () => {
  it.each([5, 6])("chains Windrider into the five-hit Moon Shatter Spring; Gourd Toss T%s resets it at T6", tier => {
    const steps = [castStep("MoonShatterSpring"), castStep("PeaksSpringlessSilence"), castStep("MoonShatterSpring")]
    const { timeline } = calculate(steps, { innerWays: gourdToss(tier) })
    const [first, second] = rowsOf(timeline, "MoonShatterSpring")
    const peak = rowsOf(timeline, "PeaksSpringlessSilence")[0]
    const hits = (row: TimelineRow) => row.actions.filter(action => action.type === "damage").length
    expect([hits(first), hits(second)]).toEqual([3, 5])
    expect(second.startTime).toBeCloseTo(tier === 6 ? peak.startTime + 67 / 60 : first.startTime + 6, 9)
  })

  it("gives Peak's Springless Silence two charges and a 15 s cooldown with Gourd Toss", () => {
    const steps = Array.from({ length: 3 }, () => castStep("PeaksSpringlessSilence"))
    const starts = (innerWays: BuildSetup["innerWays"]) =>
      rowsOf(calculate(steps, { innerWays }).timeline, "PeaksSpringlessSilence").map(row => row.startTime)
    const cast = 67 / 60
    expect(starts([])).toEqual([0, 12, 24].map(value => expect.closeTo(value, 9)))
    expect(starts(gourdToss(0))).toEqual([0, cast, 15].map(value => expect.closeTo(value, 9)))
    // The first charge's recovery is shortened by T3's 3 s on each hit and T1's 3 s at
    // each cast end, four times before the third cast.
    expect(starts(gourdToss(3))[2]).toBeCloseTo(15 - 4 * 3, 9)
  })
})

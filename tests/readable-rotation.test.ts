// @vitest-environment jsdom
import { readFile } from "node:fs/promises"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import type { TimelineRow } from "../src/calculations/rotationTimeline"
import { initializeI18n } from "../src/i18n"
import { readableRotationText } from "../src/readableRotation"

// The text is interface copy, so the shipped locale is loaded and the translated form asserted.
beforeEach(async () => {
  vi.stubGlobal("fetch", async (url: string) => ({
    ok: true,
    json: async () => JSON.parse(await readFile(`public/locales/${url.split("/").at(-1)}`, "utf8")),
  }))
  await initializeI18n()
})

afterEach(() => vi.unstubAllGlobals())

// Ported from script/probe/check-readable-rotation.mjs.
function skillRow(
  index: number,
  startTime: number,
  castTime: number,
  shortName: string,
  actions = [{ type: "damage", time: castTime }],
) {
  return {
    id: `rotation-${index}`,
    kind: "rotation",
    rotationIndex: index,
    order: index * 1000,
    step: { type: "skill", skill: `Skill${index}` },
    startTime,
    effectiveCastTime: castTime,
    skill: { name: `Skill ${index}`, shortName },
    actions,
    buffs: new Map(),
    debuffs: new Map(),
    modifierEffects: [],
    actionStates: {},
  }
}

describe("readableRotationText", () => {
  const timeline = [
    skillRow(0, 0, 1, "One"),
    skillRow(1, 1, 2, "Two", [
      { type: "damage", time: 0.5 },
      { type: "damage", time: 1 },
      { type: "damage", time: 1 },
    ]),
    skillRow(2, 3, 1, "Three"),
    skillRow(3, 4, 1, "Four"),
    {
      id: "rotation-4",
      kind: "rotation",
      rotationIndex: 4,
      order: 4000,
      step: { type: "event", event: "Qi", after: { action: 0 }, targetQiRatio: 0 },
      startTime: 3.5,
      effectiveCastTime: 0,
      skill: {},
      actions: [],
      buffs: new Map(),
      debuffs: new Map(),
      modifierEffects: [],
      actionStates: {},
    },
  ] as unknown as TimelineRow[]

  it("formats action-level anchors with hit modifiers", () => {
    expect(readableRotationText(timeline, { rowId: "rotation-1", actionIndex: 2 }, 2)).toBe(
      "One（战前2秒） > Two（第3击起） > Three（破盾） > Four",
    )
  })

  it("formats skill-level anchors with the start modifier", () => {
    expect(readableRotationText(timeline, { rowId: "rotation-1" }, 1)).toBe(
      "One（战前1秒） > Two（起点） > Three（破盾） > Four",
    )
  })

  it("collapses consecutive identical skills without merging later occurrences", () => {
    const repeatedTimeline = [
      skillRow(0, 0, 1, "One"),
      skillRow(1, 1, 1, "One"),
      skillRow(2, 2, 1, "One"),
      skillRow(3, 3, 1, "Two"),
      skillRow(4, 4, 1, "One"),
    ] as unknown as TimelineRow[]

    expect(readableRotationText(repeatedTimeline, { rowId: "missing" }, 0)).toBe("One ×3 > Two > One")
    expect(readableRotationText(repeatedTimeline, { rowId: "rotation-1" }, 1)).toBe(
      "One（战前1秒） > One（起点） > One > Two > One",
    )
  })
})

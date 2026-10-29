# 流派增益与技能伤害加成类别

快照：2026-10-21，基于当前工作区，包含未提交的更改。

这是一份模拟器类别归属清单，供数据挖掘核验使用，并不表示这些类别已在游戏中得到确认。每一条目均**待数据挖掘确认**。本文未修改任何计算或游戏数据。

## 范围与阅读说明

收录当前所有非预览版的流派增益/减益文件、共享增益/减益文件、技能直接修正项、武学天赋、心法定义以及 DOT 定义。共享来源与心法来源之所以纳入，是因为它们可以提供流派或技能加成。仅限规划器的流派在有数据时也一并收录；玉没有专属的增益/减益文件。`data/preview/` 下的备用记录、装备、食物、帖、天工配置加成以及定音不在本清单范围内。

每一行通过来源文件与 JSON 指针（数组索引从零开始）标识一次已编写的加成。天赋索引为编写时的等级索引；stackEffects 索引为从零开始的层数档位，而非可累加的层。重复的等级或层数条目有意保留。数值仍为小数比率：`0.1` 表示 10%。公式对象原样保留。需求条件与触发元数据继承自外层记录；完整的触发/动作顺序请查阅对应指针，升级效果请参阅相关心法记录。效果何时存在仍取决于增益持续时间、施加层数、适用资格以及来源技能的选择。

攻击缩放与固定值/系数缩放作为相邻类别一并收录，以免被误认为最终伤害加成。原始攻击属性、穿透、减防、概率加成、治疗，以及普通技能的伤害系数/固定伤害均不属于百分比伤害加成，因此不予列举。没有匹配加成字段的记录仍可能通过额外命中、时序或其他机制提升秒伤。

## 类别对照

类别归属依据 [damage-formula.md](damage-formula.md)、[skill-data.md](skill-data.md) 和 [damage.ts](../src/calculations/damage.ts)。它们描述的是实现行为；游戏侧的类别须由数据挖掘另行核验。

| 字段                                | 当前模拟器类别               |
| ----------------------------------- | ---------------------------- |
| `dmgBonus`                          | 类别 1（加算）               |
| `hpDMGBonus`                        | 类别 1（加算）               |
| `baseDMGBonus`                      | 基础乘区                     |
| `globalDmgBonus`                    | 机关乘区                     |
| `globalHPDMGBonus`                  | 机关乘区                     |
| `globalBellstrikeDMGBonus`          | 机关乘区（仅鸣金）           |
| `attributeDMGBonus`                 | 类别 1（仅属性分量）         |
| `dotDamage`                         | DOT 乘区                     |
| `highBleedDamage`                   | DOT 乘区（仅 HighBleed）     |
| `critDmgBonus`                      | 会心结果乘区                 |
| `affinityDmgBonus`                  | 会意结果乘区                 |
| `flatAttackBonus`                   | 固定攻击项缩放               |
| `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 |
| `replayDmgBonus`                    | 仅复现乘区                   |
| `qiDMGBonus`                        | 真气伤害（当前不求值）       |
| `physDmgBonus`                      | 外功通道乘区                 |
| `bellstrikeDmgBonus`                | 鸣金通道乘区                 |
| `stonesplitDmgBonus`                | 裂石通道乘区                 |
| `silkbindDmgBonus`                  | 牵丝通道乘区                 |
| `bamboocutDmgBonus`                 | 破竹通道乘区                 |
| `physicalAttackBonus`               | 外功攻击缩放                 |
| `bellstrikeAttackBonus`             | 鸣金攻击缩放                 |
| `stonesplitAttackBonus`             | 裂石攻击缩放                 |
| `silkbindAttackBonus`               | 牵丝攻击缩放                 |
| `bamboocutAttackBonus`              | 破竹攻击缩放                 |
| `allMartialArts`                    | 类别 1（MartialArts）        |
| `vsBossDmg`                         | 类别 1（首领）               |

加成先在各自类别内相加，再构成该类别的乘区。基础伤害、类别 1、匹配的定音、机关、DOT、通道与结果各阶段相互独立。`attributeDMGBonus` 仅对属性分量计入类别 1。`highBleedDamage` 对带 HighBleed 标签的动作共用 DOT 乘区池。机关字段相互相加，其中仅限鸣金的字段只计入该通道。`flatAttackBonus` 缩放已编写的固定攻击项，而非整次命中。复现加成在来源最终伤害之后应用，不会再次应用普通命中的乘区。

## 数据挖掘核对清单

- 核对游戏中的增益/技能 ID，以及普通变体与预览变体。下文中的仓库 ID 是查找键，而非游戏中的数字 ID。
- 记录导出的属性与计算 cause/类别、数值单位、目标通道、需求条件、等级以及叠层行为。
- 核验各项独立加成是相加还是相乘，包括仅限 PvE 的加成与条件升级。
- 修改数据之前，记录导出版本、证据位置、确认的类别以及任何差异。

## 增益定义（buff）

### bamboocut-draught.json

来源：[data/buff/bamboocut-draught.json](../data/buff/bamboocut-draught.json)。不含上述类别中的显式伤害加成字段。

### bamboocut-dust.json

来源：[data/buff/bamboocut-dust.json](../data/buff/bamboocut-dust.json)。所有行均待确认。

| 记录                 | JSON 指针                                          | 字段           | 加成类别       | 编写值                                                                                                       | 外层条件 / 元数据                                                                                                                                                                                                                                                        |
| -------------------- | -------------------------------------------------- | -------------- | -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/0/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.02`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]`                                          |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/0/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.01`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"target":"self","value":"SongOfTangT3"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]` |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/1/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.04`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]`                                          |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/1/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.02`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"target":"self","value":"SongOfTangT3"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]` |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/2/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.06`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]`                                          |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/2/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.03`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"target":"self","value":"SongOfTangT3"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]` |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/3/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.08`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]`                                          |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/3/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.04`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"target":"self","value":"SongOfTangT3"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]` |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/4/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.1`                                                                                                        | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]`                                          |
| 唐歌（`TangMelody`） | `/TangMelody/stackEffects/4/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.05`                                                                                                       | `[{"duration":4,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArts"},{"target":"self","value":"SongOfTangT3"},{"operator":"or","operand":[{"target":"selfHPPercentage","comparison":">","amount":50},{"target":"self","value":"SongOfTangT5"}]}]}]` |
| 连星（`Starweave`）  | `/Starweave/stackEffects/0/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.03`                                                                                                       | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/0/1/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[4,5,6,7,8],"param3":[0,0.0025,0.005,0.0075,0.01,0.01]}` | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/1/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.06`                                                                                                       | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/1/1/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[4,5,6,7,8],"param3":[0,0.005,0.01,0.015,0.02,0.02]}`    | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/2/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.09`                                                                                                       | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/2/1/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[4,5,6,7,8],"param3":[0,0.0075,0.015,0.0225,0.03,0.03]}` | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/3/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.12`                                                                                                       | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/3/1/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[4,5,6,7,8],"param3":[0,0.01,0.02,0.03,0.04,0.04]}`      | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/4/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.15`                                                                                                       | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |
| 连星（`Starweave`）  | `/Starweave/stackEffects/4/1/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[4,5,6,7,8],"param3":[0,0.0125,0.025,0.0375,0.05,0.05]}` | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"MartialArt"}]}]`                                                                                                                                                                             |

### bamboocut-kite.json

来源：[data/buff/bamboocut-kite.json](../data/buff/bamboocut-kite.json)。所有行均待确认。

| 记录                 | JSON 指针                                                   | 字段                    | 加成类别     | 编写值                 | 外层条件 / 元数据               |
| -------------------- | ----------------------------------------------------------- | ----------------------- | ------------ | ---------------------- | ------------------------------- |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/0/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.012`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/0/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.012`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/0/2/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.012`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/0/3/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.012`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/0/4/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.012`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/1/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.024`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/1/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.024`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/1/2/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.024`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/1/3/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.024`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/1/4/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.024`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/2/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.036000000000000004` | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/2/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.036000000000000004` | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/2/2/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.036000000000000004` | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/2/3/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.036000000000000004` | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/2/4/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.036000000000000004` | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/3/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.048`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/3/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.048`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/3/2/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.048`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/3/3/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.048`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/3/4/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.048`                | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/4/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.06`                 | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/4/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.06`                 | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/4/2/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.06`                 | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/4/3/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.06`                 | `[{"duration":8,"maxStack":5}]` |
| 撼天（`Etherwrath`） | `/Etherwrath/stackEffects/4/4/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.06`                 | `[{"duration":8,"maxStack":5}]` |

### bamboocut-wind.json

来源：[data/buff/bamboocut-wind.json](../data/buff/bamboocut-wind.json)。所有行均待确认。

| 记录                                                  | JSON 指针                                                 | 字段           | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                       |
| ----------------------------------------------------- | --------------------------------------------------------- | -------------- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 泥犁三垢·轻击PvE加成（`InfernalLightAttackPveBonus`） | `/InfernalLightAttackPveBonus/effect/0/effect/hpDMGBonus` | `hpDMGBonus`   | 类别 1（加算） | `0.1`  | `[{"global":{"equippedMartialArt":"infernalTwinblades"}},{"requirement":[{"target":"martialArt","value":"InfernalTwinblades"},{"target":"skillTag","value":"Light"}]}]` |
| 嗔焰（`Flamelash`）                                   | `/Flamelash/effect/0/effect/critDmgBonus`                 | `critDmgBonus` | 会心结果乘区   | `0.2`  | `[{"maxStack":1}]`                                                                                                                                                      |
| 崩解（`Disintegration`）                              | `/Disintegration/stackEffects/0/0/effect/critDmgBonus`    | `critDmgBonus` | 会心结果乘区   | `0.05` | `[{"duration":3,"maxStack":3}]`                                                                                                                                         |
| 崩解（`Disintegration`）                              | `/Disintegration/stackEffects/1/0/effect/critDmgBonus`    | `critDmgBonus` | 会心结果乘区   | `0.1`  | `[{"duration":3,"maxStack":3}]`                                                                                                                                         |
| 崩解（`Disintegration`）                              | `/Disintegration/stackEffects/2/0/effect/critDmgBonus`    | `critDmgBonus` | 会心结果乘区   | `0.15` | `[{"duration":3,"maxStack":3}]`                                                                                                                                         |
| 崩解（`Disintegration`）                              | `/Disintegration/stackEffects/3/0/effect/critDmgBonus`    | `critDmgBonus` | 会心结果乘区   | `0.2`  | `[{"duration":3,"maxStack":3}]`                                                                                                                                         |
| 崩解（`Disintegration`）                              | `/Disintegration/stackEffects/4/0/effect/critDmgBonus`    | `critDmgBonus` | 会心结果乘区   | `0.25` | `[{"duration":3,"maxStack":3}]`                                                                                                                                         |
| 轮回（`Samsara`）                                     | `/Samsara/effect/0/effect/hpDMGBonus`                     | `hpDMGBonus`   | 类别 1（加算） | `0.05` | `[{"duration":15,"maxStack":1}]`                                                                                                                                        |

### bellstrike-splendor.json

来源：[data/buff/bellstrike-splendor.json](../data/buff/bellstrike-splendor.json)。不含上述类别中的显式伤害加成字段。

### bellstrike-umbra.json

来源：[data/buff/bellstrike-umbra.json](../data/buff/bellstrike-umbra.json)。所有行均待确认。

| 记录                             | JSON 指针                                         | 字段               | 加成类别       | 编写值 | 外层条件 / 元数据                |
| -------------------------------- | ------------------------------------------------- | ------------------ | -------------- | ------ | -------------------------------- |
| 看破（`Concentration`）          | `/Concentration/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区   | `0.1`  | `[{"duration":10,"maxStack":1}]` |
| 滴水（`WaterDrop`）              | `/WaterDrop/effect/0/effect/hpDMGBonus`           | `hpDMGBonus`       | 类别 1（加算） | `0.1`  | `[{"duration":12,"maxStack":1}]` |
| 涌泉（`SpringSurge`）            | `/SpringSurge/effect/0/effect/hpDMGBonus`         | `hpDMGBonus`       | 类别 1（加算） | `0.15` | `[{"duration":12,"maxStack":1}]` |
| 江流（`RiverFlow`）              | `/RiverFlow/effect/0/effect/hpDMGBonus`           | `hpDMGBonus`       | 类别 1（加算） | `0.2`  | `[{"duration":12,"maxStack":1}]` |
| 强效江流（`EmpoweredRiverFlow`） | `/EmpoweredRiverFlow/effect/0/effect/hpDMGBonus`  | `hpDMGBonus`       | 类别 1（加算） | `0.25` | `[{"duration":12,"maxStack":1}]` |

### general.json

来源：[data/buff/general.json](../data/buff/general.json)。所有行均待确认。

| 记录                     | JSON 指针                                                 | 字段                    | 加成类别              | 编写值                                                                                                                                                | 外层条件 / 元数据                                                                                                                    |
| ------------------------ | --------------------------------------------------------- | ----------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 承欢（`Revelry`）        | `/Revelry/effect/0/effect/dmgBonus`                       | `dmgBonus`              | 类别 1（加算）        | `0.2`                                                                                                                                                 | `[{"duration":20,"maxStack":1}]`                                                                                                     |
| 玉斗（`Jadeware`）       | `/Jadeware/effect/0/effect/affinityDmgBonus`              | `affinityDmgBonus`      | 会意结果乘区          | `0.1`                                                                                                                                                 | `[{"duration":10,"maxStack":1}]`                                                                                                     |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/0/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放          | `0.018`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/0/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放          | `0.018`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/1/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放          | `0.036`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/1/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放          | `0.036`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/2/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放          | `0.054`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/2/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放          | `0.054`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/3/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放          | `0.072`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/3/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放          | `0.072`                                                                                                                                               | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/4/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放          | `0.09`                                                                                                                                                | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 飞隼（`Hawkwing`）       | `/Hawkwing/stackEffects/4/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放          | `0.09`                                                                                                                                                | `[{"duration":5,"maxStack":5}]`                                                                                                      |
| 夏（`Flare`）            | `/Flare/effect/0/stat/allMartialArts`                     | `allMartialArts`        | 类别 1（MartialArts） | `0.1`                                                                                                                                                 | `[{"duration":8,"maxStack":1}]`                                                                                                      |
| 夏（`Flare`）            | `/Flare/effect/1/stat/allMartialArts`                     | `allMartialArts`        | 类别 1（MartialArts） | `0.1`                                                                                                                                                 | `[{"duration":8,"maxStack":1},{"requirement":[{"target":"selfHPPercentage","comparison":">","amount":75}]}]`                         |
| 秋（`Yield`）            | `/Yield/effect/0/effect/dmgBonus`                         | `dmgBonus`              | 类别 1（加算）        | `0.1`                                                                                                                                                 | `[{"duration":8,"maxStack":1},{"requirement":[{"target":"skillTag","value":"Mystic"}]}]`                                             |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/0/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.02`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/1/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.04`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/2/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.06`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/3/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.08`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/4/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.1`                                                                                                                                                 | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/5/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.12`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/6/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.14`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/7/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.16`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/8/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.18`                                                                                                                                                | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 乘势（`RisingMomentum`） | `/RisingMomentum/stackEffects/9/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `0.2`                                                                                                                                                 | `[{"duration":5,"maxStack":10}]`                                                                                                     |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/0/1/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.01`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"target","value":"Controlled"},{"target":"self","value":"MoraleChantT3"}]}]` |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/0/3/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区          | `0.01`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"self","value":"MoraleChantT1"}]}]}]`           |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/0/4/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.01`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"self","value":"MoraleChantT1"}]}]`                                          |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/1/1/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.02`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"target","value":"Controlled"},{"target":"self","value":"MoraleChantT3"}]}]` |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/1/3/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区          | `0.02`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"self","value":"MoraleChantT1"}]}]}]`           |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/1/4/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.02`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"self","value":"MoraleChantT1"}]}]`                                          |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/2/1/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.03`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"target","value":"Controlled"},{"target":"self","value":"MoraleChantT3"}]}]` |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/2/3/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区          | `0.03`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"self","value":"MoraleChantT1"}]}]}]`           |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/2/4/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.03`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"self","value":"MoraleChantT1"}]}]`                                          |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/3/1/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.04`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"target","value":"Controlled"},{"target":"self","value":"MoraleChantT3"}]}]` |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/3/3/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区          | `0.04`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"self","value":"MoraleChantT1"}]}]}]`           |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/3/4/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.04`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"self","value":"MoraleChantT1"}]}]`                                          |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/4/1/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.05`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"target","value":"Controlled"},{"target":"self","value":"MoraleChantT3"}]}]` |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/4/3/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区          | `0.05`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"self","value":"MoraleChantT1"}]}]}]`           |
| 易水（`YiRiver`）        | `/YiRiver/stackEffects/4/4/effect/dmgBonus`               | `dmgBonus`              | 类别 1（加算）        | `0.05`                                                                                                                                                | `[{"duration":8,"maxStack":5},{"requirement":[{"target":"self","value":"MoraleChantT1"}]}]`                                          |
| 明（`RighteousLight`）   | `/RighteousLight/stackEffects/0/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.005,0.0045,0.004,0.0035,0.003],"mode":"UpperBoundInclusive"}` | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                       |
| 明（`RighteousLight`）   | `/RighteousLight/stackEffects/1/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.01,0.009,0.008,0.007,0.006],"mode":"UpperBoundInclusive"}`    | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                       |
| 明（`RighteousLight`）   | `/RighteousLight/stackEffects/2/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.015,0.0135,0.012,0.0105,0.009],"mode":"UpperBoundInclusive"}` | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                       |
| 明（`RighteousLight`）   | `/RighteousLight/stackEffects/3/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.02,0.018,0.016,0.014,0.012],"mode":"UpperBoundInclusive"}`    | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                       |
| 明（`RighteousLight`）   | `/RighteousLight/stackEffects/4/0/effect/dmgBonus`        | `dmgBonus`              | 类别 1（加算）        | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.025,0.0225,0.02,0.0175,0.015],"mode":"UpperBoundInclusive"}`  | `[{"duration":5,"maxStack":5},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                       |

### mechanism.json

来源：[data/buff/mechanism.json](../data/buff/mechanism.json)。所有行均待确认。

| 记录                       | JSON 指针                                          | 字段             | 加成类别 | 编写值 | 外层条件 / 元数据                |
| -------------------------- | -------------------------------------------------- | ---------------- | -------- | ------ | -------------------------------- |
| 召雷（`ThunderSummoning`） | `/ThunderSummoning/effect/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区 | `0.3`  | `[{"duration":15,"maxStack":1}]` |

### mystic.json

来源：[data/buff/mystic.json](../data/buff/mystic.json)。所有行均待确认。

| 记录                              | JSON 指针                                             | 字段           | 加成类别       | 编写值                                                                                                                                                                  | 外层条件 / 元数据                                                                                                                         |
| --------------------------------- | ----------------------------------------------------- | -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 叶龙骧首·叠浪（`DragonHeadTide`） | `/DragonHeadTide/effect/0/effect/dmgBonus`            | `dmgBonus`     | 类别 1（加算） | `{"function":"multiply","param1":"missingHPPercentage","param2":"0.0045"}`                                                                                              | `[{"global":true},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                                      |
| 箫（`Flute`）                     | `/Flute/effect/0/effect/dmgBonus`                     | `dmgBonus`     | 类别 1（加算） | `{"function":"segment","param1":"distance","param2":[1,2,3,4,5,6,7,8,9,20],"param3":[0.01,0.02,0.03,0.04,0.05,0.08,0.11,0.14,0.17,0.2,0],"mode":"LowerBoundInclusive"}` | `[{"duration":12.5,"maxStack":1}]`                                                                                                        |
| 迷踪增伤（`MysteryDMGBoost`）     | `/MysteryDMGBoost/effect/0/effect/dmgBonus`           | `dmgBonus`     | 类别 1（加算） | `0.15`                                                                                                                                                                  | `[{"duration":8,"maxStack":1}]`                                                                                                           |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/0/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.0125`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/0/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/1/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.025`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/1/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/2/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.0375`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/2/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/3/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.05`                                                                                                                                                                  | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/3/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/4/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.0625`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/4/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/5/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.075`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/5/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/6/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.0875`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/6/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/7/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.1`                                                                                                                                                                   | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/7/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/8/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.1125`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/8/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/9/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.125`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/9/1/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/10/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.1375`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/10/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/11/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.15`                                                                                                                                                                  | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/11/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/12/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.1625`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/12/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/13/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.175`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/13/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/14/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.1875`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/14/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/15/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.2`                                                                                                                                                                   | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/15/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/16/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.2125`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/16/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/17/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.225`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/17/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/18/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.2375`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/18/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/19/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.25`                                                                                                                                                                  | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/19/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/20/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.2625`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/20/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/21/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.275`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/21/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/22/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.2875`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/22/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/23/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.3`                                                                                                                                                                   | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/23/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/24/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.3125`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/24/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/25/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.325`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/25/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/26/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.3375`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/26/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/27/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.35`                                                                                                                                                                  | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/27/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/28/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.3625`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/28/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/29/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.375`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/29/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/30/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.3875`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/30/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/31/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.4`                                                                                                                                                                   | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/31/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/32/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.4125`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/32/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/33/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.425`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/33/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/34/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.4375`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/34/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/35/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.45`                                                                                                                                                                  | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/35/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/36/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.4625`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/36/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/37/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.475`                                                                                                                                                                 | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/37/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/38/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.4875`                                                                                                                                                                | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/38/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/39/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.5`                                                                                                                                                                   | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"}]}]`                                         |
| 沧浪劲（`SurgingWaves`）          | `/SurgingWaves/stackEffects/39/1/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `1`                                                                                                                                                                     | `[{"duration":7,"maxStack":40},{"requirement":[{"target":"skillTag","value":"DragonHeadTide"},{"target":"target","value":"Exhausted"}]}]` |

### silkbind-deluge.json

来源：[data/buff/silkbind-deluge.json](../data/buff/silkbind-deluge.json)。所有行均待确认。

| 记录                                 | JSON 指针                                       | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据  |
| ------------------------------------ | ----------------------------------------------- | ---------- | -------------- | ------ | ------------------ |
| 一念浮生（`FloatingGrace`）          | `/FloatingGrace/effect/0/effect/dmgBonus`       | `dmgBonus` | 类别 1（加算） | `0.1`  | `[{"maxStack":1}]` |
| 一念浮生·霖（`FloatingGraceDeluge`） | `/FloatingGraceDeluge/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.24` | `[{"maxStack":1}]` |

### silkbind-wings.json

来源：[data/buff/silkbind-wings.json](../data/buff/silkbind-wings.json)。所有行均待确认。

| 记录                                  | JSON 指针                                                   | 字段                    | 加成类别       | 编写值    | 外层条件 / 元数据                                                                                                                             |
| ------------------------------------- | ----------------------------------------------------------- | ----------------------- | -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 扶风（`Tailwind`）                    | `/Tailwind/effect/0/effect/bellstrikeAttackBonus`           | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.03`    | `[{"duration":12,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]` |
| 扶风（`Tailwind`）                    | `/Tailwind/effect/0/effect/stonesplitAttackBonus`           | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.03`    | `[{"duration":12,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]` |
| 扶风（`Tailwind`）                    | `/Tailwind/effect/0/effect/silkbindAttackBonus`             | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.03`    | `[{"duration":12,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]` |
| 扶风（`Tailwind`）                    | `/Tailwind/effect/0/effect/bamboocutAttackBonus`            | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.03`    | `[{"duration":12,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]` |
| 烁鼓（`RadiantDrum`）                 | `/RadiantDrum/effect/0/effect/physicalAttackBonus`          | `physicalAttackBonus`   | 外功攻击缩放   | `0.06`    | `[{"duration":4,"maxStack":1}]`                                                                                                               |
| 烁鼓（`RadiantDrum`）                 | `/RadiantDrum/effect/0/effect/bellstrikeAttackBonus`        | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`    | `[{"duration":4,"maxStack":1}]`                                                                                                               |
| 烁鼓（`RadiantDrum`）                 | `/RadiantDrum/effect/0/effect/stonesplitAttackBonus`        | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`    | `[{"duration":4,"maxStack":1}]`                                                                                                               |
| 烁鼓（`RadiantDrum`）                 | `/RadiantDrum/effect/0/effect/silkbindAttackBonus`          | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`    | `[{"duration":4,"maxStack":1}]`                                                                                                               |
| 烁鼓（`RadiantDrum`）                 | `/RadiantDrum/effect/0/effect/bamboocutAttackBonus`         | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`    | `[{"duration":4,"maxStack":1}]`                                                                                                               |
| 裁云·翊（`Cloudshear`）               | `/Cloudshear/effect/0/effect/dmgBonus`                      | `dmgBonus`              | 类别 1（加算） | `0.06`    | `[{"duration":15,"maxStack":1}]`                                                                                                              |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/dmgBonus`              | `dmgBonus`              | 类别 1（加算） | `0.02`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放   | `0.039`   | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.05925` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.05925` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.05925` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（黄）（`WingsSupportYellow`） | `/WingsSupportYellow/effect/0/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.05925` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/dmgBonus`                | `dmgBonus`              | 类别 1（加算） | `0.02`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/physicalAttackBonus`     | `physicalAttackBonus`   | 外功攻击缩放   | `0.063`   | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/bellstrikeAttackBonus`   | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.07725` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/stonesplitAttackBonus`   | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.07725` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/silkbindAttackBonus`     | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.07725` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（蓝）（`WingsSupportBlue`）   | `/WingsSupportBlue/effect/0/effect/bamboocutAttackBonus`    | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.07725` | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/dmgBonus`                | `dmgBonus`              | 类别 1（加算） | `0.02`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/physicalAttackBonus`     | `physicalAttackBonus`   | 外功攻击缩放   | `0.12`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/bellstrikeAttackBonus`   | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.12`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/stonesplitAttackBonus`   | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.12`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/silkbindAttackBonus`     | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.12`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |
| 牵丝·翊（全）（`WingsSupportFull`）   | `/WingsSupportFull/effect/0/effect/bamboocutAttackBonus`    | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.12`    | `[{"duration":0,"maxStack":1},{"requirement":[{"operator":"not","operand":[{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]}]`  |

### stonesplit-might.json

来源：[data/buff/stonesplit-might.json](../data/buff/stonesplit-might.json)。所有行均待确认。

| 记录                   | JSON 指针                                | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                                          |
| ---------------------- | ---------------------------------------- | ---------- | -------------- | ------ | ------------------------------------------------------------------------------------------ |
| 摧鼓（`Drumbeat`）     | `/Drumbeat/effect/0/effect/dmgBonus`     | `dmgBonus` | 类别 1（加算） | `0.15` | `[{"duration":6,"maxStack":1},{"requirement":[{"target":"skillTag","value":"Charged"}]}]`  |
| 破阵（`Breakthrough`） | `/Breakthrough/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.42` | `[{"duration":12,"maxStack":1},{"requirement":[{"target":"skillTag","value":"Charged"}]}]` |
| 硬茬（`HardenedFoe`）  | `/HardenedFoe/effect/0/effect/dmgBonus`  | `dmgBonus` | 类别 1（加算） | `0.1`  | `[{"duration":12,"maxStack":1}]`                                                           |

### stonesplit-strength.json

来源：[data/buff/stonesplit-strength.json](../data/buff/stonesplit-strength.json)。所有行均待确认。

| 记录                                   | JSON 指针                                             | 字段           | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------------------- | ----------------------------------------------------- | -------------- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 派生技增伤（`AdaptiveSteelHengBlade`） | `/AdaptiveSteelHengBlade/effect/0/effect/dmgBonus`    | `dmgBonus`     | 类别 1（加算） | `0.05` | `[{"duration":5,"maxStack":1},{"requirement":[{"target":"skillTag","value":"HengBlade"},{"target":"skillTag","value":"VariedCombo"},{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/0/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.02` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/0/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.01` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"},{"operator":"or","operand":[[{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]},{"target":"skillTag","value":"VariedCombo"},{"target":"self","value":"ThroatPiercingArtT3"}],[{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]},{"target":"self","value":"ThroatPiercingArtT6"}]]},{"target":"self","value":"ThroatPiercingArtT3"}]}]`                                                                                                                                                                                          |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/1/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.04` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/1/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.02` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"},{"operator":"or","operand":[[{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]},{"target":"skillTag","value":"VariedCombo"}],[{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]},{"target":"self","value":"ThroatPiercingArtT6"}]]},{"target":"self","value":"ThroatPiercingArtT3"}]}]`                                                                                                                                                                                                                                          |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/2/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.06` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/2/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.03` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"},{"operator":"or","operand":[[{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]},{"target":"skillTag","value":"VariedCombo"}],[{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]},{"target":"self","value":"ThroatPiercingArtT6"}]]},{"target":"self","value":"ThroatPiercingArtT3"}]}]`                                                                                                                                                                                                                                          |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/3/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.08` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/3/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.04` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"},{"operator":"or","operand":[[{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]},{"target":"skillTag","value":"VariedCombo"}],[{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]},{"target":"self","value":"ThroatPiercingArtT6"}]]},{"target":"self","value":"ThroatPiercingArtT3"}]}]`                                                                                                                                                                                                                                          |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/4/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.1`  | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 穿喉（`ThroatPierced`）                | `/ThroatPierced/stackEffects/4/1/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区   | `0.05` | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"DirectDamage"},{"operator":"or","operand":[[{"operator":"or","operand":[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Heavy"}]},{"target":"skillTag","value":"VariedCombo"}],[{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]},{"target":"self","value":"ThroatPiercingArtT6"}]]},{"target":"self","value":"ThroatPiercingArtT3"}]}]`                                                                                                                                                                                                                                          |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/0/0/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.01` | `[{"duration":5,"maxStack":5}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/1/0/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.02` | `[{"duration":5,"maxStack":5}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/2/0/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.03` | `[{"duration":5,"maxStack":5}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/3/0/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.04` | `[{"duration":5,"maxStack":5}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/4/0/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.05` | `[{"duration":5,"maxStack":5}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 断岳（`Cleftpeak`）                    | `/Cleftpeak/stackEffects/4/1/effect/hpDMGBonus`       | `hpDMGBonus`   | 类别 1（加算） | `0.08` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"},{"operator":"or","operand":[{"target":"martialArt","value":"SnowpartingBlade"},{"target":"martialArt","value":"ThundercryBlade"},{"target":"martialArt","value":"VernalUmbrella"}]}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"},{"operator":"or","operand":[{"target":"martialArt","value":"SnowpartingBlade"},{"target":"martialArt","value":"ThundercryBlade"},{"target":"martialArt","value":"VernalUmbrella"}]}],{"operator":"or","operand":[{"target":"skillTag","value":"AnxiSoldier"},{"target":"skillTag","value":"TriggerAnxiSolder"}]}]}]}]` |
| 铁衣戍魂（`IronGuard`）                | `/IronGuard/effect/0/effect/hpDMGBonus`               | `hpDMGBonus`   | 类别 1（加算） | `0.08` | `[{"duration":30,"maxStack":1}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 开山（`MountainSplitter`）             | `/MountainSplitter/effect/0/effect/critDmgBonus`      | `critDmgBonus` | 会心结果乘区   | `0.1`  | `[{"duration":10,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"BurningHeart"},{"target":"skillTag","value":"AnxiSoldier"}]}]}]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## 减益定义（debuff）

### bamboocut-draught.json

来源：[data/debuff/bamboocut-draught.json](../data/debuff/bamboocut-draught.json)。所有行均待确认。

| 记录                       | JSON 指针                                     | 字段                 | 加成类别     | 编写值 | 外层条件 / 元数据                                                                                                                   |
| -------------------------- | --------------------------------------------- | -------------------- | ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 步乱（樽）（`Wildstride`） | `/Wildstride/effect/0/effect/replayDmgBonus`  | `replayDmgBonus`     | 仅复现乘区   | `0.2`  | `[{"duration":20,"maxStack":1},{"requirement":[{"target":"target","value":"Strayhunt"},{"target":"skillTag","value":"Replayed"}]}]` |
| 离猎（`Strayhunt`）        | `/Strayhunt/effect/0/stat/physDmgBonus`       | `physDmgBonus`       | 外功通道乘区 | `0.02` | `[{"duration":20,"maxStack":1}]`                                                                                                    |
| 离猎（`Strayhunt`）        | `/Strayhunt/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区 | `0.02` | `[{"duration":20,"maxStack":1}]`                                                                                                    |
| 离猎（`Strayhunt`）        | `/Strayhunt/effect/0/stat/stonesplitDmgBonus` | `stonesplitDmgBonus` | 裂石通道乘区 | `0.02` | `[{"duration":20,"maxStack":1}]`                                                                                                    |
| 离猎（`Strayhunt`）        | `/Strayhunt/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus`   | 牵丝通道乘区 | `0.02` | `[{"duration":20,"maxStack":1}]`                                                                                                    |
| 离猎（`Strayhunt`）        | `/Strayhunt/effect/0/stat/bamboocutDmgBonus`  | `bamboocutDmgBonus`  | 破竹通道乘区 | `0.02` | `[{"duration":20,"maxStack":1}]`                                                                                                    |

### bamboocut-dust.json

来源：[data/debuff/bamboocut-dust.json](../data/debuff/bamboocut-dust.json)。所有行均待确认。

| 记录                    | JSON 指针                                             | 字段             | 加成类别       | 编写值 | 外层条件 / 元数据                |
| ----------------------- | ----------------------------------------------------- | ---------------- | -------------- | ------ | -------------------------------- |
| 失魂落魄（`Soulbreak`） | `/Soulbreak/effect/0/effect/dmgBonus`                 | `dmgBonus`       | 类别 1（加算） | `0.05` | `[{"duration":12,"maxStack":1}]` |
| 烛影（`Candlelight`）   | `/Candlelight/stackEffects/0/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.02` | `[{"duration":3,"maxStack":5}]`  |
| 烛影（`Candlelight`）   | `/Candlelight/stackEffects/1/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.04` | `[{"duration":3,"maxStack":5}]`  |
| 烛影（`Candlelight`）   | `/Candlelight/stackEffects/2/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.06` | `[{"duration":3,"maxStack":5}]`  |
| 烛影（`Candlelight`）   | `/Candlelight/stackEffects/3/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.08` | `[{"duration":3,"maxStack":5}]`  |
| 烛影（`Candlelight`）   | `/Candlelight/stackEffects/4/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.1`  | `[{"duration":3,"maxStack":5}]`  |

### bamboocut-kite.json

来源：[data/debuff/bamboocut-kite.json](../data/debuff/bamboocut-kite.json)。所有行均待确认。

| 记录                   | JSON 指针                                  | 字段         | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                     |
| ---------------------- | ------------------------------------------ | ------------ | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 天威（`HeavensMight`） | `/HeavensMight/effect/0/effect/hpDMGBonus` | `hpDMGBonus` | 类别 1（加算） | `0.1`  | `[{"duration":15,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |

### bamboocut-wind.json

来源：[data/debuff/bamboocut-wind.json](../data/debuff/bamboocut-wind.json)。所有行均待确认。

| 记录                      | JSON 指针                                   | 字段         | 加成类别               | 编写值 | 外层条件 / 元数据                                                                         |
| ------------------------- | ------------------------------------------- | ------------ | ---------------------- | ------ | ----------------------------------------------------------------------------------------- |
| 仇杀令（`VendettaToken`） | `/VendettaToken/effect/0/effect/dmgBonus`   | `dmgBonus`   | 类别 1（加算）         | `0.5`  | `[{"duration":10,"maxStack":1},{"requirement":[{"target":"skillTag","value":"Rodent"}]}]` |
| 蚀骨（`BoneCorrosion`）   | `/BoneCorrosion/effect/0/qiDMGBonus`        | `qiDMGBonus` | 真气伤害（当前不求值） | `0.05` | `[{"duration":5,"maxStack":1}]`                                                           |
| 蚀骨（`BoneCorrosion`）   | `/BoneCorrosion/effect/1/effect/qiDMGBonus` | `qiDMGBonus` | 真气伤害（当前不求值） | `0.35` | `[{"duration":5,"maxStack":1},{"requirement":[{"target":"skillTag","value":"Light"}]}]`   |

### bellstrike-splendor.json

来源：[data/debuff/bellstrike-splendor.json](../data/debuff/bellstrike-splendor.json)。所有行均待确认。

| 记录                                | JSON 指针                                                 | 字段                 | 加成类别               | 编写值 | 外层条件 / 元数据                                                                             |
| ----------------------------------- | --------------------------------------------------------- | -------------------- | ---------------------- | ------ | --------------------------------------------------------------------------------------------- |
| 真气失衡（`QiImbalance`）           | `/QiImbalance/effect/0/qiDMGBonus`                        | `qiDMGBonus`         | 真气伤害（当前不求值） | `0.1`  | `[{"duration":15,"maxStack":1}]`                                                              |
| 真气失衡（`QiImbalance`）           | `/QiImbalance/effect/1/effect/globalHPDMGBonus`           | `globalHPDMGBonus`   | 机关乘区               | `0.1`  | `[{"duration":15,"maxStack":1},{"requirement":[{"target":"target","value":"Exhausted"}]}]`    |
| 真气失衡（`QiImbalance`）           | `/QiImbalance/effect/1/effect/stat/bellstrikeDmgBonus`    | `bellstrikeDmgBonus` | 鸣金通道乘区           | `0.1`  | `[{"duration":15,"maxStack":1},{"requirement":[{"target":"target","value":"Exhausted"}]}]`    |
| 剑气增伤（`SwordSlashDamageBoost`） | `/SwordSlashDamageBoost/stackEffects/0/0/effect/dmgBonus` | `dmgBonus`           | 类别 1（加算）         | `0.1`  | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]` |
| 剑气增伤（`SwordSlashDamageBoost`） | `/SwordSlashDamageBoost/stackEffects/1/0/effect/dmgBonus` | `dmgBonus`           | 类别 1（加算）         | `0.2`  | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]` |
| 剑气增伤（`SwordSlashDamageBoost`） | `/SwordSlashDamageBoost/stackEffects/2/0/effect/dmgBonus` | `dmgBonus`           | 类别 1（加算）         | `0.3`  | `[{"duration":8,"maxStack":3},{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]` |

### bellstrike-umbra.json

来源：[data/debuff/bellstrike-umbra.json](../data/debuff/bellstrike-umbra.json)。所有行均待确认。

| 记录                 | JSON 指针                                             | 字段              | 加成类别                 | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------- | ----------------- | ------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/0/0/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.05` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]`                                                                                                                                    |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/0/1/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.05` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"HeavenQuakerSpear"},{"target":"martialArt","value":"StrategicSword"}]},{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/0/2/effect/highBleedDamage` | `highBleedDamage` | DOT 乘区（仅 HighBleed） | `0.1`  | `[{"duration":18,"maxStack":5},{"requirement":[{"target":"skillTag","value":"HighBleed"}]}]`                                                                                                                                                                   |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/1/0/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.1`  | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]`                                                                                                                                    |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/1/1/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.1`  | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"HeavenQuakerSpear"},{"target":"martialArt","value":"StrategicSword"}]},{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/1/2/effect/highBleedDamage` | `highBleedDamage` | DOT 乘区（仅 HighBleed） | `0.2`  | `[{"duration":18,"maxStack":5},{"requirement":[{"target":"skillTag","value":"HighBleed"}]}]`                                                                                                                                                                   |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/2/0/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.15` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]`                                                                                                                                    |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/2/1/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.15` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"HeavenQuakerSpear"},{"target":"martialArt","value":"StrategicSword"}]},{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/2/2/effect/highBleedDamage` | `highBleedDamage` | DOT 乘区（仅 HighBleed） | `0.3`  | `[{"duration":18,"maxStack":5},{"requirement":[{"target":"skillTag","value":"HighBleed"}]}]`                                                                                                                                                                   |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/3/0/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.2`  | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]`                                                                                                                                    |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/3/1/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.2`  | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"HeavenQuakerSpear"},{"target":"martialArt","value":"StrategicSword"}]},{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/3/2/effect/highBleedDamage` | `highBleedDamage` | DOT 乘区（仅 HighBleed） | `0.4`  | `[{"duration":18,"maxStack":5},{"requirement":[{"target":"skillTag","value":"HighBleed"}]}]`                                                                                                                                                                   |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/4/0/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.25` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]`                                                                                                                                    |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/4/1/effect/dotDamage`       | `dotDamage`       | DOT 乘区                 | `0.25` | `[{"duration":18,"maxStack":5},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"HeavenQuakerSpear"},{"target":"martialArt","value":"StrategicSword"}]},{"operator":"not","operand":[{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 惊神（`SoulShaken`） | `/SoulShaken/stackEffects/4/2/effect/highBleedDamage` | `highBleedDamage` | DOT 乘区（仅 HighBleed） | `0.5`  | `[{"duration":18,"maxStack":5},{"requirement":[{"target":"skillTag","value":"HighBleed"}]}]`                                                                                                                                                                   |
| 酒蛊（`WineGu`）     | `/WineGu/effect/0/effect/dmgBonus`                    | `dmgBonus`        | 类别 1（加算）           | `0.05` | `[{"duration":15,"maxStack":1}]`                                                                                                                                                                                                                               |

### general.json

来源：[data/debuff/general.json](../data/debuff/general.json)。所有行均待确认。

| 记录                | JSON 指针                                   | 字段             | 加成类别 | 编写值 | 外层条件 / 元数据                |
| ------------------- | ------------------------------------------- | ---------------- | -------- | ------ | -------------------------------- |
| 气竭（`Exhausted`） | `/Exhausted/effect/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区 | `0.1`  | `[{"duration":10,"maxStack":1}]` |

### innerway.json

来源：[data/debuff/innerway.json](../data/debuff/innerway.json)。不含上述类别中的显式伤害加成字段。

### mechanism.json

来源：[data/debuff/mechanism.json](../data/debuff/mechanism.json)。所有行均待确认。

| 记录             | JSON 指针                          | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                |
| ---------------- | ---------------------------------- | ---------- | -------------- | ------ | -------------------------------- |
| 卸武（`Disarm`） | `/Disarm/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `2`    | `[{"duration":11,"maxStack":1}]` |

### mystic.json

来源：[data/debuff/mystic.json](../data/debuff/mystic.json)。不含上述类别中的显式伤害加成字段。

### silkbind-wings.json

来源：[data/debuff/silkbind-wings.json](../data/debuff/silkbind-wings.json)。所有行均待确认。

| 记录               | JSON 指针                                        | 字段             | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------------------ | ---------------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 墨韵（`InkRhyme`） | `/InkRhyme/effect/0/effect/dmgBonus`             | `dmgBonus`       | 类别 1（加算） | `0.05` | `[{"duration":8,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"WillowbendFan"},{"target":"skillTag","value":"DrumSeries"}]}]}]`                                                                                                                         |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/0/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.02` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]`                                          |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/0/1/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.02` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]},{"target":"self","value":"BladesWillT3"}]}]` |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/1/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.04` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]`                                          |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/1/1/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.04` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]},{"target":"self","value":"BladesWillT3"}]}]` |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/2/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.06` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]`                                          |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/2/1/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.06` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]},{"target":"self","value":"BladesWillT3"}]}]` |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/3/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.08` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]`                                          |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/3/1/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.08` | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]},{"target":"self","value":"BladesWillT3"}]}]` |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/4/0/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.1`  | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]`                                          |
| 寸草（`Cuncao`）   | `/Cuncao/stackEffects/4/1/effect/globalDmgBonus` | `globalDmgBonus` | 机关乘区       | `0.1`  | `[{"duration":5,"maxStack":5},{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]},{"target":"self","value":"BladesWillT3"}]}]` |

### stonesplit-might.json

来源：[data/debuff/stonesplit-might.json](../data/debuff/stonesplit-might.json)。所有行均待确认。

| 记录                 | JSON 指针                                | 字段         | 加成类别               | 编写值 | 外层条件 / 元数据                                                                                                                                                                      |
| -------------------- | ---------------------------------------- | ------------ | ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 易伤（`Vulnerable`） | `/Vulnerable/effect/0/hpDMGBonus`        | `hpDMGBonus` | 类别 1（加算）         | `0.08` | `[{"duration":16,"maxStack":1}]`                                                                                                                                                       |
| 易伤（`Vulnerable`） | `/Vulnerable/effect/0/qiDMGBonus`        | `qiDMGBonus` | 真气伤害（当前不求值） | `0.08` | `[{"duration":16,"maxStack":1}]`                                                                                                                                                       |
| 易伤（`Vulnerable`） | `/Vulnerable/effect/1/effect/hpDMGBonus` | `hpDMGBonus` | 类别 1（加算）         | `0.08` | `[{"duration":16,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"StormbreakerSpear"},{"target":"martialArt","value":"ThundercryBlade"}]}]}]` |
| 易伤（`Vulnerable`） | `/Vulnerable/effect/1/effect/qiDMGBonus` | `qiDMGBonus` | 真气伤害（当前不求值） | `0.08` | `[{"duration":16,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"StormbreakerSpear"},{"target":"martialArt","value":"ThundercryBlade"}]}]}]` |

### stonesplit-strength.json

来源：[data/debuff/stonesplit-strength.json](../data/debuff/stonesplit-strength.json)。所有行均待确认。

| 记录                   | JSON 指针                                  | 字段         | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                      |
| ---------------------- | ------------------------------------------ | ------------ | -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 胆寒（`Dread`）        | `/Dread/effect/0/hpDMGBonus`               | `hpDMGBonus` | 类别 1（加算） | `0.12` | `[{"duration":7,"maxStack":1}]`                                                                                                                                                        |
| 惧刃（`FearfulBlade`） | `/FearfulBlade/effect/1/effect/hpDMGBonus` | `hpDMGBonus` | 类别 1（加算） | `0.08` | `[{"duration":15,"maxStack":1},{"requirement":[{"operator":"or","operand":[{"target":"martialArt","value":"SnowpartingBlade"},{"target":"martialArt","value":"PhalanxbaneBlade"}]}]}]` |

## 技能定义（skill）

### everspring-umbrella.json

来源：[data/skill/everspring-umbrella.json](../data/skill/everspring-umbrella.json)。所有行均待确认。

| 记录                                  | JSON 指针                                           | 字段         | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                               |
| ------------------------------------- | --------------------------------------------------- | ------------ | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 玲珑泡影（`DreamwroughtBubbles`）     | `/DreamwroughtBubbles/modifier/0/effect/hpDMGBonus` | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["MartialArts","DirectDamage","Heavy","Umbrella","EverspringUmbrella","Charged","DreamwroughtBubbles","ReturningUmbrella"],"martialArt":"everspring"}]`                                               |
| 红消香断 第1段（`ScarletSpinStage1`） | `/ScarletSpinStage1/modifier/0/effect/hpDMGBonus`   | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["Triggered","MartialArts","DirectDamage","Umbrella","EverspringUmbrella","MartialArt","ScarletSpin","ReturningUmbrella"]},{"requirement":[{"target":"self","value":"FragrantSong"}]}]`               |
| 红消香断 第2段（`ScarletSpinStage2`） | `/ScarletSpinStage2/modifier/0/effect/hpDMGBonus`   | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["Triggered","MartialArts","DirectDamage","Umbrella","EverspringUmbrella","MartialArt","ScarletSpin","ReturningUmbrella"]},{"requirement":[{"target":"self","value":"FragrantSong"}]}]`               |
| 红消香断 第3段（`ScarletSpinStage3`） | `/ScarletSpinStage3/modifier/0/effect/hpDMGBonus`   | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["Triggered","MartialArts","DirectDamage","Umbrella","EverspringUmbrella","MartialArt","ScarletSpin","ReturningUmbrella"]},{"requirement":[{"target":"self","value":"FragrantSong"}]}]`               |
| 红消香断 第4段（`ScarletSpinStage4`） | `/ScarletSpinStage4/modifier/0/effect/hpDMGBonus`   | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["Triggered","MartialArts","DirectDamage","Umbrella","EverspringUmbrella","MartialArt","ScarletSpin","ReturningUmbrella"]},{"requirement":[{"target":"self","value":"FragrantSong"}]}]`               |
| 共鸣（红消香断）（`Resonance`）       | `/Resonance/modifier/0/effect/hpDMGBonus`           | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"tags":["Triggered","DirectDamage","MartialArts","EverspringUmbrella","PhantomResonance","MartialArt","Umbrella","ReturningUmbrella"]},{"requirement":[{"target":"self","value":"FragrantSongResonance"}]}]` |

### general.json

来源：[data/skill/general.json](../data/skill/general.json)。不含上述类别中的显式伤害加成字段。

### heavenquaker-spear.json

来源：[data/skill/heavenquaker-spear.json](../data/skill/heavenquaker-spear.json)。不含上述类别中的显式伤害加成字段。

### heavenwill-gauntlets.json

来源：[data/skill/heavenwill-gauntlets.json](../data/skill/heavenwill-gauntlets.json)。所有行均待确认。

| 记录                                      | JSON 指针                                             | 字段           | 加成类别     | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------- | -------------- | ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 无义当诛·尽 命中（`VileCondemnedEndHit`） | `/VileCondemnedEndHit/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区     | `0.3`  | `[{"tags":["DirectDamage","MartialArts","Charged","Gauntlet","HeavenwillGauntlets","VileCondemned","VileCondemnedEnd","MartialArtEffect","SubAction"],"martialArt":"heavenwill"},{"requirement":[{"target":"self","value":"SoaringHighT6"},{"target":"resource","value":"HeavensWill","comparison":"==","amount":4}]}]` |
| 无义当诛·尽 命中（`VileCondemnedEndHit`） | `/VileCondemnedEndHit/modifier/0/effect/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.1`  | `[{"tags":["DirectDamage","MartialArts","Charged","Gauntlet","HeavenwillGauntlets","VileCondemned","VileCondemnedEnd","MartialArtEffect","SubAction"],"martialArt":"heavenwill"},{"requirement":[{"target":"self","value":"SoaringHighT6"},{"target":"resource","value":"HeavensWill","comparison":"==","amount":4}]}]` |

### infernal-twinblades.json

来源：[data/skill/infernal-twinblades.json](../data/skill/infernal-twinblades.json)。不含上述类别中的显式伤害加成字段。

### mechanism.json

来源：[data/skill/mechanism.json](../data/skill/mechanism.json)。不含上述类别中的显式伤害加成字段。

### mortal-rope-dart.json

来源：[data/skill/mortal-rope-dart.json](../data/skill/mortal-rope-dart.json)。不含上述类别中的显式伤害加成字段。

### museflow-waist-drum.json

来源：[data/skill/museflow-waist-drum.json](../data/skill/museflow-waist-drum.json)。所有行均待确认。

| 记录                                        | JSON 指针                                                | 字段           | 加成类别 | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                         |
| ------------------------------------------- | -------------------------------------------------------- | -------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 鸾鹤引声（`CranesCry`）                     | `/CranesCry/modifier/0/effect/baseDMGBonus`              | `baseDMGBonus` | 基础乘区 | `0.2`  | `[{"tags":["DirectDamage","MartialArts","MuseflowWaistDrum","MartialArt","DrumSeries","CranesCry","RibbonAndDrum"],"martialArt":"museflowWaistDrum"},{"requirement":[{"target":"target","value":"TangledGauze"}]}]`                       |
| 凌波·撼玉（`RippleJadebreaker`）            | `/RippleJadebreaker/modifier/0/effect/baseDMGBonus`      | `baseDMGBonus` | 基础乘区 | `0.3`  | `[{"tags":["DirectDamage","MartialArts","MuseflowWaistDrum","Special","DrumSeries","RippleJadebreaker","JadebreakerNormal","RibbonAndDrum"],"martialArt":"museflowWaistDrum"},{"requirement":[{"target":"targetType","value":"Dummy"}]}]` |
| 凌波·昭阳（`RippleDawnsun`）                | `/RippleDawnsun/modifier/0/effect/baseDMGBonus`          | `baseDMGBonus` | 基础乘区 | `0.3`  | `[{"tags":["DirectDamage","MartialArts","MuseflowWaistDrum","Special","DrumSeries","RippleDawnsun","RibbonAndDrum"],"martialArt":"museflowWaistDrum"},{"requirement":[{"target":"targetType","value":"Dummy"}]}]`                         |
| 凌波·撼玉·强化音波（`JadebreakerEnhanced`） | `/JadebreakerEnhanced/modifier/0/effect/baseDMGBonus`    | `baseDMGBonus` | 基础乘区 | `0.3`  | `[{"tags":["DirectDamage","MartialArts","MuseflowWaistDrum","Special","DrumSeries","JadebreakerEnhanced","Triggered","RibbonAndDrum"],"martialArt":"museflowWaistDrum"},{"requirement":[{"target":"targetType","value":"Dummy"}]}]`       |
| 凌波·繁音（`RippleFlourishingNotes`）       | `/RippleFlourishingNotes/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.3`  | `[{"tags":["DirectDamage","MartialArts","MuseflowWaistDrum","Special","DrumSeries","RippleFlourishingNotes","RibbonAndDrum"],"martialArt":"museflowWaistDrum"},{"requirement":[{"target":"targetType","value":"Dummy"}]}]`                |

### mystic.json

来源：[data/skill/mystic.json](../data/skill/mystic.json)。所有行均待确认。

| 记录                                    | JSON 指针                                  | 字段       | 加成类别       | 编写值                                                              | 外层条件 / 元数据                                                                                                                                      |
| --------------------------------------- | ------------------------------------------ | ---------- | -------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 太白醉月第5击（打断）（`DrunkenPoet5`） | `/DrunkenPoet5/modifier/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `{"function":"byStack","param1":"EnhanceDrunkenPoet","param2":0.2}` | `[{"tags":["DirectDamage","Mystic","SingleTargetMystic","DrunkenPoet","SubAction"]},{"requirement":[{"target":"self","value":"EnhanceDrunkenPoet"}]}]` |

### nameless-spear.json

来源：[data/skill/nameless-spear.json](../data/skill/nameless-spear.json)。不含上述类别中的显式伤害加成字段。

### nameless-sword.json

来源：[data/skill/nameless-sword.json](../data/skill/nameless-sword.json)。不含上述类别中的显式伤害加成字段。

### panacea-fan.json

来源：[data/skill/panacea-fan.json](../data/skill/panacea-fan.json)。不含上述类别中的显式伤害加成字段。

### phalanxbane-blade.json

来源：[data/skill/phalanxbane-blade.json](../data/skill/phalanxbane-blade.json)。所有行均待确认。

| 记录                                            | JSON 指针                                                   | 字段           | 加成类别 | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                      |
| ----------------------------------------------- | ----------------------------------------------------------- | -------------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 焚此心 快速砸击1（`PhalanxbaneHeavyFastSlam1`） | `/PhalanxbaneHeavyFastSlam1/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.32` | `[{"tags":["DirectDamage","MartialArts","Heavy","Charged","MoBlade","PhalanxbaneBlade","BurningHeart","TriggerAnxiSolder","SubAction"],"martialArt":"phalanxbane"},{"requirement":[{"target":"self","value":"SteadfastDevotionT4"}]}]` |
| 焚此心 快速砸击2（`PhalanxbaneHeavyFastSlam2`） | `/PhalanxbaneHeavyFastSlam2/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.32` | `[{"tags":["DirectDamage","MartialArts","Heavy","Charged","MoBlade","PhalanxbaneBlade","BurningHeart","TriggerAnxiSolder","SubAction"],"martialArt":"phalanxbane"},{"requirement":[{"target":"self","value":"SteadfastDevotionT4"}]}]` |
| 焚此心 快速砸击3（`PhalanxbaneHeavyFastSlam3`） | `/PhalanxbaneHeavyFastSlam3/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.32` | `[{"tags":["DirectDamage","MartialArts","Heavy","Charged","MoBlade","PhalanxbaneBlade","BurningHeart","TriggerAnxiSolder","SubAction"],"martialArt":"phalanxbane"},{"requirement":[{"target":"self","value":"SteadfastDevotionT4"}]}]` |

### skygrasp-rope-dart.json

来源：[data/skill/skygrasp-rope-dart.json](../data/skill/skygrasp-rope-dart.json)。不含上述类别中的显式伤害加成字段。

### snowparting-blade.json

来源：[data/skill/snowparting-blade.json](../data/skill/snowparting-blade.json)。所有行均待确认。

| 记录                             | JSON 指针                                            | 字段           | 加成类别 | 编写值 | 外层条件 / 元数据                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------- | -------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 拨雪寻春（`SnowpartingHeavyVC`） | `/SnowpartingHeavyVC/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.36` | `[{"tags":["DirectDamage","MartialArts","Heavy","VariedCombo","HengBlade","SnowpartingBlade","SnowbreakSpring","TriggerAnxiSolder"],"martialArt":"snowparting"}]` |

### soulshade-umbrella.json

来源：[data/skill/soulshade-umbrella.json](../data/skill/soulshade-umbrella.json)。不含上述类别中的显式伤害加成字段。

### stormbreaker-spear.json

来源：[data/skill/stormbreaker-spear.json](../data/skill/stormbreaker-spear.json)。不含上述类别中的显式伤害加成字段。

### strategic-sword.json

来源：[data/skill/strategic-sword.json](../data/skill/strategic-sword.json)。不含上述类别中的显式伤害加成字段。

### thundercry-blade.json

来源：[data/skill/thundercry-blade.json](../data/skill/thundercry-blade.json)。不含上述类别中的显式伤害加成字段。

### unfettered-rope-dart.json

来源：[data/skill/unfettered-rope-dart.json](../data/skill/unfettered-rope-dart.json)。所有行均待确认。

| 记录                      | JSON 指针                                     | 字段           | 加成类别 | 编写值 | 外层条件 / 元数据                                                                                                             |
| ------------------------- | --------------------------------------------- | -------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| 焚巢捣穴（`BurnAndBury`） | `/BurnAndBury/modifier/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区 | `0.3`  | `[{"tags":["MartialArts","DirectDamage","RopeDart","UnfetteredRopeDart","Special","BurnAndBury"],"martialArt":"unfettered"}]` |

### willowbend-fan.json

来源：[data/skill/willowbend-fan.json](../data/skill/willowbend-fan.json)。所有行均待确认。

| 记录                         | JSON 指针                                      | 字段           | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                                         |
| ---------------------------- | ---------------------------------------------- | -------------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 不尽春生（`BoundlessBloom`） | `/BoundlessBloom/modifier/0/effect/hpDMGBonus` | `hpDMGBonus`   | 类别 1（加算） | `0.25` | `[{"tags":["DirectDamage","MartialArts","WillowbendFan","MartialArt","BoundlessBloom","Fan"],"martialArt":"willowbendFan"}]`                                                                                                                                              |
| 煞尽东风（`EndOfGale`）      | `/EndOfGale/modifier/0/effect/baseDMGBonus`    | `baseDMGBonus` | 基础乘区       | `0.2`  | `[{"requirement":[{"target":"self","value":"ZephyrWhispersT0"}],"tags":["DirectDamage","MartialArts","WillowbendFan","Heavy","VariedCombo","Perception","EndOfGale","Fan"],"martialArt":"willowbendFan"},{"requirement":[{"target":"self","value":"ZephyrWhispersT3"}]}]` |

## 武学定义（martial-art）

### everspring-umbrella.json

来源：[data/martial-art/everspring-umbrella.json](../data/martial-art/everspring-umbrella.json)。所有行均待确认。

| 记录     | JSON 指针                                             | 字段                | 加成类别       | 编写值                                                             | 外层条件 / 元数据                                                                                                          |
| -------- | ----------------------------------------------------- | ------------------- | -------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 醉梦游春 | `/talent/13/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/13/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/14/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/14/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/14/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.0725`                                                           | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"}]}]`                                                   |
| 醉梦游春 | `/talent/15/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/15/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"},{"target":"skillTag","value":"ReturningUmbrella"}]}]` |
| 醉梦游春 | `/talent/15/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.15`                                                             | `[{"requirement":[{"target":"skillTag","value":"EverspringUmbrella"}]}]`                                                   |

### heavenquaker-spear.json

来源：[data/martial-art/heavenquaker-spear.json](../data/martial-art/heavenquaker-spear.json)。所有行均待确认。

| 记录       | JSON 指针                                       | 字段                 | 加成类别       | 编写值                                                                     | 外层条件 / 元数据                                                                                                                 |
| ---------- | ----------------------------------------------- | -------------------- | -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 九曲惊神枪 | `/talent/13/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`         | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"DOT"},{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 九曲惊神枪 | `/talent/13/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.11}}`  | 在此记录内无条件                                                                                                                  |
| 九曲惊神枪 | `/talent/14/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`         | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"DOT"},{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 九曲惊神枪 | `/talent/14/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.118}}` | 在此记录内无条件                                                                                                                  |
| 九曲惊神枪 | `/talent/14/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.0725`                                                                   | `[{"requirement":[{"target":"skillTag","value":"HeavenQuakerSpear"}]}]`                                                           |
| 九曲惊神枪 | `/talent/15/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`         | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"DOT"},{"target":"skillTag","value":"HighBleed"}]}]}]` |
| 九曲惊神枪 | `/talent/15/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.126}}` | 在此记录内无条件                                                                                                                  |
| 九曲惊神枪 | `/talent/15/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.15`                                                                     | `[{"requirement":[{"target":"skillTag","value":"HeavenQuakerSpear"}]}]`                                                           |

### heavenwill-gauntlets.json

来源：[data/martial-art/heavenwill-gauntlets.json](../data/martial-art/heavenwill-gauntlets.json)。所有行均待确认。

| 记录     | JSON 指针                                                        | 字段                                | 加成类别                     | 编写值                                                                    | 外层条件 / 元数据                                                                                                                        |
| -------- | ---------------------------------------------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 天志垂象 | `/talent/13/2/effect/0/effectiveStat/critDmgBonus`               | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |
| 天志垂象 | `/talent/13/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                                                                                         |
| 天志垂象 | `/talent/14/2/effect/0/effectiveStat/critDmgBonus`               | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |
| 天志垂象 | `/talent/14/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                                                                                         |
| 天志垂象 | `/talent/14/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.0725`                                                                  | `[{"requirement":[{"target":"skillTag","value":"HeavenwillGauntlets"}]}]`                                                                |
| 天志垂象 | `/talent/14/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.00725`                                                                 | `[{"requirement":[{"target":"skillTag","value":"HeavenwillGauntlets"}]}]`                                                                |
| 天志垂象 | `/talent/15/2/effect/0/effectiveStat/critDmgBonus`               | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |
| 天志垂象 | `/talent/15/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                                                                                         |
| 天志垂象 | `/talent/15/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.15`                                                                    | `[{"requirement":[{"target":"skillTag","value":"HeavenwillGauntlets"}]}]`                                                                |
| 天志垂象 | `/talent/15/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.015`                                                                   | `[{"requirement":[{"target":"skillTag","value":"HeavenwillGauntlets"}]}]`                                                                |

### infernal-twinblades.json

来源：[data/martial-art/infernal-twinblades.json](../data/martial-art/infernal-twinblades.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段              | 加成类别       | 编写值                                                                           | 外层条件 / 元数据                                                        |
| -------- | ---------------------------------------------- | ----------------- | -------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 泥犁三垢 | `/talent/13/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `0.05`                                                                           | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/13/2/effect/1/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"formula":{"source":"minPhys","multiplier":0.0003333333333333333,"max":0.25}}` | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/14/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `0.05`                                                                           | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/14/2/effect/1/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"formula":{"source":"minPhys","multiplier":0.0003333333333333333,"max":0.25}}` | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/14/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus` | 固定攻击项缩放 | `0.0725`                                                                         | `[{"requirement":[{"target":"skillTag","value":"InfernalTwinblades"}]}]` |
| 泥犁三垢 | `/talent/15/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `0.05`                                                                           | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/15/2/effect/1/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"formula":{"source":"minPhys","multiplier":0.0003333333333333333,"max":0.25}}` | `[{"requirement":[{"target":"self","value":"Flamelash"}]}]`              |
| 泥犁三垢 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus` | 固定攻击项缩放 | `0.15`                                                                           | `[{"requirement":[{"target":"skillTag","value":"InfernalTwinblades"}]}]` |

### inkwell-fan.json

来源：[data/martial-art/inkwell-fan.json](../data/martial-art/inkwell-fan.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段               | 加成类别       | 编写值                                                                                                                                                                                                                | 外层条件 / 元数据                                                                                                                    |
| -------- | ---------------------------------------------- | ------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 青山执笔 | `/talent/13/0/effect/0/effect/hpDMGBonus`      | `hpDMGBonus`       | 类别 1（加算） | `0.08`                                                                                                                                                                                                                | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"},{"target":"targetQiPercentage","comparison":"<","amount":30}]}]` |
| 青山执笔 | `/talent/13/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"}]}]`                                                              |
| 青山执笔 | `/talent/13/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.11}}`                                                                                                                                               | 在此记录内无条件                                                                                                                     |
| 青山执笔 | `/talent/14/0/effect/0/effect/hpDMGBonus`      | `hpDMGBonus`       | 类别 1（加算） | `0.08`                                                                                                                                                                                                                | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"},{"target":"targetQiPercentage","comparison":"<","amount":30}]}]` |
| 青山执笔 | `/talent/14/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"}]}]`                                                              |
| 青山执笔 | `/talent/14/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.118}}`                                                                                                                                              | 在此记录内无条件                                                                                                                     |
| 青山执笔 | `/talent/14/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.0725`                                                                                                                                                                                                              | `[{"requirement":[{"target":"skillTag","value":"InkwellFan"}]}]`                                                                     |
| 青山执笔 | `/talent/15/0/effect/0/effect/hpDMGBonus`      | `hpDMGBonus`       | 类别 1（加算） | `0.08`                                                                                                                                                                                                                | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"},{"target":"targetQiPercentage","comparison":"<","amount":30}]}]` |
| 青山执笔 | `/talent/15/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"MoonShatterSpring"}]}]`                                                              |
| 青山执笔 | `/talent/15/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.126}}`                                                                                                                                              | 在此记录内无条件                                                                                                                     |
| 青山执笔 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.15`                                                                                                                                                                                                                | `[{"requirement":[{"target":"skillTag","value":"InkwellFan"}]}]`                                                                     |

### mortal-rope-dart.json

来源：[data/martial-art/mortal-rope-dart.json](../data/martial-art/mortal-rope-dart.json)。所有行均待确认。

| 记录     | JSON 指针                                                        | 字段                                | 加成类别                     | 编写值                                                                    | 外层条件 / 元数据                                                    |
| -------- | ---------------------------------------------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 粟子游尘 | `/talent/13/2/effect/0/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/13/2/effect/0/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/13/2/effect/1/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/13/2/effect/1/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/13/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                     |
| 粟子游尘 | `/talent/14/2/effect/0/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/14/2/effect/0/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/14/2/effect/1/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/14/2/effect/1/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/14/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                     |
| 粟子游尘 | `/talent/14/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.0725`                                                                  | `[{"requirement":[{"target":"skillTag","value":"MortalRopeDart"}]}]` |
| 粟子游尘 | `/talent/14/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.00725`                                                                 | `[{"requirement":[{"target":"skillTag","value":"MortalRopeDart"}]}]` |
| 粟子游尘 | `/talent/15/2/effect/0/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/15/2/effect/0/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `0.09`                                                                    | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/15/2/effect/1/effect/stat/physDmgBonus`                 | `physDmgBonus`                      | 外功通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/15/2/effect/1/effect/stat/bamboocutDmgBonus`            | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}`        | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]`         |
| 粟子游尘 | `/talent/15/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                     |
| 粟子游尘 | `/talent/15/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.15`                                                                    | `[{"requirement":[{"target":"skillTag","value":"MortalRopeDart"}]}]` |
| 粟子游尘 | `/talent/15/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.015`                                                                   | `[{"requirement":[{"target":"skillTag","value":"MortalRopeDart"}]}]` |

### museflow-waist-drum.json

来源：[data/martial-art/museflow-waist-drum.json](../data/martial-art/museflow-waist-drum.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段               | 加成类别       | 编写值                                                                               | 外层条件 / 元数据                                                                                                                                                           |
| -------- | ---------------------------------------------- | ------------------ | -------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 文动霓裳 | `/talent/2/1/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.1}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/3/1/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.1}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/3/2/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.02}}`              | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/4/1/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.1}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/4/2/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.028}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/5/0/effect/0/effect/baseDMGBonus`     | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/5/2/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.1}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/5/3/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.038}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/6/0/effect/0/effect/baseDMGBonus`     | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/6/2/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.2}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/6/3/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.048}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/7/0/effect/0/effect/baseDMGBonus`     | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/7/2/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.2}`                 | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/7/3/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.056}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/8/0/effect/0/effect/baseDMGBonus`     | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/8/2/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/8/3/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.056}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/9/0/effect/0/effect/baseDMGBonus`     | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/9/2/effect/0/effect/critDmgBonus`     | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/9/3/effect/0/stat/silkbindDmgBonus`   | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.056}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/10/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/10/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/10/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.066}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/11/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/11/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/11/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.076}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/12/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/12/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/12/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.09}}`              | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/13/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/13/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/13/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.11}}`              | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/14/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/14/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/14/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.118}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/14/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.0725`                                                                             | `[{"requirement":[{"target":"skillTag","value":"MuseflowWaistDrum"}]}]`                                                                                                     |
| 文动霓裳 | `/talent/15/0/effect/0/effect/baseDMGBonus`    | `baseDMGBonus`     | 基础乘区       | `0.4`                                                                                | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]},{"target":"skillTag","value":"DrumSeries"}]}]` |
| 文动霓裳 | `/talent/15/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`     | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.5,"max":0.3},"max":0.30000000000000004}` | `[{"requirement":[{"target":"skillTag","value":"DrumSeries"}]}]`                                                                                                            |
| 文动霓裳 | `/talent/15/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.126}}`             | 在此记录内无条件                                                                                                                                                            |
| 文动霓裳 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.15`                                                                               | `[{"requirement":[{"target":"skillTag","value":"MuseflowWaistDrum"}]}]`                                                                                                     |

### nameless-spear.json

来源：[data/martial-art/nameless-spear.json](../data/martial-art/nameless-spear.json)。所有行均待确认。

| 记录     | JSON 指针                                       | 字段                 | 加成类别       | 编写值                                                                     | 外层条件 / 元数据                                                                                                                                         |
| -------- | ----------------------------------------------- | -------------------- | -------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 无名枪法 | `/talent/13/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"affinity","multiplier":0.6,"max":0.18}}`            | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"EndlessGale"},{"target":"endurancePercentage","comparison":"<","amount":60}]}]}]` |
| 无名枪法 | `/talent/13/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.11}}`  | 在此记录内无条件                                                                                                                                          |
| 无名枪法 | `/talent/14/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"affinity","multiplier":0.6,"max":0.18}}`            | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"EndlessGale"},{"target":"endurancePercentage","comparison":"<","amount":60}]}]}]` |
| 无名枪法 | `/talent/14/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.118}}` | 在此记录内无条件                                                                                                                                          |
| 无名枪法 | `/talent/14/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.0725`                                                                   | `[{"requirement":[{"target":"skillTag","value":"NamelessSpear"}]}]`                                                                                       |
| 无名枪法 | `/talent/15/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus`   | 会意结果乘区   | `{"formula":{"source":"affinity","multiplier":0.6,"max":0.18}}`            | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"EndlessGale"},{"target":"endurancePercentage","comparison":"<","amount":60}]}]}]` |
| 无名枪法 | `/talent/15/3/effect/0/stat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区   | `{"formula":{"source":"maxBellstrike","multiplier":0.000168,"max":0.126}}` | 在此记录内无条件                                                                                                                                          |
| 无名枪法 | `/talent/15/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.15`                                                                     | `[{"requirement":[{"target":"skillTag","value":"NamelessSpear"}]}]`                                                                                       |

### nameless-sword.json

来源：[data/martial-art/nameless-sword.json](../data/martial-art/nameless-sword.json)。所有行均待确认。

| 记录     | JSON 指针                                       | 字段               | 加成类别               | 编写值                                                                                                                                                       | 外层条件 / 元数据                                                                                                                                                                                      |
| -------- | ----------------------------------------------- | ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 无名剑法 | `/talent/13/0/effect/0/effect/qiDMGBonus`       | `qiDMGBonus`       | 真气伤害（当前不求值） | `0.1`                                                                                                                                                        | 在此记录内无条件                                                                                                                                                                                       |
| 无名剑法 | `/talent/13/0/effect/1/effect/hpDMGBonus`       | `hpDMGBonus`       | 类别 1（加算）         | `{"function":"segment","param1":"maxPhys","param2":[100,200,300,400,500,600,700,800,900,1000],"param3":[0,0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.16,0.18,0.2]}` | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]`                                                                                                                                      |
| 无名剑法 | `/talent/13/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区           | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`                                                                                           | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"},{"operator":"or","operand":[{"target":"targetQiPercentage","comparison":"<","amount":40},{"target":"target","value":"QiImbalance"}]}]}]` |
| 无名剑法 | `/talent/14/0/effect/0/effect/qiDMGBonus`       | `qiDMGBonus`       | 真气伤害（当前不求值） | `0.1`                                                                                                                                                        | 在此记录内无条件                                                                                                                                                                                       |
| 无名剑法 | `/talent/14/0/effect/1/effect/hpDMGBonus`       | `hpDMGBonus`       | 类别 1（加算）         | `{"function":"segment","param1":"maxPhys","param2":[100,200,300,400,500,600,700,800,900,1000],"param3":[0,0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.16,0.18,0.2]}` | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]`                                                                                                                                      |
| 无名剑法 | `/talent/14/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区           | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`                                                                                           | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"},{"operator":"or","operand":[{"target":"targetQiPercentage","comparison":"<","amount":40},{"target":"target","value":"QiImbalance"}]}]}]` |
| 无名剑法 | `/talent/14/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`  | 固定攻击项缩放         | `0.0725`                                                                                                                                                     | `[{"requirement":[{"target":"skillTag","value":"NamelessSword"}]}]`                                                                                                                                    |
| 无名剑法 | `/talent/15/0/effect/0/effect/qiDMGBonus`       | `qiDMGBonus`       | 真气伤害（当前不求值） | `0.1`                                                                                                                                                        | 在此记录内无条件                                                                                                                                                                                       |
| 无名剑法 | `/talent/15/0/effect/1/effect/hpDMGBonus`       | `hpDMGBonus`       | 类别 1（加算）         | `{"function":"segment","param1":"maxPhys","param2":[100,200,300,400,500,600,700,800,900,1000],"param3":[0,0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.16,0.18,0.2]}` | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]`                                                                                                                                      |
| 无名剑法 | `/talent/15/2/effect/0/effect/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区           | `{"formula":{"source":"maxPhys","multiplier":0.00012,"max":0.18}}`                                                                                           | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"},{"operator":"or","operand":[{"target":"targetQiPercentage","comparison":"<","amount":40},{"target":"target","value":"QiImbalance"}]}]}]` |
| 无名剑法 | `/talent/15/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`  | 固定攻击项缩放         | `0.15`                                                                                                                                                       | `[{"requirement":[{"target":"skillTag","value":"NamelessSword"}]}]`                                                                                                                                    |

### panacea-fan.json

来源：[data/martial-art/panacea-fan.json](../data/martial-art/panacea-fan.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段               | 加成类别       | 编写值                                                                   | 外层条件 / 元数据                                                                                                        |
| -------- | ---------------------------------------------- | ------------------ | -------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 明川药典 | `/talent/13/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                                                                         |
| 明川药典 | `/talent/14/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                                                                         |
| 明川药典 | `/talent/14/6/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.0725`                                                                 | `[{"requirement":[{"target":"skillTag","value":"PanaceaFan"}]}]`                                                         |
| 明川药典 | `/talent/15/3/effect/0/stat/silkbindDmgBonus`  | `silkbindDmgBonus` | 牵丝通道乘区   | `{"formula":{"source":"minSilkbind","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                                                                         |
| 明川药典 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.15`                                                                   | `[{"requirement":[{"target":"equippedMartialArt","value":"soulshadeUmbrella"},{"target":"skillTag","value":"Mystic"}]}]` |
| 明川药典 | `/talent/15/6/effect/0/effect/flatAttackBonus` | `flatAttackBonus`  | 固定攻击项缩放 | `0.0725`                                                                 | `[{"requirement":[{"target":"skillTag","value":"PanaceaFan"}]}]`                                                         |

### phalanxbane-blade.json

来源：[data/martial-art/phalanxbane-blade.json](../data/martial-art/phalanxbane-blade.json)。所有行均待确认。

| 记录     | JSON 指针                                                        | 字段                                | 加成类别                     | 编写值    | 外层条件 / 元数据                                                      |
| -------- | ---------------------------------------------------------------- | ----------------------------------- | ---------------------------- | --------- | ---------------------------------------------------------------------- |
| 十方破阵 | `/talent/14/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.0725`  | `[{"requirement":[{"target":"skillTag","value":"PhalanxbaneBlade"}]}]` |
| 十方破阵 | `/talent/14/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.00725` | `[{"requirement":[{"target":"skillTag","value":"PhalanxbaneBlade"}]}]` |
| 十方破阵 | `/talent/15/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.15`    | `[{"requirement":[{"target":"skillTag","value":"PhalanxbaneBlade"}]}]` |
| 十方破阵 | `/talent/15/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.015`   | `[{"requirement":[{"target":"skillTag","value":"PhalanxbaneBlade"}]}]` |

### riven-twinblades.json

来源：[data/martial-art/riven-twinblades.json](../data/martial-art/riven-twinblades.json)。所有行均待确认。

| 记录     | JSON 指针                                             | 字段                | 加成类别       | 编写值                                                             | 外层条件 / 元数据                                                     |
| -------- | ----------------------------------------------------- | ------------------- | -------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------- |
| 断水双诀 | `/talent/13/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/13/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/14/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/14/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/14/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.0725`                                                           | `[{"requirement":[{"target":"skillTag","value":"RivenTwinblades"}]}]` |
| 断水双诀 | `/talent/15/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/15/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"self","value":"Inebriate"}]}]`           |
| 断水双诀 | `/talent/15/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.15`                                                             | `[{"requirement":[{"target":"skillTag","value":"RivenTwinblades"}]}]` |

### skygrasp-rope-dart.json

来源：[data/martial-art/skygrasp-rope-dart.json](../data/martial-art/skygrasp-rope-dart.json)。所有行均待确认。

| 记录     | JSON 指针                                             | 字段                | 加成类别       | 编写值                                                             | 外层条件 / 元数据                                                                             |
| -------- | ----------------------------------------------------- | ------------------- | -------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 千机索天 | `/talent/13/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/13/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/14/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/14/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/14/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.0725`                                                           | `[{"requirement":[{"target":"skillTag","value":"SkygraspRopeDart"}]}]`                        |
| 千机索天 | `/talent/15/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`      | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/15/2/effect/0/effect/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00012,"max":0.09}}` | `[{"requirement":[{"target":"resource","value":"HeavensWill","comparison":">","amount":1}]}]` |
| 千机索天 | `/talent/15/5/effect/0/effect/flatAttackBonus`        | `flatAttackBonus`   | 固定攻击项缩放 | `0.15`                                                             | `[{"requirement":[{"target":"skillTag","value":"SkygraspRopeDart"}]}]`                        |

### skystrike-gauntlets.json

来源：[data/martial-art/skystrike-gauntlets.json](../data/martial-art/skystrike-gauntlets.json)。所有行均待确认。

| 记录     | JSON 指针                                                        | 字段                                | 加成类别                     | 编写值                                                                    | 外层条件 / 元数据                                                        |
| -------- | ---------------------------------------------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 悬身拳法 | `/talent/13/2/effect/0/effect/critDmgBonus`                      | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"target":"skillTag","value":"InebriateEnhanced"}]}]`  |
| 悬身拳法 | `/talent/13/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                         |
| 悬身拳法 | `/talent/14/2/effect/0/effect/critDmgBonus`                      | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"target":"skillTag","value":"InebriateEnhanced"}]}]`  |
| 悬身拳法 | `/talent/14/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                         |
| 悬身拳法 | `/talent/14/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.0725`                                                                  | `[{"requirement":[{"target":"skillTag","value":"SkystrikeGauntlets"}]}]` |
| 悬身拳法 | `/talent/14/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.00725`                                                                 | `[{"requirement":[{"target":"skillTag","value":"SkystrikeGauntlets"}]}]` |
| 悬身拳法 | `/talent/15/2/effect/0/effect/critDmgBonus`                      | `critDmgBonus`                      | 会心结果乘区                 | `{"formula":{"source":"minPhys","multiplier":0.0004,"max":0.3}}`          | `[{"requirement":[{"target":"skillTag","value":"InebriateEnhanced"}]}]`  |
| 悬身拳法 | `/talent/15/3/effect/0/stat/bamboocutDmgBonus`                   | `bamboocutDmgBonus`                 | 破竹通道乘区                 | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                         |
| 悬身拳法 | `/talent/15/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.15`                                                                    | `[{"requirement":[{"target":"skillTag","value":"SkystrikeGauntlets"}]}]` |
| 悬身拳法 | `/talent/15/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.015`                                                                   | `[{"requirement":[{"target":"skillTag","value":"SkystrikeGauntlets"}]}]` |

### snowparting-blade.json

来源：[data/martial-art/snowparting-blade.json](../data/martial-art/snowparting-blade.json)。所有行均待确认。

| 记录     | JSON 指针                                          | 字段                 | 加成类别       | 编写值                                                                     | 外层条件 / 元数据                                                                               |
| -------- | -------------------------------------------------- | -------------------- | -------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 斩雪刀法 | `/talent/13/2/effect/0/effectiveStat/critDmgBonus` | `critDmgBonus`       | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.35,"max":0.21}}`               | `[{"requirement":[{"target":"resource","value":"BladeMomentum","comparison":">","amount":1}]}]` |
| 斩雪刀法 | `/talent/13/3/effect/0/stat/stonesplitDmgBonus`    | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                                                |
| 斩雪刀法 | `/talent/14/2/effect/0/effectiveStat/critDmgBonus` | `critDmgBonus`       | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.35,"max":0.21}}`               | `[{"requirement":[{"target":"resource","value":"BladeMomentum","comparison":">","amount":1}]}]` |
| 斩雪刀法 | `/talent/14/3/effect/0/stat/stonesplitDmgBonus`    | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                                                |
| 斩雪刀法 | `/talent/14/5/effect/0/effect/flatAttackBonus`     | `flatAttackBonus`    | 固定攻击项缩放 | `0.0725`                                                                   | `[{"requirement":[{"target":"skillTag","value":"SnowpartingBlade"}]}]`                          |
| 斩雪刀法 | `/talent/15/2/effect/0/effectiveStat/critDmgBonus` | `critDmgBonus`       | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.35,"max":0.21}}`               | `[{"requirement":[{"target":"resource","value":"BladeMomentum","comparison":">","amount":1}]}]` |
| 斩雪刀法 | `/talent/15/3/effect/0/stat/stonesplitDmgBonus`    | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                                                |
| 斩雪刀法 | `/talent/15/5/effect/0/effect/flatAttackBonus`     | `flatAttackBonus`    | 固定攻击项缩放 | `0.15`                                                                     | `[{"requirement":[{"target":"skillTag","value":"SnowpartingBlade"}]}]`                          |

### soulshade-umbrella.json

来源：[data/martial-art/soulshade-umbrella.json](../data/martial-art/soulshade-umbrella.json)。所有行均待确认。

| 记录       | JSON 指针                                               | 字段              | 加成类别       | 编写值   | 外层条件 / 元数据                                                                                                 |
| ---------- | ------------------------------------------------------- | ----------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| 千香引魂蛊 | `/talent/13/0/effect/0/effect/dmgBonus`                 | `dmgBonus`        | 类别 1（加算） | `0.2`    | `[{"requirement":[{"target":"equippedMartialArt","value":"panaceaFan"},{"target":"skillTag","value":"Mystic"}]}]` |
| 千香引魂蛊 | `/talent/13/0/effect/1/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/13/0/effect/2/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/14/0/effect/0/effect/dmgBonus`                 | `dmgBonus`        | 类别 1（加算） | `0.2`    | `[{"requirement":[{"target":"equippedMartialArt","value":"panaceaFan"},{"target":"skillTag","value":"Mystic"}]}]` |
| 千香引魂蛊 | `/talent/14/0/effect/1/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/14/0/effect/2/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/14/5/effect/0/effect/flatAttackBonus`          | `flatAttackBonus` | 固定攻击项缩放 | `0.0725` | `[{"requirement":[{"target":"skillTag","value":"SoulshadeUmbrella"}]}]`                                           |
| 千香引魂蛊 | `/talent/15/0/effect/0/effect/dmgBonus`                 | `dmgBonus`        | 类别 1（加算） | `0.2`    | `[{"requirement":[{"target":"equippedMartialArt","value":"panaceaFan"},{"target":"skillTag","value":"Mystic"}]}]` |
| 千香引魂蛊 | `/talent/15/0/effect/1/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/15/0/effect/2/modify/effect/0/effect/dmgBonus` | `dmgBonus`        | 类别 1（加算） | `0.05`   | `[{"requirement":[{"target":"target","value":"Exhausted"}]}]`                                                     |
| 千香引魂蛊 | `/talent/15/5/effect/0/effect/flatAttackBonus`          | `flatAttackBonus` | 固定攻击项缩放 | `0.15`   | `[{"requirement":[{"target":"skillTag","value":"SoulshadeUmbrella"}]}]`                                           |

### stormbreaker-spear.json

来源：[data/martial-art/stormbreaker-spear.json](../data/martial-art/stormbreaker-spear.json)。所有行均待确认。

| 记录       | JSON 指针                                       | 字段                 | 加成类别       | 编写值                                                                     | 外层条件 / 元数据                                                       |
| ---------- | ----------------------------------------------- | -------------------- | -------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 八方风雷枪 | `/talent/13/3/effect/0/stat/stonesplitDmgBonus` | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                        |
| 八方风雷枪 | `/talent/14/3/effect/0/stat/stonesplitDmgBonus` | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                        |
| 八方风雷枪 | `/talent/14/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.0725`                                                                   | `[{"requirement":[{"target":"skillTag","value":"StormbreakerSpear"}]}]` |
| 八方风雷枪 | `/talent/15/3/effect/0/stat/stonesplitDmgBonus` | `stonesplitDmgBonus` | 裂石通道乘区   | `{"formula":{"source":"minStonesplit","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                        |
| 八方风雷枪 | `/talent/15/5/effect/0/effect/flatAttackBonus`  | `flatAttackBonus`    | 固定攻击项缩放 | `0.15`                                                                     | `[{"requirement":[{"target":"skillTag","value":"StormbreakerSpear"}]}]` |

### strategic-sword.json

来源：[data/martial-art/strategic-sword.json](../data/martial-art/strategic-sword.json)。所有行均待确认。

| 记录     | JSON 指针                                                        | 字段                                | 加成类别                     | 编写值    | 外层条件 / 元数据                                                    |
| -------- | ---------------------------------------------------------------- | ----------------------------------- | ---------------------------- | --------- | -------------------------------------------------------------------- |
| 积矩九剑 | `/talent/14/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.0725`  | `[{"requirement":[{"target":"skillTag","value":"StrategicSword"}]}]` |
| 积矩九剑 | `/talent/14/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.00725` | `[{"requirement":[{"target":"skillTag","value":"StrategicSword"}]}]` |
| 积矩九剑 | `/talent/15/5/effect/0/effect/flatAttackBonus`                   | `flatAttackBonus`                   | 固定攻击项缩放               | `0.15`    | `[{"requirement":[{"target":"skillTag","value":"StrategicSword"}]}]` |
| 积矩九剑 | `/talent/15/5/effect/0/effect/coefficientBonusWithoutFlatAttack` | `coefficientBonusWithoutFlatAttack` | 两项固定值均为零时的系数缩放 | `0.015`   | `[{"requirement":[{"target":"skillTag","value":"StrategicSword"}]}]` |

### thundercry-blade.json

来源：[data/martial-art/thundercry-blade.json](../data/martial-art/thundercry-blade.json)。所有行均待确认。

| 记录     | JSON 指针                                          | 字段              | 加成类别       | 编写值   | 外层条件 / 元数据                                                                                                                                                                       |
| -------- | -------------------------------------------------- | ----------------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 嗟夫刀法 | `/talent/13/0/effect/1/effectiveStat/critDmgBonus` | `critDmgBonus`    | 会心结果乘区   | `0.1`    | `[{"requirement":[{"target":"skillTag","value":"ThundercryBlade"},{"operator":"or","operand":[{"target":"skillTag","value":"Charged"},{"target":"skillTag","value":"VariedCombo"}]}]}]` |
| 嗟夫刀法 | `/talent/14/0/effect/1/effectiveStat/critDmgBonus` | `critDmgBonus`    | 会心结果乘区   | `0.1`    | `[{"requirement":[{"target":"skillTag","value":"ThundercryBlade"},{"operator":"or","operand":[{"target":"skillTag","value":"Charged"},{"target":"skillTag","value":"VariedCombo"}]}]}]` |
| 嗟夫刀法 | `/talent/14/5/effect/0/effect/flatAttackBonus`     | `flatAttackBonus` | 固定攻击项缩放 | `0.0725` | `[{"requirement":[{"target":"skillTag","value":"ThundercryBlade"}]}]`                                                                                                                   |
| 嗟夫刀法 | `/talent/15/0/effect/1/effectiveStat/critDmgBonus` | `critDmgBonus`    | 会心结果乘区   | `0.1`    | `[{"requirement":[{"target":"skillTag","value":"ThundercryBlade"},{"operator":"or","operand":[{"target":"skillTag","value":"Charged"},{"target":"skillTag","value":"VariedCombo"}]}]}]` |
| 嗟夫刀法 | `/talent/15/5/effect/0/effect/flatAttackBonus`     | `flatAttackBonus` | 固定攻击项缩放 | `0.15`   | `[{"requirement":[{"target":"skillTag","value":"ThundercryBlade"}]}]`                                                                                                                   |

### unfettered-rope-dart.json

来源：[data/martial-art/unfettered-rope-dart.json](../data/martial-art/unfettered-rope-dart.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段                | 加成类别       | 编写值                                                                    | 外层条件 / 元数据                                                        |
| -------- | ---------------------------------------------- | ------------------- | -------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 粟子行云 | `/talent/13/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`      | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.45,"max":0.27}}`              | `[{"requirement":[{"target":"target","value":"Soulbreak"}]}]`            |
| 粟子行云 | `/talent/13/3/effect/0/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.11}}`  | 在此记录内无条件                                                         |
| 粟子行云 | `/talent/14/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`      | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.45,"max":0.27}}`              | `[{"requirement":[{"target":"target","value":"Soulbreak"}]}]`            |
| 粟子行云 | `/talent/14/3/effect/0/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.118}}` | 在此记录内无条件                                                         |
| 粟子行云 | `/talent/14/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`   | 固定攻击项缩放 | `0.0725`                                                                  | `[{"requirement":[{"target":"skillTag","value":"UnfetteredRopeDart"}]}]` |
| 粟子行云 | `/talent/15/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`      | 会心结果乘区   | `{"formula":{"source":"crit","multiplier":0.45,"max":0.27}}`              | `[{"requirement":[{"target":"target","value":"Soulbreak"}]}]`            |
| 粟子行云 | `/talent/15/3/effect/0/stat/bamboocutDmgBonus` | `bamboocutDmgBonus` | 破竹通道乘区   | `{"formula":{"source":"minBamboocut","multiplier":0.000336,"max":0.126}}` | 在此记录内无条件                                                         |
| 粟子行云 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus`   | 固定攻击项缩放 | `0.15`                                                                    | `[{"requirement":[{"target":"skillTag","value":"UnfetteredRopeDart"}]}]` |

### vernal-umbrella.json

来源：[data/martial-art/vernal-umbrella.json](../data/martial-art/vernal-umbrella.json)。所有行均待确认。

| 记录     | JSON 指针                                      | 字段              | 加成类别       | 编写值                                                                                                                                                                                                                | 外层条件 / 元数据                                                                                              |
| -------- | ---------------------------------------------- | ----------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 九重春色 | `/talent/13/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"VernalUmbrella"},{"target":"skillTag","value":"Ballistic"}]}]` |
| 九重春色 | `/talent/14/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"VernalUmbrella"},{"target":"skillTag","value":"Ballistic"}]}]` |
| 九重春色 | `/talent/14/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus` | 固定攻击项缩放 | `0.0725`                                                                                                                                                                                                              | `[{"requirement":[{"target":"skillTag","value":"VernalUmbrella"}]}]`                                           |
| 九重春色 | `/talent/15/2/effect/0/effect/critDmgBonus`    | `critDmgBonus`    | 会心结果乘区   | `{"function":"segment","param1":"minPhys","param2":[50,100,150,200,250,300,350,400,450,500,550,600,650,700,750],"param3":[0,0.024,0.048,0.072,0.096,0.12,0.144,0.168,0.192,0.216,0.24,0.264,0.288,0.312,0.336,0.36]}` | `[{"requirement":[{"target":"skillTag","value":"VernalUmbrella"},{"target":"skillTag","value":"Ballistic"}]}]` |
| 九重春色 | `/talent/15/5/effect/0/effect/flatAttackBonus` | `flatAttackBonus` | 固定攻击项缩放 | `0.15`                                                                                                                                                                                                                | `[{"requirement":[{"target":"skillTag","value":"VernalUmbrella"}]}]`                                           |

### willowbend-fan.json

来源：[data/martial-art/willowbend-fan.json](../data/martial-art/willowbend-fan.json)。所有行均待确认。

| 记录     | JSON 指针                                            | 字段                    | 加成类别       | 编写值                                                             | 外层条件 / 元数据                                                                                                                |
| -------- | ---------------------------------------------------- | ----------------------- | -------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 杏游草野 | `/talent/0/0/effect/0/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/0/0/effect/0/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/0/0/effect/0/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/0/0/effect/0/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/1/0/effect/0/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/1/0/effect/0/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/1/0/effect/0/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/1/0/effect/0/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/2/0/effect/0/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/2/0/effect/0/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/2/0/effect/0/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/2/0/effect/0/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/2/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/2/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/3/0/effect/0/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/3/0/effect/0/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/3/0/effect/0/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/3/0/effect/0/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/3/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/3/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/4/0/effect/0/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/4/0/effect/0/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/4/0/effect/0/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/4/0/effect/0/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/4/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/4/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/5/0/effect/1/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/5/0/effect/1/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/5/0/effect/1/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/5/0/effect/1/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/5/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/5/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.04}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/6/0/effect/1/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/6/0/effect/1/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/6/0/effect/1/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/6/0/effect/1/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/6/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.08}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/6/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.08}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/7/0/effect/1/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/7/0/effect/1/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/7/0/effect/1/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/7/0/effect/1/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/7/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.08}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/7/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.08}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/8/0/effect/1/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/8/0/effect/1/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/8/0/effect/1/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/8/0/effect/1/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/8/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/8/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/9/0/effect/1/effect/bellstrikeAttackBonus`  | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/9/0/effect/1/effect/stonesplitAttackBonus`  | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/9/0/effect/1/effect/silkbindAttackBonus`    | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/9/0/effect/1/effect/bamboocutAttackBonus`   | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/9/2/effect/0/effect/stat/physDmgBonus`      | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/9/2/effect/0/effect/stat/silkbindDmgBonus`  | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/10/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/10/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/10/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/10/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/10/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/10/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/11/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/11/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/11/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/11/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/11/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/11/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/12/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/12/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/12/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/12/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/12/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/12/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/13/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/13/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/13/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/13/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/13/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/13/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/14/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/14/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/14/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/14/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/14/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/14/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/14/5/effect/0/effect/flatAttackBonus`       | `flatAttackBonus`       | 固定攻击项缩放 | `0.0725`                                                           | `[{"requirement":[{"target":"skillTag","value":"WillowbendFan"}]}]`                                                              |
| 杏游草野 | `/talent/15/0/effect/1/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/15/0/effect/1/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/15/0/effect/1/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/15/0/effect/1/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06`                                                             | `[{"requirement":[{"target":"self","value":"Tailwind"},{"target":"equippedMartialArt","value":"museflowWaistDrum"}]}]`           |
| 杏游草野 | `/talent/15/2/effect/0/effect/stat/physDmgBonus`     | `physDmgBonus`          | 外功通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/15/2/effect/0/effect/stat/silkbindDmgBonus` | `silkbindDmgBonus`      | 牵丝通道乘区   | `{"formula":{"source":"minPhys","multiplier":0.00016,"max":0.12}}` | `[{"requirement":[{"operator":"or","operand":[{"target":"self","value":"Tailwind"},{"target":"self","value":"RadiantDrum"}]}]}]` |
| 杏游草野 | `/talent/15/5/effect/0/effect/flatAttackBonus`       | `flatAttackBonus`       | 固定攻击项缩放 | `0.15`                                                             | `[{"requirement":[{"target":"skillTag","value":"WillowbendFan"}]}]`                                                              |

## 心法定义（innerway）

### adaptive-steel.json

来源：[data/innerway/adaptive-steel.json](../data/innerway/adaptive-steel.json)。所有行均待确认。

| 记录             | JSON 指针                                                     | 字段                 | 加成类别     | 编写值 | 外层条件 / 元数据                                             |
| ---------------- | ------------------------------------------------------------- | -------------------- | ------------ | ------ | ------------------------------------------------------------- |
| 效果（`effect`） | `/effect/AdaptiveSteelT0/effect/0/effect/critDmgBonus`        | `critDmgBonus`       | 会心结果乘区 | `0.2`  | `[{"requirement":[{"target":"skillTag","value":"Charged"}]}]` |
| 效果（`effect`） | `/effect/AdaptiveSteelT5/effect/0/rawStat/bellstrikeDmgBonus` | `bellstrikeDmgBonus` | 鸣金通道乘区 | `0.03` | 在此记录内无条件                                              |

### art-of-resistance.json

来源：[data/innerway/art-of-resistance.json](../data/innerway/art-of-resistance.json)。所有行均待确认。

| 记录             | JSON 指针                                            | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                        |
| ---------------- | ---------------------------------------------------- | ---------- | -------------- | ------ | -------------------------------------------------------- |
| 效果（`effect`） | `/effect/ArtOfResistanceT3/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"target":"self","value":"Shield"}]}]` |
| 效果（`effect`） | `/effect/ArtOfResistanceT6/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"target":"self","value":"Shield"}]}]` |

### battle-anthem.json

来源：[data/innerway/battle-anthem.json](../data/innerway/battle-anthem.json)。所有行均待确认。

| 记录             | JSON 指针                                                  | 字段               | 加成类别       | 编写值                                                                                                           | 外层条件 / 元数据                                             |
| ---------------- | ---------------------------------------------------------- | ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 效果（`effect`） | `/effect/BattleAnthemT0/effect/0/effect/dmgBonus`          | `dmgBonus`         | 类别 1（加算） | `0.1`                                                                                                            | `[{"requirement":[{"target":"skillTag","value":"Charged"}]}]` |
| 效果（`effect`） | `/effect/BattleAnthemT4/effect/0/effect/dmgBonus`          | `dmgBonus`         | 类别 1（加算） | `0.05`                                                                                                           | `[{"requirement":[{"target":"skillTag","value":"Charged"}]}]` |
| 效果（`effect`） | `/effect/BattleAnthemT5/effect/0/rawStat/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区   | `0.052`                                                                                                          | 在此记录内无条件                                              |
| 效果（`effect`） | `/effect/BattleAnthemT6/effect/0/effect/dmgBonus`          | `dmgBonus`         | 类别 1（加算） | `{"function":"segment","param1":"enduranceLost","param2":[10,20,30,40,50],"param3":[0,0.02,0.04,0.06,0.08,0.1]}` | `[{"requirement":[{"target":"skillTag","value":"Charged"}]}]` |

### bitter-seasons.json

来源：[data/innerway/bitter-seasons.json](../data/innerway/bitter-seasons.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/BitterSeasonsT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### blades-will.json

来源：[data/innerway/blades-will.json](../data/innerway/blades-will.json)。所有行均待确认。

| 记录             | JSON 指针                                       | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------- | ---------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/BladesWillT6/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}],{"target":"skillTag","value":"DrumSeries"}]},{"target":"target","value":"Cuncao","stack":5}]}]` |

### blossom-barrage.json

来源：[data/innerway/blossom-barrage.json](../data/innerway/blossom-barrage.json)。不含上述类别中的显式伤害加成字段。

### breaking-point.json

来源：[data/innerway/breaking-point.json](../data/innerway/breaking-point.json)。不含上述类别中的显式伤害加成字段。

### celestial-vigor.json

来源：[data/innerway/celestial-vigor.json](../data/innerway/celestial-vigor.json)。不含上述类别中的显式伤害加成字段。

### divine-roulette.json

来源：[data/innerway/divine-roulette.json](../data/innerway/divine-roulette.json)。不含上述类别中的显式伤害加成字段。

### echoes-of-oblivion.json

来源：[data/innerway/echoes-of-oblivion.json](../data/innerway/echoes-of-oblivion.json)。所有行均待确认。

| 记录             | JSON 指针                                                               | 字段           | 加成类别       | 编写值  | 外层条件 / 元数据 |
| ---------------- | ----------------------------------------------------------------------- | -------------- | -------------- | ------- | ----------------- |
| 效果（`effect`） | `/effect/EchoesOfOblivionT5/effect/0/rawStat/critDmgBonus`              | `critDmgBonus` | 会心结果乘区   | `0.044` | 在此记录内无条件  |
| 效果（`effect`） | `/effect/EchoesOfOblivionT6/effect/0/modify/effect/0/effect/hpDMGBonus` | `hpDMGBonus`   | 类别 1（加算） | `0.05`  | 在此记录内无条件  |

### empirical-edge.json

来源：[data/innerway/empirical-edge.json](../data/innerway/empirical-edge.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/EmpiricalEdgeT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### envigorated-warrior.json

来源：[data/innerway/envigorated-warrior.json](../data/innerway/envigorated-warrior.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                    |
| ---------------- | ------------------------------------------------------- | ---------- | -------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/EnvigoratedWarriorT0/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"operator":"not","operand":[{"target":"self","value":"EnvigoratedDisabled"}]}]}]` |
| 效果（`effect`） | `/effect/EnvigoratedWarriorT4/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.03` | `[{"requirement":[{"operator":"not","operand":[{"target":"self","value":"EnvigoratedDisabled"}]}]}]` |

### eonpour.json

来源：[data/innerway/eonpour.json](../data/innerway/eonpour.json)。不含上述类别中的显式伤害加成字段。

### esoteric-revival.json

来源：[data/innerway/esoteric-revival.json](../data/innerway/esoteric-revival.json)。不含上述类别中的显式伤害加成字段。

### evasive-charge.json

来源：[data/innerway/evasive-charge.json](../data/innerway/evasive-charge.json)。不含上述类别中的显式伤害加成字段。

### evening-snow.json

来源：[data/innerway/evening-snow.json](../data/innerway/evening-snow.json)。不含上述类别中的显式伤害加成字段。

### exquisite-scenery.json

来源：[data/innerway/exquisite-scenery.json](../data/innerway/exquisite-scenery.json)。所有行均待确认。

| 记录             | JSON 指针                                                  | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ---------------------------------------------------------- | -------------- | ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/ExquisiteSceneryT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.044` | 在此记录内无条件                                                                                                                                                                                                                                                                                                                                                                            |
| 效果（`effect`） | `/effect/ExquisiteSceneryT6/effect/0/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区     | `0.5`   | `[{"requirement":[{"operator":"or","operand":[[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"Charged"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"Charged"}],[{"target":"skillTag","value":"Light"},{"target":"skillTag","value":"VariedCombo"}],[{"target":"skillTag","value":"Heavy"},{"target":"skillTag","value":"VariedCombo"}]]}]}]` |

### fivefold-bleed.json

来源：[data/innerway/fivefold-bleed.json](../data/innerway/fivefold-bleed.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据                                                    |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | -------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/FivefoldBleedT1/effect/0/effect/baseDMGBonus`  | `baseDMGBonus` | 基础乘区     | `1`     | `[{"requirement":[{"target":"skillTag","value":"PiercingDamage"}]}]` |
| 效果（`effect`） | `/effect/FivefoldBleedT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.035` | 在此记录内无条件                                                     |

### frost-clad-night.json

来源：[data/innerway/frost-clad-night.json](../data/innerway/frost-clad-night.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------- | -------------- | -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/FrostCladNightT4/effect/0/effect/baseDMGBonus` | `baseDMGBonus` | 基础乘区       | `0.4`  | `[{"requirement":[{"target":"skillTag","value":"SnowbreakSpring"},{"operator":"or","operand":[{"target":"self","value":"InnerPassion"},[{"target":"self","value":"FrostCladNightT6"},{"target":"target","value":"Exhausted"}]]}]}]` |
| 效果（`effect`） | `/effect/FrostCladNightT6/effect/0/effect/dmgBonus`     | `dmgBonus`     | 类别 1（加算） | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"SnowbreakSpring"}]}]`                                                                                                                                                               |

### fury-harvest.json

来源：[data/innerway/fury-harvest.json](../data/innerway/fury-harvest.json)。不含上述类别中的显式伤害加成字段。

### gourd-toss.json

来源：[data/innerway/gourd-toss.json](../data/innerway/gourd-toss.json)。不含上述类别中的显式伤害加成字段。

### harmony-song.json

来源：[data/innerway/harmony-song.json](../data/innerway/harmony-song.json)。所有行均待确认。

| 记录             | JSON 指针                                                                     | 字段                    | 加成类别     | 编写值 | 外层条件 / 元数据                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------- | ----------------------- | ------------ | ------ | ----------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/HarmonySongT3/effect/0/effect/critDmgBonus`                          | `critDmgBonus`          | 会心结果乘区 | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"JadebreakerNormal"},{"target":"self","value":"RadiantDrum"}]}]`   |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/0/modify/effect/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放 | `0.06` | 在此记录内无条件                                                                                                  |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/0/modify/effect/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放 | `0.06` | 在此记录内无条件                                                                                                  |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/0/modify/effect/0/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放 | `0.06` | 在此记录内无条件                                                                                                  |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/0/modify/effect/0/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放 | `0.06` | 在此记录内无条件                                                                                                  |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/0/modify/effect/0/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放 | `0.06` | 在此记录内无条件                                                                                                  |
| 效果（`effect`） | `/effect/HarmonySongT6/effect/1/effect/critDmgBonus`                          | `critDmgBonus`          | 会心结果乘区 | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"JadebreakerEnhanced"},{"target":"self","value":"RadiantDrum"}]}]` |

### heart-of-fire.json

来源：[data/innerway/heart-of-fire.json](../data/innerway/heart-of-fire.json)。不含上述类别中的显式伤害加成字段。

### ink-and-strings.json

来源：[data/innerway/ink-and-strings.json](../data/innerway/ink-and-strings.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/InkAndStringsT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### insightful-strike.json

来源：[data/innerway/insightful-strike.json](../data/innerway/insightful-strike.json)。所有行均待确认。

| 记录             | JSON 指针                                                             | 字段       | 加成类别       | 编写值  | 外层条件 / 元数据                                                                       |
| ---------------- | --------------------------------------------------------------------- | ---------- | -------------- | ------- | --------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/InsightfulStrikeT1/effect/0/modify/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.015` | `[{"requirement":[{"target":"selfHPPercentage","comparison":">","amount":75}]}]`        |
| 效果（`effect`） | `/effect/InsightfulStrikeT6/effect/0/modify/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.1`   | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"DOT"}]}]}]` |

### light-and-shadow-alike.json

来源：[data/innerway/light-and-shadow-alike.json](../data/innerway/light-and-shadow-alike.json)。所有行均待确认。

| 记录             | JSON 指针                                                | 字段       | 加成类别       | 编写值                                                                                                                                           | 外层条件 / 元数据                                                                                                                                   |
| ---------------- | -------------------------------------------------------- | ---------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/LightAndShadowAlikeT0/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `{"function":"segment","param1":"targetHPPercentage","param2":[20,40,60,80],"param3":[0.05,0.045,0.04,0.035,0.03],"mode":"UpperBoundInclusive"}` | `[{"requirement":[{"operator":"not","operand":[{"target":"self","value":"LightAndShadowAlikeT3"}]},{"target":"skillTag","value":"DirectDamage"}]}]` |
| 效果（`effect`） | `/effect/LightAndShadowAlikeT3/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.05,0.045,0.04,0.035,0.03],"mode":"UpperBoundInclusive"}` | `[{"requirement":[{"operator":"not","operand":[{"target":"self","value":"LightAndShadowAlikeT6"}]},{"target":"skillTag","value":"DirectDamage"}]}]` |
| 效果（`effect`） | `/effect/LightAndShadowAlikeT6/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `{"function":"segment","param1":"targetHPPercentage","param2":[40,55,70,85],"param3":[0.09,0.08,0.07,0.06,0.05],"mode":"UpperBoundInclusive"}`   | `[{"requirement":[{"target":"skillTag","value":"DirectDamage"}]}]`                                                                                  |

### light-anew.json

来源：[data/innerway/light-anew.json](../data/innerway/light-anew.json)。所有行均待确认。

| 记录             | JSON 指针                                      | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                           |
| ---------------- | ---------------------------------------------- | ---------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/LightAnewT6/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.03` | `[{"requirement":[{"target":"target","value":"Candlelight","stack":5}]}]`                                                   |
| 效果（`effect`） | `/effect/LightAnewT6/effect/1/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.03` | `[{"requirement":[{"target":"target","value":"Candlelight","stack":5},{"target":"distance","comparison":">","amount":8}]}]` |

### mending-loom.json

来源：[data/innerway/mending-loom.json](../data/innerway/mending-loom.json)。不含上述类别中的显式伤害加成字段。

### mistwing.json

来源：[data/innerway/mistwing.json](../data/innerway/mistwing.json)。所有行均待确认。

| 记录             | JSON 指针                                          | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | -------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/MistwingT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### morale-chant.json

来源：[data/innerway/morale-chant.json](../data/innerway/morale-chant.json)。不含上述类别中的显式伤害加成字段。

### mountains-might.json

来源：[data/innerway/mountains-might.json](../data/innerway/mountains-might.json)。不含上述类别中的显式伤害加成字段。

### phantom-rally.json

来源：[data/innerway/phantom-rally.json](../data/innerway/phantom-rally.json)。所有行均待确认。

| 记录             | JSON 指针                                              | 字段           | 加成类别       | 编写值  | 外层条件 / 元数据                                                      |
| ---------------- | ------------------------------------------------------ | -------------- | -------------- | ------- | ---------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/PhantomRallyT4/effect/0/effect/dmgBonus`      | `dmgBonus`     | 类别 1（加算） | `0.2`   | `[{"requirement":[{"target":"skillTag","value":"PhantomResonance"}]}]` |
| 效果（`effect`） | `/effect/PhantomRallyT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区   | `0.028` | 在此记录内无条件                                                       |

### restoring-blossom.json

来源：[data/innerway/restoring-blossom.json](../data/innerway/restoring-blossom.json)。不含上述类别中的显式伤害加成字段。

### riptide-reflex.json

来源：[data/innerway/riptide-reflex.json](../data/innerway/riptide-reflex.json)。不含上述类别中的显式伤害加成字段。

### rock-solid.json

来源：[data/innerway/rock-solid.json](../data/innerway/rock-solid.json)。不含上述类别中的显式伤害加成字段。

### royal-remedy.json

来源：[data/innerway/royal-remedy.json](../data/innerway/royal-remedy.json)。不含上述类别中的显式伤害加成字段。

### sandswirl-tail.json

来源：[data/innerway/sandswirl-tail.json](../data/innerway/sandswirl-tail.json)。不含上述类别中的显式伤害加成字段。

### seasonal-edge.json

来源：[data/innerway/seasonal-edge.json](../data/innerway/seasonal-edge.json)。所有行均待确认。

| 记录             | JSON 指针                                              | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------ | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/SeasonalEdgeT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.028` | 在此记录内无条件  |

### shadow-assault.json

来源：[data/innerway/shadow-assault.json](../data/innerway/shadow-assault.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/ShadowAssaultT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.022` | 在此记录内无条件  |

### sky-gripped.json

来源：[data/innerway/sky-gripped.json](../data/innerway/sky-gripped.json)。所有行均待确认。

| 记录             | JSON 指针                                            | 字段           | 加成类别               | 编写值 | 外层条件 / 元数据                                                                                                                        |
| ---------------- | ---------------------------------------------------- | -------------- | ---------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/SkyGrippedT3/effect/0/effect/qiDMGBonus`    | `qiDMGBonus`   | 真气伤害（当前不求值） | `0.3`  | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |
| 效果（`effect`） | `/effect/SkyGrippedT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区           | `0.04` | 在此记录内无条件                                                                                                                         |
| 效果（`effect`） | `/effect/SkyGrippedT6/effect/0/effect/critDmgBonus`  | `critDmgBonus` | 会心结果乘区           | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"Charged"},{"target":"target","value":"HeavensMight"}]}]`                                 |

### skyspeak.json

来源：[data/innerway/skyspeak.json](../data/innerway/skyspeak.json)。所有行均待确认。

| 记录             | JSON 指针                                          | 字段           | 加成类别     | 编写值 | 外层条件 / 元数据 |
| ---------------- | -------------------------------------------------- | -------------- | ------------ | ------ | ----------------- |
| 效果（`effect`） | `/effect/SkyspeakT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.04` | 在此记录内无条件  |

### soaring-high.json

来源：[data/innerway/soaring-high.json](../data/innerway/soaring-high.json)。所有行均待确认。

| 记录             | JSON 指针                                          | 字段         | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                        |
| ---------------- | -------------------------------------------------- | ------------ | -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 效果（`effect`） | `/effect/SoaringHighT0/effect/0/effect/hpDMGBonus` | `hpDMGBonus` | 类别 1（加算） | `0.2`  | `[{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"Falcon"},{"target":"skillTag","value":"VileCondemned"}]}]}]` |

### song-of-tang.json

来源：[data/innerway/song-of-tang.json](../data/innerway/song-of-tang.json)。所有行均待确认。

| 记录             | JSON 指针                                            | 字段           | 加成类别     | 编写值 | 外层条件 / 元数据 |
| ---------------- | ---------------------------------------------------- | -------------- | ------------ | ------ | ----------------- |
| 效果（`effect`） | `/effect/SongOfTangT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.04` | 在此记录内无条件  |

### star-reacher.json

来源：[data/innerway/star-reacher.json](../data/innerway/star-reacher.json)。不含上述类别中的显式伤害加成字段。

### steadfast-devotion.json

来源：[data/innerway/steadfast-devotion.json](../data/innerway/steadfast-devotion.json)。所有行均待确认。

| 记录             | JSON 指针                                                   | 字段           | 加成类别     | 编写值 | 外层条件 / 元数据                                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------- | -------------- | ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 效果（`effect`） | `/effect/SteadfastDevotionT5/effect/0/rawStat/critDmgBonus` | `critDmgBonus` | 会心结果乘区 | `0.04` | 在此记录内无条件                                                                                                                                                                     |
| 效果（`effect`） | `/effect/SteadfastDevotionT6/effect/0/effect/critDmgBonus`  | `critDmgBonus` | 会心结果乘区 | `0.1`  | `[{"requirement":[{"target":"target","value":"Exhausted"},{"operator":"or","operand":[{"target":"skillTag","value":"BurningHeart"},{"target":"skillTag","value":"AnxiSoldier"}]}]}]` |

### steadfast-stance.json

来源：[data/innerway/steadfast-stance.json](../data/innerway/steadfast-stance.json)。不含上述类别中的显式伤害加成字段。

### sword-horizon.json

来源：[data/innerway/sword-horizon.json](../data/innerway/sword-horizon.json)。所有行均待确认。

| 记录             | JSON 指针                                         | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                          |
| ---------------- | ------------------------------------------------- | ---------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 效果（`effect`） | `/effect/SwordHorizonT4/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.15` | `[{"requirement":[{"target":"skillTag","value":"HighBleed"},{"target":"resource","value":"SwordsZenith","comparison":">=","amount":20}]}]` |

### sword-morph.json

来源：[data/innerway/sword-morph.json](../data/innerway/sword-morph.json)。所有行均待确认。

| 记录             | JSON 指针                                       | 字段       | 加成类别       | 编写值                                                                       | 外层条件 / 元数据                                                 |
| ---------------- | ----------------------------------------------- | ---------- | -------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 效果（`effect`） | `/effect/SwordMorphT0/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `{"function":"multiply","param1":"enduranceSpent","param2":0.015,"max":0.3}` | `[{"requirement":[{"target":"skillTag","value":"SwordEnergy"}]}]` |

### throat-piercing-art.json

来源：[data/innerway/throat-piercing-art.json](../data/innerway/throat-piercing-art.json)。不含上述类别中的显式伤害加成字段。

### thunderous-bloom.json

来源：[data/innerway/thunderous-bloom.json](../data/innerway/thunderous-bloom.json)。所有行均待确认。

| 记录             | JSON 指针                                                 | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | --------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/ThunderousBloomT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### towline-sweep.json

来源：[data/innerway/towline-sweep.json](../data/innerway/towline-sweep.json)。所有行均待确认。

| 记录             | JSON 指针                                         | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                                        |
| ---------------- | ------------------------------------------------- | ---------- | -------------- | ------ | ------------------------------------------------------------------------ |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep1"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/1/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep2"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/2/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.05` | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep3"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/3/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep4"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/4/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.1`  | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep5"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/5/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.15` | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep6"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT3/effect/6/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.15` | `[{"requirement":[{"target":"skillTag","value":"PiercingDartSweep7"}]}]` |
| 效果（`effect`） | `/effect/TowlineSweepT6/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.15` | `[{"requirement":[{"target":"skillTag","value":"BurnAndBury"}]}]`        |

### trapped-beast.json

来源：[data/innerway/trapped-beast.json](../data/innerway/trapped-beast.json)。不含上述类别中的显式伤害加成字段。

### vendetta.json

来源：[data/innerway/vendetta.json](../data/innerway/vendetta.json)。所有行均待确认。

| 记录             | JSON 指针                                                     | 字段       | 加成类别       | 编写值 | 外层条件 / 元数据                                            |
| ---------------- | ------------------------------------------------------------- | ---------- | -------------- | ------ | ------------------------------------------------------------ |
| 效果（`effect`） | `/effect/VendettaT6/effect/0/modify/effect/0/effect/dmgBonus` | `dmgBonus` | 类别 1（加算） | `0.3`  | `[{"requirement":[{"target":"skillTag","value":"Rodent"}]}]` |

### vital-leech.json

来源：[data/innerway/vital-leech.json](../data/innerway/vital-leech.json)。不含上述类别中的显式伤害加成字段。

### volutefit.json

来源：[data/innerway/volutefit.json](../data/innerway/volutefit.json)。不含上述类别中的显式伤害加成字段。

### wildfire-spark.json

来源：[data/innerway/wildfire-spark.json](../data/innerway/wildfire-spark.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/WildfireSparkT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### wildfire-surge.json

来源：[data/innerway/wildfire-surge.json](../data/innerway/wildfire-surge.json)。所有行均待确认。

| 记录             | JSON 指针                                               | 字段           | 加成类别     | 编写值  | 外层条件 / 元数据 |
| ---------------- | ------------------------------------------------------- | -------------- | ------------ | ------- | ----------------- |
| 效果（`effect`） | `/effect/WildfireSurgeT5/effect/0/rawStat/physDmgBonus` | `physDmgBonus` | 外功通道乘区 | `0.025` | 在此记录内无条件  |

### wind-beneath-wings.json

来源：[data/innerway/wind-beneath-wings.json](../data/innerway/wind-beneath-wings.json)。不含上述类别中的显式伤害加成字段。

### wolfchasers-art.json

来源：[data/innerway/wolfchasers-art.json](../data/innerway/wolfchasers-art.json)。所有行均待确认。

| 记录             | JSON 指针                                                    | 字段               | 加成类别       | 编写值  | 外层条件 / 元数据                                                 |
| ---------------- | ------------------------------------------------------------ | ------------------ | -------------- | ------- | ----------------------------------------------------------------- |
| 效果（`effect`） | `/effect/WolfchasersArtT3/effect/0/effect/dmgBonus`          | `dmgBonus`         | 类别 1（加算） | `0.1`   | `[{"requirement":[{"target":"skillTag","value":"SoberSorrow"}]}]` |
| 效果（`effect`） | `/effect/WolfchasersArtT5/effect/0/rawStat/affinityDmgBonus` | `affinityDmgBonus` | 会意结果乘区   | `0.052` | 在此记录内无条件                                                  |

### zephyr-whispers.json

来源：[data/innerway/zephyr-whispers.json](../data/innerway/zephyr-whispers.json)。所有行均待确认。

| 记录             | JSON 指针                                                                        | 字段                    | 加成类别       | 编写值 | 外层条件 / 元数据                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------- | ----------------------- | -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 效果（`effect`） | `/effect/ZephyrWhispersT4/effect/0/modify/effect/0/effect/dmgBonus`              | `dmgBonus`              | 类别 1（加算） | `0.05` | `[{"duration":18},{"requirement":[{"operator":"or","operand":[{"target":"skillTag","value":"WillowbendFan"},{"target":"skillTag","value":"DrumSeries"}]}]}]` |
| 效果（`effect`） | `/effect/ZephyrWhispersT5/effect/0/rawStat/critDmgBonus`                         | `critDmgBonus`          | 会心结果乘区   | `0.04` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/0/modify/effect/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/0/modify/effect/0/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/0/modify/effect/0/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/0/modify/effect/0/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/1/modify/effect/0/effect/physicalAttackBonus`   | `physicalAttackBonus`   | 外功攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/1/modify/effect/0/effect/bellstrikeAttackBonus` | `bellstrikeAttackBonus` | 鸣金攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/1/modify/effect/0/effect/stonesplitAttackBonus` | `stonesplitAttackBonus` | 裂石攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/1/modify/effect/0/effect/silkbindAttackBonus`   | `silkbindAttackBonus`   | 牵丝攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |
| 效果（`effect`） | `/effect/ZephyrWhispersT6/effect/1/modify/effect/0/effect/bamboocutAttackBonus`  | `bamboocutAttackBonus`  | 破竹攻击缩放   | `0.06` | 在此记录内无条件                                                                                                                                             |

## DOT 定义（dot）

### bellstrike-umbra.json

来源：[data/dot/bellstrike-umbra.json](../data/dot/bellstrike-umbra.json)。不含上述类别中的显式伤害加成字段。

### divinecraft.json

来源：[data/dot/divinecraft.json](../data/dot/divinecraft.json)。不含上述类别中的显式伤害加成字段。

### innerway.json

来源：[data/dot/innerway.json](../data/dot/innerway.json)。不含上述类别中的显式伤害加成字段。

### mystic.json

来源：[data/dot/mystic.json](../data/dot/mystic.json)。不含上述类别中的显式伤害加成字段。

## 清单总计

共 692 次已编写的加成。每一行仍待数据挖掘确认。

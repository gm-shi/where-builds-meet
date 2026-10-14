# Where Builds Meet

**在线站点：<https://gm-shi.github.io/where-builds-meet/>** —— 即已部署的应用，通过 [Pages 工作流](.github/workflows/deploy.yml) 从 `release` 分支发布。

本项目是 [greydust/where-builds-meet](https://github.com/greydust/where-builds-meet) 的简体中文版，由 [gm-shi](https://github.com/gm-shi) 维护。它保留了原有的计算逻辑，界面、游戏数据名称和文档仅提供简体中文版本。

Where Builds Meet 是一款基于浏览器的**《燕云十六声》**配装与循环模拟器。它结合角色属性、装备、效果和按时间编排的战斗循环，计算伤害、秒伤以及各项对比指标。

本网站的目标是尽可能准确地模拟**《燕云十六声》**的循环。即使只有 1% 的伤害差异，我们也会仔细排查，因此如果您发现任何差异，请务必反馈。

本应用使用 React、TypeScript 和 Vite 构建。它完全在客户端运行：游戏数据从 JSON 打包，用户设置保存在浏览器中，模拟在 Web Worker 中运行。

## 快速开始

环境要求：

- Node.js `24+`
- npm

```bash
npm ci
npm run dev
```

Vite 会输出本地开发 URL，通常是 `http://localhost:5173`。

其他命令：

```bash
npm run format        # Format source, JSON data, and documentation
npm run format:check  # Check formatting without changing files
npm run build         # Type-check and create the production build in dist/
npm run preview       # Serve the production build locally
```

`npm run test` 运行自动化行为测试。`npm run build` 运行构建检查并生成生产包；涉及模拟的改动还应进行有针对性的计算核验。

## 项目结构

```text
data/                 Game definitions: skills, effects, gear, enemies, rotations
doc/                  Architecture, formula, and combat-data documentation
src/App.tsx           Application composition shell and cross-feature state
src/application/      Cross-feature contracts, game data, persistence, and services
src/features/         Feature UI and feature-local behavior
src/schemas/          Runtime trust-boundary validation
src/calculations/     Stat resolution, timeline simulation, damage, and Web Worker
src/data/             UI-facing stat definitions
src/types.ts          Shared character and enemy types
```

运行时，应用会解析角色与配置数据，构建一个不可变的计算包，并将其发送给常驻的 Web Worker。worker 会构建战斗时间轴，计算伤害及各种变体，然后发布一个集中的结果供界面使用。

如需了解更多细节，请从以下文档入手：

- [系统架构](doc/system-architecture.md)
- [伤害公式](doc/damage-formula.md)
- [技能与战斗效果数据](doc/skill-data.md)
- [装备数据与装备库](doc/gear-data.md)

## 参与贡献

在修改计算或战斗数据相关行为之前，请先阅读 [AGENTS.md](AGENTS.md) 及相关技术文档。在现有 schema 支持的情况下，请将游戏机制保留在 JSON 中，同时更新受影响的文档，并使用以下命令验证改动：

```bash
npm run format
npm run build
```

涉及模拟的改动还应进行有针对性的计算核验。

发布部署会运行 `npm run test:dps`，对于任何已实现的流派，它都会拦截超过 4 个 ULP 且未经审查的秒伤、总伤害或持续时间变化。普通构建和测试不包含这项发布防护检查。在更新已接受的基线之前，请先审查失败项；输入与更新命令请参阅 [秒伤回归快照](doc/dps-snapshots.md)。

### 翻译

本应用仅提供简体中文版本。翻译维护在 [`locales/translations.csv`](locales/translations.csv) 中，该文件包含三列：`key`、`en` 和 `zh-Hans`。英语是编写游戏数据所用的源语言；应用中不提供英语，但 `gameText()` 会借助该文件将游戏数据中的英文显示名称映射为对应的译文，因此请保持 `key` 和 `en` 列不变，只编辑 `zh-Hans`。每一行都必须填写 `zh-Hans` 值：运行时不会回退到英语，而且只要还有任何一行未翻译，提取器就会让构建失败。

请勿编辑 `public/locales/` 下的生成文件。更新 CSV 后，请使用以下命令重新生成并验证：

```bash
npm run i18n:extract
npm run format
npm run build
```

有关翻译键的归属、规范游戏术语以及运行时细节（包括如何再次发布其他语言区域），请参阅 [本地化](doc/localization.md)。

## 部署

当改动推送到 `release` 分支时，GitHub Pages 会通过 [Pages 工作流](.github/workflows/deploy.yml) 进行部署。将经过测试的 `main` 分支合并到 `release` 即可发布新版本。

## 许可证

版权所有 © 2026 greydust。简体中文本地化及修改 © 2026 gm-shi。

除另有说明外，Where Builds Meet 是依据 [GNU 通用公共许可证第 3 版或更高版本](LICENSE) 授权的自由软件。您可以依据该许可证的条款使用、修改和再分发本软件。第三方材料保留其各自的权利和许可条款。

内置的 Noto Sans 字体依据 [SIL 开放字体许可证 1.1](public/licenses/Noto-Sans-OFL.txt) 授权。

内置的 Tabler Icons React 包依据 [MIT 许可证](public/licenses/Tabler-Icons-MIT.txt) 授权。

牵丝·玉的技能系数、帧时序、繁花获取与配装布局取自 [M1zuke/where-winds-meet-dps](https://github.com/M1zuke/where-winds-meet-dps)，依据 [MIT 许可证](public/licenses/M1zuke-where-winds-meet-dps-MIT.txt) 授权（Copyright (c) 2026 M1zuke）。

## 致谢

- **yoka**，启发本项目的原始电子表格的作者
- **Where Winds Math** 网站，感谢其所做的工作以及对社区的贡献
- **Mhysa**，提供了裂石·钧的详细时序数据并参与测试
- **Xia**，提供了裂石·威的技能数据及机制讲解
- **Royal**，协助完善裂石·威循环
- **Yu Seol-ha**，翻译了中文电子表格并提供见解
- **Sasha**，进行数据挖掘并提供了关于系统数据的见解
- **JubTse**，协助完善「风」循环
- **Kale**，协助完善「尘」循环
- **kaezuma**，协助完善「虹」循环
- **NiNi'Piggy**，协助完善「影」循环
- **M1zuke**，其 where-winds-meet-dps 模拟器提供了牵丝·玉的技能数据
- **BiliBili@片雲 / 雪皇**，其牵丝·玉竞速计算器用于交叉校验

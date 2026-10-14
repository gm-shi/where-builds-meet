# 本地化

## 文件与归属

`locales/translations.csv` 是唯一手工维护的翻译目录。第一列是 `key`，其余列是语言代码：
`en` 为源语言（游戏数据以英文编写），`zh-Hans` 为应用实际发布的简体中文。两列都是必需的。

以 `system.*` 开头的行为共享游戏术语指定唯一的稳定归属：武器类型、武学、内功、定音、
套装件数、伤害/属性类型以及计算标签都属于这里。属性名由 `stat.<statKey>` 拥有，派生自
`src/data/statDefinitions.ts`。当同一显示值出现在其他游戏数据中时，提取器会把它路由到规范键，
而不是再创建一条翻译记录。

定音名称派生自 `data/attunement.json`，由 `system.attunement.<attunementId>` 拥有。
界面控件在拿到定音 ID 时应直接解析这些键；`gameText()` 为已带有英文显示名的计算结果和其他
记录提供同样的翻译。

`npm run i18n:extract` 更新目录并在 `public/locales/` 下生成运行时资源：

- `manifest.json` 列出选择器中当前发布的语言（`locales`）、默认语言（`default`，即
  `zh-Hans`）、源语言（`source`，即 `en`），以及除默认语言外每个已发布语言的整数完成度百分比。
  完成度由目录中的非空行生成，不得手工维护。翻译列可以留在 CSV 中而不发布。
- `<locale>.json` 包含某一语言的全部非空消息。`en.json` 仍会生成，供运行时作为源语言加载。

生成的语言 JSON 不得直接编辑。发布的语言没有回退到英文的机制，所以目录中每一行都必须有
`zh-Hans` 值：提取器会先写出文件（让新键连同英文原文一起出现在 CSV 里），然后在仍有未翻译行时
报错；`npm run i18n:check` 与 `npm run build` 同样会失败。

要再次发布其他语言：在 CSV 中添加其列并填写翻译，把语言代码加入
`script/i18n/extract.mjs` 的 `publishedLocales`，在 `src/i18n.ts` 的 `localeDisplayNames`
中添加自称名，然后运行提取器。当 `manifest.locales` 多于一个语言时，语言选择器会自动显示。

武学天赋只包含计算效果。它们没有显示名或本地化行；其阶数与位置仍是数据布局的一部分。

## 运行时选择

应用在 React 挂载前解析一次语言：

1. 显式保存在 `localStorage["wwm-locale"]` 中的语言；
2. `navigator.languages` 中第一个精确或基础语言匹配；
3. 清单中的默认语言。

浏览器检测结果不会写入存储，只有用户的选择会被保存。当前只发布 `zh-Hans`，因此上述三步都
解析为简体中文。所选语言与源语言（`en`）的 JSON 会一起加载：源语言为 `gameText()` 提供
英文显示名到译文的映射，并在单个键缺失时按键回退。加载后会更新 `<html lang>` 属性。

语言选择器的名称是 `src/i18n.ts` 中固定的自称名，而不是翻译消息，因此每种语言总是以
它自己的语言命名。非默认语言的名称后面会附上生成的目录完成度百分比。

语言状态属于界面层。计算包、worker 消息、缓存键、ID、公式和持久化的游戏数据都与语言无关。

翊（Wings）流派的武学使用英文 ID `museflowWaistDrum` 和 `willowbendFan`，内功使用
`HarmonySong`、`ZephyrWhispers`、`BladesWill` 和 `InkAndStrings`。定义文件名和本地化键
遵循这些 ID。旧的 Wings ID 没有兼容迁移；引用它们的已保存配装、循环和编辑器覆盖必须重新创建。

## 消息约定

中文事件标签使用 ASCII 冒号加一个空格（`事件: 名称`），而不是全角冒号。
名称中的分隔符统一使用 `·`（U+00B7），例如 `无名剑法·蓄力技增伤`。

- 界面文案使用 `t("ui.area.meaningfulKey")`。
- 使用 `{count}` 这样的具名占位符，而不是用片段拼接译文句子。
- `system.*` 只用于不变的游戏术语。这些行是规范术语注册表，因此每个英文值必须唯一。
  包含规范术语的组件消息通过具名占位符接收它。
- 标点放在 `system` 术语之外。例如渲染 `t("system.dps")` 后再加 `:`，而不是另外定义一条
  `DPS:` 消息。
- 语义 ID、CSS 类名、HTML role、存储键和枚举值保持为字面量。它们不是语言。数据编辑器的选项
  必须使用显式的 `value`，并原样渲染 `self`、`target`、`segment`、`T0` 或 `Gold` 这类
  schema 枚举，而不是经过 `t()`。
- JSON 的 `name`、`shortName` 和 `description` 值会以稳定的 `data.*` 键提取，除非其值是已
  注册的规范术语。`gameText()` 在界面边界本地化这些现有显示值，而不改变它们面向计算器的记录。
- 属性标签以 `stat.<statKey>` 提取，并使用同一个界面边界适配器，因为计算器的优先级行已经带有
  这些标签。

提取器会拒绝重复的键、`t()` 引用但缺失的消息、占位符与英文不一致的译文、尚未迁移的新静态 JSX
文本或带文本的字面量属性，以及缺少 `zh-Hans` 的行。`npm run build` 会在 TypeScript 和 Vite
之前运行这项检查。

## 命令

```text
npm run i18n:extract
npm run i18n:check
```

在添加或修改界面消息或可翻译的游戏数据后运行提取器，然后运行常规的格式化和构建门禁。

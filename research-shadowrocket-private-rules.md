# Shadowrocket 能否直接使用 MetaCubeX `private.list`

## 结论

不建议把该文件**原样、直接**接入 `shadowrocket_whitelist.conf`。

- 题目中的 `github.com/.../blob/...` 是 GitHub 文件展示页（HTML），不是规则文件下载地址；即使格式兼容，也应使用 [`raw.githubusercontent.com` 原始文本地址](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.list)。
- 该文件是 Mihomo 的 `behavior: domain, format: text` 域名规则集。MetaCubeX 官方示例正是以这种类型引用它，而不是将它当作 Shadowrocket classical `RULE-SET`。[MetaCubeX 快速配置](https://wiki.metacubex.one/en/example/conf/)
- Shadowrocket 的 `RULE-SET` 规则文件通常要求每行包含 `DOMAIN`、`DOMAIN-SUFFIX`、`IP-CIDR` 等规则类型；该文件的 130 行只有裸域名和 `+.` 域名，没有这些类型前缀。因此不能把它当作 Shadowrocket `RULE-SET` 原样可靠使用。Shadowrocket 社区手册对 `RULE-SET`/`DOMAIN-SET` 的区分也如此说明，但该手册明确标注为非官方项目：[LOWERTOP 配置说明](https://github.com/LOWERTOP/Shadowrocket/blob/main/lazy.conf#L1158-L1160)、[项目声明](https://github.com/LOWERTOP/Shadowrocket#readme)。
- `DOMAIN-SET` 在概念上更接近这种无类型域名列表，但上游大量条目使用 Mihomo/Clash 专属的 `+.` 通配符，例如 `+.local`、`+.lan`。MetaCubeX 官方语法规定 `+.` 等价于多层 `DOMAIN-SUFFIX`，可同时匹配根域和子域；未找到 Shadowrocket 第一方资料确认其 `DOMAIN-SET` 支持同一 `+.` 语义。因此原样用作 `DOMAIN-SET` 也不能视为可靠兼容。[MetaCubeX 通配符语法](https://wiki.metacubex.one/en/handbook/syntax/#wildcard)

Shadowrocket 开发者在 App Store 的第一方说明只确认它支持域名、域名后缀等规则，并可从 URL 导入规则文件，没有承诺兼容 Mihomo 的 `+.` 文本方言。[Shadowrocket App Store](https://apps.apple.com/us/app/shadowrocket/id932747118)

## 上游文件的实际格式

[原始文件](https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.list) 混合两类记录：

```text
instant.arubanetworks.com
router.asus.com
+.local
+.lan
+.home.arpa
```

其中裸域名是精确域名；按 MetaCubeX 官方定义，`+.example.com` 的语义相当于匹配 `example.com` 及其任意层级子域。这个文件只覆盖私有/本地域名及反向解析域名，并不等于私有 IP 网段集合。

## 可行做法

最稳妥的做法是先生成 Shadowrocket classical 规则文件，再通过原始文本 URL 引用：

```text
# 裸域名
DOMAIN,instant.arubanetworks.com

# +. 后缀规则
DOMAIN-SUFFIX,local
DOMAIN-SUFFIX,lan
DOMAIN-SUFFIX,home.arpa
```

随后在 `[Rule]` 中使用：

```ini
RULE-SET,https://raw.githubusercontent.com/<owner>/<repo>/<branch>/<converted-file>.list,DIRECT
```

也可以改用已经明确提供 Shadowrocket 格式（每行带规则类型）的 LAN/private 规则集。不要把 MetaCubeX 的 `private.list` 当作 `.sgmodule`/模块直接安装：它没有模块头或 `[Rule]` 段，本质只是 Mihomo 的域名 payload。

## 证据边界

Shadowrocket 没有公开完整的第一方配置语法文档。本结论以 Shadowrocket 开发者的 App Store 功能说明、MetaCubeX 的第一方文件与语法文档为主，并仅用明确标注为社区项目的 LOWERTOP 手册补充 `RULE-SET`/`DOMAIN-SET` 语法。由于没有第一方证据确认 Shadowrocket 解析 `+.`，结论采用保守兼容性判断。

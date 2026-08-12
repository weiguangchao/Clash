# AGENTS.md

- [clash.ini](clash.ini) 和 [GeneralClashConfig.yaml](GeneralClashConfig.yaml) 是 Clash Meta / Mihomo 在 subconverter 中使用的配置模版。
- [direct-classical-no-resolve.yaml](direct-classical-no-resolve.yaml) 是 classical 类型的规则配置文件，里面的内容都是 no-resolve，即不会触发 DNS 解析。
- [shadowrocket_whitelist.conf](shadowrocket_whitelist.conf) 是 Shadowrocket 的配置文件。
- [clashverge_whitelist.js](clashverge_whitelist.js) 是 Clash Verge 的 JS 规则重写文件。
- [openclash_whitelist.conf](openclash_whitelist.conf) 是 OpenClash 的覆写模块。

## 同步规则

[clash.ini](clash.ini) / [GeneralClashConfig.yaml](GeneralClashConfig.yaml)、[clashverge_whitelist.js](clashverge_whitelist.js)、[openclash_whitelist.conf](openclash_whitelist.conf) 三者内容（代理组、规则、DNS、嗅探器等）需保持一致。每当更新完其中任意一个之后，都需要将其余两个同步更新。其中 [clash.ini](clash.ini) 与 [GeneralClashConfig.yaml](GeneralClashConfig.yaml) 作为同一组模版，改其一也需同步另一。同步到 [openclash_whitelist.conf](openclash_whitelist.conf) 时不要同步 `dns.nameserver`（由 `[General]` 的 `ENABLE_CUSTOM_DNS` / `APPEND_WAN_DNS` 交给 OpenClash 覆写设置处理）。

每当更新完 [direct-classical-no-resolve.yaml](direct-classical-no-resolve.yaml) 之后，都需要将其中的规则以 DIRECT 方式同步到 [shadowrocket_whitelist.conf](shadowrocket_whitelist.conf) 中。

## direct-classical-no-resolve.yaml

payload 规则顺序：IP-CIDR、DOMAIN-SUFFIX、DOMAIN-KEYWORD

## Git commit

- subject：`<type>: <description>`
- type：常量，feat / fix / docs / test / chore / refactor / perf / build / ci / revert
- 在实现 issue 时，在 subject 末尾使用 issue 编号，如 `feat: demo commit (#1)`
- description：使用中文，内容精简，技术名词保留英文，禁止模糊描述

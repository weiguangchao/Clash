# AGENTS.md

- [clash.ini](clash.ini) 和 [GeneralClashConfig.yaml](GeneralClashConfig.yaml) 是 Clash Meta / Mihomo 在 subconverter 中使用的配置模版。
- [direct-classical-no-resolve.yaml](direct-classical-no-resolve.yaml) 是 classical 类型的规则配置文件，里面的内容都是 no-resolve，即不会触发 DNS 解析。
- [shadowrocket_whitelist.conf](shadowrocket_whitelist.conf) 是 Shadowrocket 的配置文件。
- [clashverge_whitelist.js](clashverge_whitelist.js) 是 Clash Verge 的 JS 规则重写文件。

## 同步规则

每当更新完 [clash.ini](clash.ini) 或 [GeneralClashConfig.yaml](GeneralClashConfig.yaml) 之后，都需要将两者的内容（代理组、规则、DNS、嗅探器等）同步到 [clashverge_whitelist.js](clashverge_whitelist.js) 中，确保三者保持一致。

## Git commit

- subject：`<type>: <description>`
- type：常量，feat / fix / docs / test / chore / refactor / perf / build / ci / revert
- 在实现 issue 时，在 subject 末尾使用 issue 编号，如 `feat: demo commit (#1)`
- description：使用中文，内容精简，技术名词保留英文，禁止模糊描述

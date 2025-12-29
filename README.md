# Clash

## shadowrocket

```
https://raw.githubusercontent.com/weiguangchao/Clash/master/shadowrocket_whitelist.conf
```

## 远程配置模版

Github

```
https://raw.githubusercontent.com/weiguangchao/Clash/master/clash.ini
```

## rule

```
rule-providers:
  direct_classical_no_resolve:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://raw.githubusercontent.com/weiguangchao/Clash/master/direct_classical_no_resolve.yaml
  reject_classical_no_resolve:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://raw.githubusercontent.com/weiguangchao/Clash/master/reject_classical_no_resolve.yaml

rules:
  - RULE-SET,reject_classical_no_resolve,🛑 广告拦截
  - RULE-SET,direct_classical_no_resolve,DIRECT
```

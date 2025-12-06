# Clash

## shadowrocket

```
https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/shadowrocket_whitelist.conf
```

## rule provider

```
rule-providers:
  port_0:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/port_0.yaml
    path: ./Clash/port_0.yaml
  reject_0:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/reject_0.yaml
    path: ./Clash/reject_0.yaml
  direct_0:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/direct_0.yaml
    path: ./Clash/direct_0.yaml
rules:
  - RULE-SET,reject_0,REJECT
  - RULE-SET,direct_0,DIRECT
  - RULE-SET,port_0,🔀 非标端口
```

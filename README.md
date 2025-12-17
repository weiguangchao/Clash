# Clash

## shadowrocket

```
https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/shadowrocket_whitelist.conf
```

## 远程配置模版

Github

```
https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/clash.ini
```

## rule

```
proxy-groups:
  - name: 🔀 非标端口
    type: select
    proxies:
      - DIRECT
      - 🚀 节点选择

rule-providers:
  port_classical:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/port_classical.yaml
    path: ./Clash/port_classical.yaml
  reject_classical:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/reject_classical.yaml
    path: ./Clash/reject_classical.yaml
  direct_classical:
    type: http
    behavior: classical
    format: yaml
    interval: 86400
    url: https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/direct_classical.yaml
    path: ./Clash/direct_classical.yaml

rules:
  - RULE-SET,reject_classical,REJECT
  - RULE-SET,direct_classical,DIRECT
  - RULE-SET,port_classical,🔀 非标端口
```

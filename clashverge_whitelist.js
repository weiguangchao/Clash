function main(config, profileName) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxyGroups(config);
    overwriteRules(config);
    overwriteDns(config);
    overwriteSniffer(config);
    overwriteOthers(config);
    console.log("配置文件重写完成！");
    return config;
  } catch (error) {
    console.log("配置文件重写失败！将使用原来配置文件！");
    return config;
  }
}

function overwriteProxyGroups(config) {
  const proxyGroups = [
    {
      name: "🚀 节点选择",
      type: "select",
      proxies: ["🎯 全球直连"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "📹 YouTube",
      type: "select",
      proxies: ["🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🇬 Google",
      type: "select",
      proxies: ["🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🤖 AI",
      type: "select",
      proxies: ["🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
      filter: "(?i)(🇺🇸|美国|美國|US|USA|United States|洛杉矶|圣何塞|西雅图|纽约|芝加哥|达拉斯|硅谷|凤凰城)",
    },
    {
      name: "📺 Bilibili",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "Ⓜ️ Microsoft",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "⏱️ Speedtest",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🎮 Game",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🍎 Apple",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🐟 漏网之鱼",
      type: "select",
      proxies: ["🚀 节点选择"],
    },
    {
      name: "🎯 全球直连",
      type: "select",
      proxies: ["DIRECT"],
      hidden: true,
    },
    {
      name: "🛑 DROP",
      type: "select",
      proxies: ["REJECT-DROP"],
      hidden: true,
    },
    {
      name: "🛑 REJECT",
      type: "select",
      proxies: ["REJECT"],
      hidden: true,
    },
  ];

  config["proxy-groups"] = proxyGroups;
}

function overwriteRules(config) {
  const ruleProviders = {
    "fake-ip-filter": {
      type: "http",
      behavior: "domain",
      format: "text",
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/fake-ip-filter.list",
      interval: 86400,
    },
    "direct-classical-no-resolve": {
      type: "http",
      behavior: "classical",
      format: "yaml",
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/direct-classical-no-resolve.yaml",
      interval: 86400,
    },
    "custom-direct-domain": {
      type: "http",
      behavior: "domain",
      format: "yaml",
      url: "https://api.asailor.org/Custom_OpenClash_Rules/main/rule/Custom_Direct_Domain.yaml",
      interval: 86400,
    },
    "geosite-category-ai-!cn": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-ai-!cn.mrs",
      interval: 86400,
    },
    "geosite-cursor": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cursor.mrs",
      interval: 86400,
    },
    "geosite-google": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs",
      interval: 86400,
    },
    "geosite-google-cn": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google-cn.mrs",
      interval: 86400,
    },
    "geosite-private": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs",
      interval: 86400,
    },
    "geosite-category-public-tracker": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-public-tracker.mrs",
      interval: 86400,
    },
    "geosite-connectivity-check": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/connectivity-check.mrs",
      interval: 86400,
    },
    "geosite-apple": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs",
      interval: 86400,
    },
    "geosite-category-games@cn": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-games@cn.mrs",
      interval: 86400,
    },
    "geosite-category-games": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-games.mrs",
      interval: 86400,
    },
    "geosite-bilibili": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bilibili.mrs",
      interval: 86400,
    },
    "geosite-category-speedtest": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-speedtest.mrs",
      interval: 86400,
    },
    "geosite-youtube": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs",
      interval: 86400,
    },
    "geosite-github": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs",
      interval: 86400,
    },
    "geosite-microsoft": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs",
      interval: 86400,
    },
    "geosite-cn": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs",
      interval: 86400,
    },
    "geoip-private": {
      type: "http",
      behavior: "ipcidr",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs",
      interval: 86400,
    },
    "geoip-cn": {
      type: "http",
      behavior: "ipcidr",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs",
      interval: 86400,
    },
  };

  const rules = [
    //// Start ////
    "RULE-SET,direct-classical-no-resolve,🎯 全球直连",
    "RULE-SET,custom-direct-domain,🎯 全球直连",
    "RULE-SET,geosite-private,🎯 全球直连",
    "RULE-SET,geosite-google-cn,🎯 全球直连",
    "RULE-SET,geosite-category-public-tracker,🎯 全球直连",
    "RULE-SET,geosite-connectivity-check,🎯 全球直连",
    "RULE-SET,geosite-apple,🍎 Apple",
    "RULE-SET,geosite-category-games@cn,🎯 全球直连",
    "RULE-SET,geosite-category-games,🎮 Game",
    "RULE-SET,geosite-bilibili,📺 Bilibili",
    "RULE-SET,geosite-category-speedtest,⏱️ Speedtest",
    //// AI ////
    "RULE-SET,geosite-category-ai-!cn,🤖 AI",
    "RULE-SET,geosite-cursor,🤖 AI",
    //// Google ////
    "RULE-SET,geosite-youtube,📹 YouTube",
    "RULE-SET,geosite-google,🇬 Google",
    //// GitHub ////
    "RULE-SET,geosite-github,🚀 节点选择",
    "RULE-SET,geosite-microsoft,Ⓜ️ Microsoft",
    //// Final ////
    "RULE-SET,geosite-cn,🎯 全球直连",
    "RULE-SET,geoip-private,🎯 全球直连,no-resolve",
    "RULE-SET,geoip-cn,🎯 全球直连,no-resolve",
    "MATCH,🐟 漏网之鱼",
  ];

  config["rule-providers"] = ruleProviders;
  config.rules = rules;
}

function overwriteDns(config) {
  const dns = {
    enable: true,
    ipv6: true,
    "respect-rules": false,
    "cache-algorithm": "arc",
    "use-hosts": false,
    "use-system-hosts": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": ["rule-set:fake-ip-filter"],
    nameserver: ["223.5.5.5", "119.29.29.29", "114.114.114.114"],
  };

  config.dns = dns;
}

function overwriteSniffer(config) {
  const sniffer = {
    enable: true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": false,
    sniff: {
      QUIC: {
        ports: [443, 8443],
      },
      TLS: {
        ports: [443, 8443],
      },
      HTTP: {
        ports: [80, "8080-8880"],
      },
    },
    "skip-domain": [
      "Mijia Cloud",
      "+.push.apple.com",
      "dlg.io.mi.com",
      "+.oray.com",
    ],
    "skip-dst-address": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "127.0.0.0/8",
      "169.254.0.0/16",
      "224.0.0.0/4",
      "100.64.0.0/10",
    ],
  };

  config.sniffer = sniffer;
}

function overwriteOthers(config) {
  config.mode = "rule";
  config["allow-lan"] = false;
  config["log-level"] = "info";
  config.ipv6 = false;
  config["find-process-mode"] = "off";
  config["tcp-concurrent"] = true;
  config["unified-delay"] = true;
  config["disable-keep-alive"] = false;
  config["keep-alive-interval"] = 15;
  config["keep-alive-idle"] = 300;
  config.profile = {
    "store-selected": true,
    "store-fake-ip": true,
  };
}

function main(config, profileName) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxyGroups(config);
    overwriteRules(config);
    overwriteDns(config);
    overwriteSniffer(config);
    overwriteGeodata(config);
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
      name: "🤖 AI",
      type: "select",
      proxies: ["🚀 节点选择"],
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
      name: "🎥 HBO",
      type: "select",
      proxies: ["🚀 节点选择"],
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
    "geosite-private": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs",
      interval: 86400,
    },
    "geosite-google-cn": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google-cn.mrs",
      interval: 86400,
    },
    "geosite-category-public-tracker": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-public-tracker.mrs",
      interval: 86400,
    },
    "geosite-category-cryptocurrency": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-cryptocurrency.mrs",
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
    "geosite-hbo": {
      type: "http",
      behavior: "domain",
      format: "mrs",
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/hbo.mrs",
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
    "AND,((RULE-SET,geosite-category-ai-!cn),(NETWORK,UDP)),🛑 DROP",
    "AND,((RULE-SET,geosite-cursor),(NETWORK,UDP)),🛑 DROP",
    "AND,((RULE-SET,geosite-google),(NETWORK,UDP)),🛑 DROP",
    "RULE-SET,direct-classical-no-resolve,🎯 全球直连",
    "RULE-SET,geosite-private,🎯 全球直连",
    "RULE-SET,geosite-google-cn,🎯 全球直连",
    "RULE-SET,geosite-category-public-tracker,🎯 全球直连",
    "RULE-SET,geosite-category-cryptocurrency,🎯 全球直连",
    "RULE-SET,geosite-apple,🍎 Apple",
    "RULE-SET,geosite-category-games@cn,🎯 全球直连",
    "RULE-SET,geosite-category-games,🎮 Game",
    "RULE-SET,geosite-bilibili,📺 Bilibili",
    "RULE-SET,geosite-category-speedtest,⏱️ Speedtest",
    "RULE-SET,geosite-hbo,🎥 HBO",
    "RULE-SET,geosite-category-ai-!cn,🤖 AI",
    "RULE-SET,geosite-cursor,🤖 AI",
    "RULE-SET,geosite-youtube,📹 YouTube",
    "RULE-SET,geosite-google,🇬 Google",
    "RULE-SET,geosite-github,🚀 节点选择",
    "RULE-SET,geosite-microsoft,Ⓜ️ Microsoft",
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
    ipv6: false,
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
        "override-destination": true,
      },
    },
    "force-domain": [
      "+.netflix.com",
      "+.nflxvideo.net",
      "+.amazonaws.com",
      "+.media.dssott.com",
    ],
    "skip-domain": [
      "Mijia Cloud",
      "dlg.io.mi.com",
      "+.oray.com",
      "+.sunlogin.net",
      "+.push.apple.com",
    ],
    "skip-dst-address": [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "127.0.0.0/8",
      "224.0.0.0/4",
    ],
  };

  config.sniffer = sniffer;
}

function overwriteGeodata(config) {
  config["geodata-mode"] = true;
  config["geodata-loader"] = "memconservative";
  config["geo-auto-update"] = true;
  config["geo-update-interval"] = 24;
  config["geox-url"] = {
    geoip:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    geosite:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    asn: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb",
  };
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
  config["keep-alive-idle"] = 600;
  config.profile = {
    "store-selected": true,
    "store-fake-ip": true,
  };
}

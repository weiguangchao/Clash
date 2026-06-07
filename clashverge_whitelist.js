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
      name: "🇬 谷歌服务",
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
      name: "🎮 游戏平台",
      type: "select",
      proxies: ["🎯 全球直连", "🚀 节点选择"],
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🍎 苹果服务",
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
    direct_classical_no_resolve: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/direct_classical_no_resolve.yaml",
    },
    reject_drop_classical_no_resolve: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/reject_drop_classical_no_resolve.yaml",
    },
    reject_classical_no_resolve: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/reject_classical_no_resolve.yaml",
    },
  };

  const rules = [
    "RULE-SET,reject_classical_no_resolve,🛑 REJECT",
    "RULE-SET,reject_drop_classical_no_resolve,🛑 DROP",
    "RULE-SET,direct_classical_no_resolve,🎯 全球直连",
    "GEOSITE,private,🎯 全球直连",
    "GEOSITE,connectivity-check,🎯 全球直连",
    "GEOSITE,google-cn,🎯 全球直连",
    "GEOSITE,category-public-tracker,🎯 全球直连",
    "GEOSITE,category-games@cn,🎯 全球直连",
    "GEOSITE,category-cryptocurrency,🎯 全球直连",
    "GEOSITE,apple,🍎 苹果服务",
    "GEOSITE,notion,🎯 全球直连",
    "GEOSITE,category-games,🎮 游戏平台",
    "GEOSITE,bilibili,📺 Bilibili",
    "GEOSITE,category-speedtest,⏱️ Speedtest",
    "GEOSITE,category-ai-!cn,🤖 AI",
    "GEOSITE,cursor,🤖 AI",
    "GEOSITE,youtube,📹 YouTube",
    "GEOSITE,google,🇬 谷歌服务",
    "GEOSITE,github,🚀 节点选择",
    "GEOSITE,microsoft,Ⓜ️ Microsoft",
    "GEOSITE,cn,🎯 全球直连",
    "GEOIP,private,🎯 全球直连,no-resolve",
    "GEOIP,cn,🎯 全球直连,no-resolve",
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
    "fake-ip-filter": [
      "GEOSITE:private",
      "GEOSITE:connectivity-check",
      "+.localhost.work.weixin.qq.com",
      "stun.*.*",
      "stun.*.*.*",
      "+.stun.*.*",
      "+.stun.*.*.*",
      "+.stun.*.*.*.*",
      "+.stun.*.*.*.*.*",
    ],
    nameserver: ["223.5.5.5", "119.29.29.29", "114.114.114.114"],
  };

  config.dns = dns;
}

function overwriteSniffer(config) {
  const sniffer = {
    enable: true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    sniff: {
      QUIC: {
        ports: [443],
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
  config["keep-alive-idle"] = 300;
  config.profile = {
    "store-selected": true,
    "store-fake-ip": true,
  };
}

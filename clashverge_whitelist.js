function main(config, profileName) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxyGroups(config); // proxy group
    overwriteRules(config); // rule
    overwriteDns(config); // dns
    overwriteSniffer(config); // sniffer
    overwriteGeodata(config); // geodata
    overwriteOthers(config); // other
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
      proxies: ["🤖 自动选择", "🌴 手动选择", "DIRECT"],
    },
    {
      name: "🤖 自动选择",
      type: "select",
      proxies: [
        "♻️ All-自动选择",
        "🇭🇰 HK-自动选择",
        "🇹🇼 TW-自动选择",
        "🇯🇵 JP-自动选择",
        "🇺🇸 US-自动选择",
        "🇸🇬 SG-自动选择",
        "🌐 Other-自动选择",
      ],
    },
    {
      name: "📺 哔哩哔哩",
      type: "select",
      proxies: ["DIRECT", "🇭🇰 HK-自动选择", "🇹🇼 TW-自动选择"],
    },
    {
      name: "Ⓜ️ 微软服务",
      type: "select",
      proxies: ["DIRECT", "🚀 节点选择"],
    },
    {
      name: "⏱️ 测速工具",
      type: "select",
      proxies: ["DIRECT", "🚀 节点选择"],
    },
    {
      name: "🔀 非标端口",
      type: "select",
      proxies: ["DIRECT", "🚀 节点选择"],
    },
    {
      name: "🌴 手动选择",
      type: "select",
      "include-all": true,
      "exclude-type": "direct",
    },
    {
      name: "🎯 全球直连",
      type: "select",
      proxies: ["DIRECT"],
      hidden: true,
    },
    {
      name: "🛑 广告拦截",
      type: "select",
      proxies: ["REJECT"],
      hidden: true,
    },
    {
      name: "♻️ All-自动选择",
      type: "url-test",
      "include-all": true,
      "exclude-type": "direct",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🇭🇰 HK-自动选择",
      filter: "(?i)🇭🇰|港|hk|hongkong|hong kong",
      "include-all": true,
      "exclude-type": "direct",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🇹🇼 TW-自动选择",
      filter: "(?i)🇹🇼|🇨🇳|台|tw|taiwan",
      "include-all": true,
      "exclude-type": "direct",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🇯🇵 JP-自动选择",
      filter: "(?i)🇯🇵|日|jp|japan",
      "include-all": true,
      "exclude-type": "direct",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🇺🇸 US-自动选择",
      filter: "(?i)🇺🇸|美|us|unitedstates|united states",
      "include-all": true,
      "exclude-type": "direct",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🇸🇬 SG-自动选择",
      filter: "(?i)(🇸🇬|新|sg|singapore)",
      "include-all": true,
      "exclude-type": "direct",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
    {
      name: "🌐 Other-自动选择",
      type: "url-test",
      "include-all": true,
      "exclude-type": "direct",
      filter:
        "(?i)^(?!.*(?:🇭🇰|港|hk|hongkong|hong kong|🇹🇼|🇨🇳|台|tw|taiwan|🇯🇵|日|jp|japan|🇺🇸|美|us|unitedstates|united states|🇸🇬|新|sg|singapore)).*",
      url: "https://www.gstatic.com/generate_204",
      "expected-status": 204,
      interval: 300,
      timeout: 5000,
      "max-failed-times": 5,
      tolerance: 50,
      lazy: true,
      hidden: true,
    },
  ];

  config["proxy-groups"] = proxyGroups;
}

function overwriteRules(config) {
  const ruleProviders = {
    adblockmihomo: {
      type: "http",
      behavior: "domain",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/217heidai/adblockfilters/refs/heads/main/rules/adblockmihomo.yaml",
      path: "./217heidai/adblockmihomo.yaml",
    },
    port_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/port_classical.yaml",
      path: "./Clash/port_classical.yaml",
    },
    reject_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/reject_classical.yaml",
      path: "./Clash/reject_classical.yaml",
    },
    direct_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/refs/heads/master/direct_classical.yaml",
      path: "./Clash/direct_classical.yaml",
    },
  };

  const rules = [
    "RULE-SET,adblockmihomo,🛑 广告拦截",
    "RULE-SET,reject_classical,🛑 广告拦截",
    "RULE-SET,direct_classical,DIRECT",
    "GEOSITE,private,DIRECT",
    "GEOSITE,google-cn,DIRECT",
    "GEOSITE,apple,DIRECT",
    "GEOSITE,category-public-tracker,DIRECT",
    "GEOSITE,category-speedtest,⏱️ 测速工具",
    "GEOSITE,category-games,DIRECT",
    "GEOSITE,bilibili,📺 哔哩哔哩",
    "GEOSITE,github,🚀 节点选择",
    "GEOSITE,microsoft,Ⓜ️ 微软服务",
    "GEOSITE,gfw,🚀 节点选择",
    "GEOSITE,cn,DIRECT",
    ////////////////////////////////////////////////////////////////
    "GEOIP,private,DIRECT,no-resolve",
    "GEOIP,telegram,🚀 节点选择,no-resolve",
    "GEOIP,cn,DIRECT",
    "RULE-SET,port_classical,🔀 非标端口",
    "MATCH,🚀 节点选择",
  ];

  config["rule-providers"] = ruleProviders;
  config.rules = rules;
}

function overwriteDns(config) {
  const dns = {
    enable: true,
    ipv6: true,
    "cache-algorithm": "arc",
    "use-hosts": false,
    "use-system-hosts": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      // 本地主机/设备
      "+.lan",
      "+.local",
      // Windows网络出现小地球图标
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      // QQ快速登录检测失败
      "localhost.ptlogin2.qq.com",
      "localhost.sec.qq.com",
      // 微信快速登录检测失败
      "localhost.work.weixin.qq.com",
    ],
    nameserver: [
      "233.5.5.5",
      "119.29.29.29",
      "180.76.76.76",
      "114.114.114.114",
    ],
  };

  config.dns = dns;
}

function overwriteSniffer(config) {
  const sniffer = {
    enable: true,
    "parse-pure-ip": true,
    "force-dns-mapping": true,
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
    "skip-domain": [
      "Mijia Cloud",
      "+.push.apple.com",
      "+.oray.com",
      "+.sunlogin.net",
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
    mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    geoip:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    geosite:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    asn: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb",
  };
}

function overwriteOthers(config) {
  config.ipv6 = true;
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
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

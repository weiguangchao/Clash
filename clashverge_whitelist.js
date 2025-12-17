function main(config, profileName) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxyGroups(config); // proxy group
    overwriteRules(config); // rule
    overwriteDns(config); // dns
    overwriteSniffer(config); // sniffer
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
      url: "https://raw.githubusercontent.com/217heidai/adblockfilters/main/rules/adblockmihomo.yaml",
    },
    port_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/master/port_classical.yaml",
    },
    reject_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/master/reject_classical.yaml",
    },
    direct_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://raw.githubusercontent.com/weiguangchao/Clash/master/direct_classical.yaml",
    },
    private_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs",
    },
    google_cn_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google-cn.mrs",
    },
    apple_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/apple.mrs",
    },
    category_public_tracker_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-public-tracker.mrs",
    },
    category_speedtest_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-speedtest.mrs",
    },
    category_games_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/category-games.mrs",
    },
    bilibili_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/bilibili.mrs",
    },
    github_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/github.mrs",
    },
    microsoft_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/microsoft.mrs",
    },
    gfw_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/gfw.mrs",
    },
    cn_domain: {
      type: "http",
      behavior: "domain",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs",
    },
    private_ip: {
      type: "http",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs",
    },
    telegram_ip: {
      type: "http",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/telegram.mrs",
    },
    cn_ip: {
      type: "http",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400,
      url: "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs",
    },
  };

  const rules = [
    "RULE-SET,adblockmihomo,🛑 广告拦截",
    "RULE-SET,reject_classical,🛑 广告拦截",
    "RULE-SET,direct_classical,DIRECT",
    "RULE-SET,private_domain,DIRECT",
    "RULE-SET,google_cn_domain,DIRECT",
    "RULE-SET,apple_domain,DIRECT",
    "RULE-SET,category_public_tracker_domain,DIRECT",
    "RULE-SET,category_speedtest_domain,⏱️ 测速工具",
    "RULE-SET,category_games_domain,DIRECT",
    "RULE-SET,bilibili_domain,📺 哔哩哔哩",
    "RULE-SET,github_domain,🚀 节点选择",
    "RULE-SET,microsoft_domain,Ⓜ️ 微软服务",
    "RULE-SET,gfw_domain,🚀 节点选择",
    "RULE-SET,cn_domain,DIRECT",
    "RULE-SET,private_ip,DIRECT",
    "RULE-SET,telegram_ip,🚀 节点选择",
    "RULE-SET,cn_ip,DIRECT",
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

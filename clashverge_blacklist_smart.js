function main(config, profileName) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxyGroups(config);
    overwriteRules(config);
    overwriteDns(config);
    overwriteOthers(config);
    console.log("配置文件重写完成！");
    return config;
  } catch (error) {
    console.log("配置文件重写失败！将使用原来配置文件！");
    return config;
  }
}

function overwriteRules(config) {
  const ruleProviders = {
    reject_non_ip_no_drop: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/non_ip/reject-no-drop.txt",
      path: "./sukkaw_ruleset/reject_non_ip_no_drop.txt",
    },
    reject_non_ip_drop: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt",
      path: "./sukkaw_ruleset/reject_non_ip_drop.txt",
    },
    reject_non_ip: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
      path: "./sukkaw_ruleset/reject_non_ip.txt",
    },
    reject_domainset: {
      type: "http",
      behavior: "domain",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/domainset/reject.txt",
      path: "./sukkaw_ruleset/reject_domainset.txt",
    },
    reject_extra_domainset: {
      type: "http",
      behavior: "domain",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/domainset/reject_extra.txt",
      path: "./sukkaw_ruleset/reject_domainset_extra.txt",
    },
    reject_ip: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/ip/reject.txt",
      path: "./sukkaw_ruleset/reject_ip.txt",
    },
    telegram_ip: {
      type: "http",
      behavior: "classical",
      format: "text",
      interval: 43200,
      url: "https://ruleset.skk.moe/Clash/ip/telegram.txt",
      path: "./sukkaw_ruleset/telegram_ip.txt",
    },
  };

  const rules = [
    "GEOSITE,category-ads-all,REJECT",
    "RULE-SET,reject_non_ip,REJECT",
    "RULE-SET,reject_domainset,REJECT",
    "RULE-SET,reject_extra_domainset,REJECT",
    "RULE-SET,reject_non_ip_drop,REJECT-DROP",
    "RULE-SET,reject_non_ip_no_drop,REJECT",
    //////////////////////////////////////////////////////////////
    "GEOSITE,openai,🚀 节点选择",
    "GEOSITE,github,🚀 节点选择",
    "GEOSITE,cursor,🚀 节点选择",
    "GEOSITE,rust,🚀 节点选择",
    "GEOSITE,google,🚀 节点选择",
    "GEOSITE,twitter,🚀 节点选择",
    //////////////////////////////////////////////////////////////
    "RULE-SET,reject_ip,REJECT",
    //////////////////////////////////////////////////////////////
    "RULE-SET,telegram_ip,🚀 节点选择",
    "MATCH,DIRECT",
  ];

  //////////////////////////////////////////////////////////////
  config.rules = rules;
  config["rule-providers"] = ruleProviders;
}

function overwriteProxyGroups(config) {
  const maxMultiple = 2;

  const allProxyNames = config["proxies"].map((e) => e.name);
  // 所有代理 过滤掉高倍率节点
  const allAutoProxyNames = allProxyNames.filter((e) => {
    // 倍率筛选
    const regex = /【(\d+x)】/;
    const match = e.match(regex);
    if (match) {
      const multiple = parseInt(match[1]);
      return multiple < maxMultiple;
    }
    return true;
  });

  // 自动选择代理组
  const autoProxyGroupRegexs = [
    {
      name: "🇭🇰 HK-自动选择",
      regex: /港|hk|hongkong|hong kong|🇭🇰/i,
    },
    {
      name: "🇹🇼 TW-自动选择",
      regex: /台|tw|taiwan|🇨🇳|🇹🇼/i,
    },
    {
      name: "🇸🇬 SG-自动选择",
      regex: /新加坡|狮城|sg|singapore|🇸🇬/i,
    },
    {
      name: "🇰🇷 KR-自动选择",
      regex: /韩|kr|korea|🇰🇷/i,
    },
    {
      name: "🇯🇵 JP-自动选择",
      regex: /日本|jp|japan|🇯🇵/i,
    },
    {
      name: "🇺🇸 US-自动选择",
      regex: /美|us|unitedstates|united states|america|🇺🇸/i,
    },
  ];

  const commonProxyGroupsConfig = {
    type: "smart",
    // "policy-priority": "",
    uselightgbm: true,
    collectdata: false,
    strategy: "sticky-sessions",
    "sample-rate": 1,
    hidden: true,
  };

  const autoProxyGroups = autoProxyGroupRegexs
    .map((item) => ({
      name: item.name,
      //////////////////////////////////////////////////////////
      ...commonProxyGroupsConfig,
      //////////////////////////////////////////////////////////
      proxies: allAutoProxyNames.filter((e) => item.regex.test(e)),
    }))
    .filter((item) => item.proxies.length);

  const proxyGroups = [
    {
      name: "🚀 节点选择",
      type: "select",
      proxies: ["🤖 自动选择", "🌴 手动选择"],
    },
    {
      name: "🤖 自动选择",
      type: "select",
      proxies: autoProxyGroups.map((item) => item.name),
    },
    {
      name: "🌴 手动选择",
      type: "select",
      proxies: allProxyNames,
    },
  ];

  proxyGroups.push(...autoProxyGroups);

  //////////////////////////////////////////////////////////////
  config["proxy-groups"] = proxyGroups;
}

function overwriteOthers(config) {
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
      // 米家设备
      "Mijia Cloud",
      // 向日葵
      "+.oray.com",
      "+.sunlogin.net",
      // Apple
      "+.apple.com",
    ],
  };

  //////////////////////////////////////////////////////////////
  config.ipv6 = true;
  config.sniffer = sniffer;
  config["tcp-concurrent"] = true;
  config["unified-delay"] = true;
  // config.ipv6 = false;
  config["allow-lan"] = false;
  // 长链接
  // config["disable-keep-alive"] = true;
  config["keep-alive-interval"] = 15;
  config["keep-alive-idle"] = 300;
  config.profile = {
    "store-selected": true,
    "store-fake-ip": true,
    // smart-collector-size: data collection file size, the default is 100 (MB)
    "smart-collector-size": 100,
  };

  //////////////////////////////////////////////////////////////
  config["geodata-mode"] = true;
  config["geodata-auto-update"] = true;
  config["geodata-update-interval"] = 24;
  config["geox-url"] = {
    mmdb: "https://fastly.jsdelivr.net/gh/alecthw/mmdb_china_ip_list@release/lite/Country.mmdb",
    geoip:
      "https://fastly.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat",
    geosite:
      "https://fastly.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat",
    asn: "https://fastly.jsdelivr.net/gh/xishang0128/geoip@release/GeoLite2-ASN.mmdb",
  };
  //////////////////////////////////////////////////////////////

  // LightGBM Model
  // enable model auto update, the default is false
  config["lgbm-auto-update"] = true;
  // model auto update interval, the default is 72 (hours)
  config["lgbm-update-interval"] = 72;
  // model update url
  config["lgbm-url"] =
    "https://github.com/vernesong/mihomo/releases/download/LightGBM-Model/Model.bin";
}

function overwriteDns(config) {
  const en0Dns = "dhcp://en0"; // 使用运营商DNS有些域名解析不了

  const cnDnsList = [
    "233.5.5.5", // 阿里DNS
    "119.29.29.29", // 腾讯DNS
    "180.76.76.76", // 百度DNS
    "114.114.114.114", // 114DNS
  ];

  const cnDotList = ["tls://1.12.12.12:853", "tls://223.5.5.5:853"];

  const cnDohList = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query", // 腾讯DNSPod
    "https://doh.360.cn/dns-query", // 360DNS
  ];

  const gfwDnsList = [
    "8.8.8.8", // Google DNS
    "1.1.1.1", // Cloudflare DNS
  ];

  const gfwDohList = [
    "https://dns.google/dns-query", // Google DNS
    "https://cloudflare-dns.com/dns-query", // Cloudflare DNS
    "https://dns.quad9.net/dns-query", // Quad9 DNS
    "https://doh.opendns.com/dns-query", // OpenDNS
  ];

  const ipDnsList = [
    "233.5.5.5", // 阿里DNS
    "119.29.29.29", // 腾讯DNS
    "8.8.8.8", // Google DNS
    "1.1.1.1", // Cloudflare DNS
  ];

  const dns = {
    enable: true,
    ipv6: true,
    "enhanced-mode": "fake-ip",
    "fake-ip-filter-mode": "blacklist",
    "cache-algorithm": "arc",
    "prefer-h3": true,
    "respect-rules": false,
    "use-system-hosts": true,
    "use-hosts": true,
    "fake-ip-filter": [
      "geosite:private",
      // 本地主机/设备
      "+.lan",
      "+.local",
      // Windows网络出现小地球图标
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      // parsec
      "+.parsec.app",
      // 小米路由器
      "+.miwifi.com",
      // QQ快速登录检测失败
      "localhost.ptlogin2.qq.com",
      "localhost.sec.qq.com",
      // 微信快速登录检测失败
      "localhost.work.weixin.qq.com",
    ],
    // "default-nameserver": cnDotList,
    nameserver: [en0Dns],
    // "proxy-server-nameserver": [en0Dns],
    // "direct-nameserver": cnDohList,
    // "direct-nameserver-follow-policy": true,
    // 尽早分流 避免并发使用fallback造成浪费
    // "nameserver-policy": {
    //   "geosite:private,cn": [en0Dns],
    //   "geosite:gfw": gfwDnsList,
    // },
    // fallback: gfwDnsList,
    // "fallback-filter": {
    //   geoip: true,
    //   "geoip-code": "cn",
    //   geosite: ["gfw"],
    //   ipcidr: ["240.0.0.0/4"],
    // },
  };

  //////////////////////////////////////////////////////////////
  config.dns = dns;
}

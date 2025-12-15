function main(config) {
  if (!config) {
    return config;
  }

  try {
    overwriteProxys(config); // proxys
    overwriteProxyGroups(config); // proxy groups
    overwriteRules(config); // rules
    overwriteDns(config); // dns
    overwriteSniffer(config); // sniffer
    overwriteGeodata(config); // geodata
    overwriteOthers(config); // others
    console.log("配置文件重写完成！");
    return config;
  } catch (error) {
    console.log("配置文件重写失败！将使用原来配置文件！");
    return config;
  }
}

function overwriteProxys(config) {
  let proxies = config.proxies;
  if (!proxies) {
    return;
  }
  proxies = proxies.map((proxy) => {
    return {
      ...proxy,
      "ip-version": "ipv4",
    };
  });
  config.proxies = proxies;
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
        "🇭🇰 HK-自动选择",
        "🇹🇼 TW-自动选择",
        "🇯🇵 JP-自动选择",
        "🇺🇸 US-自动选择",
        "🇸🇬 SG-自动选择",
        "🌐 其他地区",
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
      name: "🍃 隐私净化",
      type: "select",
      proxies: ["REJECT"],
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
      name: "🌐 其他地区",
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
      url: "https://cdn.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomo.yaml",
      path: "./217heidai/adblockmihomo.yaml",
    },
    port_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/weiguangchao/Clash/port_classical.yaml",
      path: "./Clash/port_classical.yaml",
    },
    reject_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/weiguangchao/Clash/reject_classical.yaml",
      path: "./Clash/reject_classical.yaml",
    },
    direct_classical: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/weiguangchao/Clash/direct_classical.yaml",
      path: "./Clash/direct_classical.yaml",
    },
  };

  //////////////////////////////////////////////////////////////
  const rules = [
    "RULE-SET,adblockmihomo,🛑 广告拦截",
    "RULE-SET,reject_classical,🛑 广告拦截",
    "GEOIP,private,DIRECT,no-resolve",
    "GEOIP,telegram,🚀 节点选择,no-resolve",
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
    ipv6: false,
    "use-hosts": false,
    "use-system-hosts": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      "*",
      "*.lan",
      "*.localdomain",
      "*.example",
      "*.invalid",
      "*.localhost",
      "*.test",
      "*.local",
      "*.home.arpa",
      "*.direct",
      "time.*.com",
      "time.*.gov",
      "time.*.edu.cn",
      "time.*.apple.com",
      "time-ios.apple.com",
      "time1.*.com",
      "time2.*.com",
      "time3.*.com",
      "time4.*.com",
      "time5.*.com",
      "time6.*.com",
      "time7.*.com",
      "ntp.*.com",
      "ntp1.*.com",
      "ntp2.*.com",
      "ntp3.*.com",
      "ntp4.*.com",
      "ntp5.*.com",
      "ntp6.*.com",
      "ntp7.*.com",
      "*.time.edu.cn",
      "*.ntp.org.cn",
      "+.pool.ntp.org",
      "time1.cloud.tencent.com",
      "music.163.com",
      "*.music.163.com",
      "*.126.net",
      "musicapi.taihe.com",
      "music.taihe.com",
      "songsearch.kugou.com",
      "trackercdn.kugou.com",
      "*.kuwo.cn",
      "api-jooxtt.sanook.com",
      "api.joox.com",
      "joox.com",
      "y.qq.com",
      "*.y.qq.com",
      "streamoc.music.tc.qq.com",
      "mobileoc.music.tc.qq.com",
      "isure.stream.qqmusic.qq.com",
      "dl.stream.qqmusic.qq.com",
      "aqqmusic.tc.qq.com",
      "amobile.music.tc.qq.com",
      "*.xiami.com",
      "*.music.migu.cn",
      "music.migu.cn",
      "+.msftconnecttest.com",
      "+.msftncsi.com",
      "localhost.ptlogin2.qq.com",
      "localhost.sec.qq.com",
      "localhost.*.weixin.qq.com",
      "+.steamcontent.com",
      "+.srv.nintendo.net",
      "*.n.n.srv.nintendo.net",
      "+.cdn.nintendo.net",
      "xbox.*.*.microsoft.com",
      "*.*.xboxlive.com",
      "xbox.*.microsoft.com",
      "xnotify.xboxlive.com",
      "+.battle.net",
      "+.battlenet.com.cn",
      "+.wotgame.cn",
      "+.wggames.cn",
      "+.wowsgame.cn",
      "+.wargaming.net",
      "proxy.golang.org",
      "+.stun.*.*",
      "+.stun.*.*.*",
      "+.stun.*.*.*.*",
      "+.stun.*.*.*.*.*",
      "heartbeat.belkin.com",
      "*.linksys.com",
      "*.linksyssmartwifi.com",
      "*.router.asus.com",
      "mesu.apple.com",
      "swscan.apple.com",
      "swquery.apple.com",
      "swdownload.apple.com",
      "swcdn.apple.com",
      "swdist.apple.com",
      "lens.l.google.com",
      "na.b.g-tun.com",
      "+.nflxvideo.net",
      "*.square-enix.com",
      "*.finalfantasyxiv.com",
      "*.ffxiv.com",
      "*.ff14.sdo.com",
      "ff.dorado.sdo.com",
      "*.mcdn.bilivideo.cn",
      "+.media.dssott.com",
      "shark007.net",
      "Mijia Cloud",
      "+.market.xiaomi.com",
      "+.cmbchina.com",
      "+.cmbimg.com",
      "adguardteam.github.io",
      "adrules.top",
      "anti-ad.net",
      "local.adguard.org",
      "static.adtidy.org",
      "+.sandai.net",
      "+.n0808.com",
      "+.3gppnetwork.org",
      "+.uu.163.com",
      "ps.res.netease.com",
      "+.pub.3gppnetwork.org",
      "+.oray.com",
      "+.orayimg.com",
      "+.gcloudcs.com",
      "+.gcloudsdk.com",
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
    mmdb: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country-lite.mmdb",
    geoip:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip-lite.dat",
    geosite:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    asn: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb",
  };
}

function overwriteOthers(config) {
  config.ipv6 = false;
  config["find-process-mode"] = "off";
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

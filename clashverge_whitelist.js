function main(config) {
  if (!config) {
    return config;
  }

  try {
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
      lazy: true,
      hidden: true,
    },
  ];

  config["proxy-groups"] = proxyGroups;
}

function overwriteRules(config) {
  const ruleProviders = {
    "AWAvenue-Ads-Rule-Clash-Classical": {
      "type": "http",
      "behavior": "classical",
      "format": "yaml",
      "interval": 86400,
      "url": "https://testingcf.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main/Filters/AWAvenue-Ads-Rule-Clash-Classical.yaml",
      "path": "./TG-Twilight/AWAvenue-Ads-Rule-Clash-Classical.yaml"
    },
    Privacy_Classical_No_Resolve: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script/rule/Clash/Privacy/Privacy_Classical_No_Resolve.yaml",
      path: "./ios_rule_script/Privacy_Classical_No_Resolve.yaml",
    },
    port_0: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/port_0.yaml",
      path: "./Clash/port_0.yaml",
    },
    reject_0: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/reject_0.yaml",
      path: "./Clash/reject_0.yaml",
    },
    direct_0: {
      type: "http",
      behavior: "classical",
      format: "yaml",
      interval: 86400,
      url: "https://testingcf.jsdelivr.net/gh/weiguangchao/Clash/direct_0.yaml",
      path: "./Clash/direct_0.yaml",
    },
  };

  //////////////////////////////////////////////////////////////
  const rules = [
    "RULE-SET,AWAvenue-Ads-Rule-Clash-Classical,🛑 广告拦截",
    "RULE-SET,Privacy_Classical_No_Resolve,🍃 隐私净化",
    "RULE-SET,reject_0,🛑 广告拦截",
    "GEOIP,private,DIRECT,no-resolve",
    "GEOIP,telegram,🚀 节点选择,no-resolve",
    "RULE-SET,direct_0,DIRECT",
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
    "RULE-SET,port_0,🔀 非标端口",
    "MATCH,🚀 节点选择",
  ];

  config["rule-providers"] = ruleProviders;
  config.rules = rules;
}

function overwriteDns(config) {
  const dns = {
    enable: true,
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
      "233.5.5.5", // 阿里DNS
      "119.29.29.29", // 腾讯DNS
      "180.76.76.76", // 百度DNS
      "114.114.114.114", // 114DNS
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
      "Mijia Cloud", // 米家设备
      "+.oray.com", // 向日葵
      "+.sunlogin.net", // 向日葵
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
    mmdb: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country-lite.mmdb",
    geoip:
      "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip-lite.dat",
    geosite:
      "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    asn: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb",
  };
}

function overwriteOthers(config) {
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

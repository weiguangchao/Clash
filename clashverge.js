function main(config) {
  if (!config) {
    return config;
  }

  try {
    overwriteDns(config);
    overwriteOthers(config);
    console.log("配置文件重写完成！");
    return config;
  } catch (error) {
    console.log("配置文件重写失败！将使用原来配置文件！");
    return config;
  }
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
      "*.lan",
      "*.localdomain",
      "*.example",
      "*.invalid",
      "*.localhost",
      "*.test",
      "*.local",
      "*.home.arpa",
      "*.direct",
      "cable.auth.com",
      "network-test.debian.org",
      "detectportal.firefox.com",
      "resolver1.opendns.com",
      "global.turn.twilio.com",
      "global.stun.twilio.com",
      "app.yinxiang.com",
      "injections.adguard.org",
      "localhost.*.weixin.qq.com",
      "*.blzstatic.cn",
      "*.cmpassport.com",
      "id6.me",
      "open.e.189.cn",
      "opencloud.wostore.cn",
      "id.mail.wo.cn",
      "mdn.open.wo.cn",
      "hmrz.wo.cn",
      "nishub1.10010.com",
      "enrichgw.10010.com",
      "*.wosms.cn",
      "*.jegotrip.com.cn",
      "*.icitymobile.mobi",
      "*.pingan.com.cn",
      "*.cmbchina.com",
      "*.10099.com.cn",
      "*.microdone.cn",
      "PDC._msDCS.*.*",
      "DC._msDCS.*.*",
      "GC._msDCS.*.*",
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
      "+.qq.com",
      "+.tencent.com",
      "+.srv.nintendo.net",
      "*.n.n.srv.nintendo.net",
      "+.cdn.nintendo.net",
      "+.stun.playstation.net",
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
      "stun.*.*",
      "stun.*.*.*",
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
      "stun.l.google.com",
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
      "+.cmbchina.com",
      "+.cmbimg.com",
      "local.adguard.org",
      "+.sandai.net",
      "+.n0808.com",
      "+.uu.163.com",
      "ps.res.netease.com",
      "+.pub.3gppnetwork.org",
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

function overwriteOthers(config) {
  const sniffer = {
    enable: true,
    "parse-pure-ip": true,
    "force-dns-mapping": true,
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

  //////////////////////////////////////////////////////////////
  config.ipv6 = false;
  config["log-level"] = "info";
  config["tcp-concurrent"] = true;
  config["unified-delay"] = true;
  config["allow-lan"] = false;
  config["disable-keep-alive"] = false;
  config["keep-alive-interval"] = 15;
  config["keep-alive-idle"] = 300;
  config.profile = {
    "store-selected": true,
    "store-fake-ip": true,
  };

  //////////////////////////////////////////////////////////////
  config["geodata-mode"] = true;
  config["geodata-loader"] = "memconservative";
  config["geodata-auto-update"] = true;
  config["geodata-update-interval"] = 24;
  config["geox-url"] = {
    mmdb: "https://testingcf.jsdelivr.net/gh/alecthw/mmdb_china_ip_list@release/lite/Country.mmdb",
    geoip:
      "https://testingcf.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat",
    geosite:
      "https://testingcf.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat",
    asn: "https://testingcf.jsdelivr.net/gh/xishang0128/geoip@release/GeoLite2-ASN.mmdb",
  };
  //////////////////////////////////////////////////////////////
}

function main(config) {
  if (!config) {
    return config;
  }

  try {
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

function overwriteDns(config) {
  const dns = {
    enable: true,
    ipv6: false,
    "use-hosts": false,
    "use-system-hosts": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      "lens.l.google.com",
      "stun.l.google.com",
      // STUN
      "stun.*.*",
      "stun.*.*.*",
      "+.stun.*.*",
      "+.stun.*.*.*",
      "+.stun.*.*.*.*",
      "+.stun.*.*.*.*.*",
      "+.stun.*.*.*.*.*.*",
      "geosite:connectivity-check",
      "geosite:private",
      "geosite:category-ntp",
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
  config["geo-update-interval"] = 24 * 7; // 7 days
  config["geox-url"] = {
    mmdb: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    geoip:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    geosite:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
    asn: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb",
  };
}

function overwriteOthers(config) {
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
}

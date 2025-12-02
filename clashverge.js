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
    "enhanced-mode": "fake-ip",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-filter": [
      // Google
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
    "use-hosts": false,
    "use-system-hosts": false,
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
    mmdb: "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb",
    asn: "https://cdn.jsdelivr.net/gh/xishang0128/geoip@release/GeoLite2-ASN.mmdb",
    geoip:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat",
    geosite:
      "https://cdn.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat",
  };
  //////////////////////////////////////////////////////////////
}

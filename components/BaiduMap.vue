<template>
  <div id="baidu-map__container">
    <div id="baidu-map__wrapper"></div>
    <template v-if="error">
      <iframe :src="contactInfomation.bMapLink" frameborder="0"
        style="height: 100%; width: 100%; display: block; position: absolute; top: 0; left: 0; z-index: 1"></iframe>
      <a :href="contactInfomation.bMapLink" target="_blank"
        style="display: block; position: absolute; top: 0; left: 0; z-index: 2; width: 100%; height: 100%"></a>
    </template>
  </div>
</template>

<script>
export default {
  setup() {
    const contactInfomation = useState('contact-infomation');
    return {
      contactInfomation,
    }
  },
  data() {
    return {
      BMapGL: null,
      map: null,
      error: null,
      position: {
        lon: 106.61143082078523,
        lat: 29.63152183933617,
      },
      Marker: null,
      Label: null,
      InfoWindow: null,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const BMapGL = await new Promise((resolve, reject) => {
        if (window.BMapGL) resolve(window.BMapGL);
        window.initBMap = () => {
          resolve(window.BMapGL);
        };
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "//api.map.baidu.com/api?v=1.0&type=webgl&ak=1RrG8S0GduM1gdeM7EDGHkxwmFO9iswk&callback=initBMap";
        script.onerror = reject;
        document.head.appendChild(script);
      }).catch((error) => error);
      if (!(BMapGL && BMapGL.Map)) {
        this.error = BMapGL;
        return;
      }
      this.BMapGL = BMapGL;
      this.map = new BMapGL.Map("baidu-map__wrapper");
      this.map.centerAndZoom(new BMapGL.Point(this.position.lon, this.position.lat), 15);
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(new BMapGL.MapTypeControl());
      this.map.addControl(
        new BMapGL.LocationControl({
          anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
        })
      );
      this.createCompanyMarker();
    },
    async createCompanyMarker() {
      const { contactInfomation, BMapGL, map, position } = this;
      const companyName = contactInfomation.company;
      const point = await new Promise((resolve) => {
        const mapGeo = new BMapGL.Geocoder();
        mapGeo.getPoint(
          companyName,
          (point) => {
            point ? resolve(point) : resolve(new BMapGL.Point(position.lon, position.lat));
          },
          "重庆市"
        );
      }).catch((error) => {
        console.log(error);
        return new BMapGL.Point(position.lon, position.lat);
      });
      map.centerAndZoom(point, 15);
      this.Marker = new BMapGL.Marker(point, {
        title: companyName,
        icon: new BMapGL.Icon("/favicon.ico", new BMapGL.Size(36, 36)),
        offset: new BMapGL.Size(-18, -18),
        enanbleMassClear: false,
      });
      this.Label = new BMapGL.Label(companyName, {
        position: point,
        offset: new BMapGL.Size(-(companyName / 2) * 16, 0),
        enanbleMassClear: false,
      });
      this.InfoWindow = new BMapGL.InfoWindow(
        `<div class="company-info">
              <div class="company-info-phone">
                电话：${contactInfomation.phone}
              </div>
              <div class="company-info-address">
                地址：${contactInfomation.address}
              </div>
              <div class="company-info-action" style="font-size: 1.2em; font-weight: 700; color: #0cf;">
                <a href="${contactInfomation.bMapLink}" target="_blank">到这儿去</a>
              </div>
            </div>`,
        {
          title: companyName,
          width: 280,
          offset: new BMapGL.Size(0, -36),
        }
      );
      [this.Marker, this.Label].forEach((overlay) => {
        map.addOverlay(overlay);
        overlay.addEventListener("click", () => {
          map.openInfoWindow(this.InfoWindow, point);
        });
      });
      map.openInfoWindow(this.InfoWindow, point);
    },
  },
};
</script>

<style lang="scss" scoped>
#baidu-map__container {
  padding-bottom: 50%;
  height: 0;
  overflow: hidden;
  position: relative;
}

#baidu-map__wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
</style>

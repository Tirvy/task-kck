<template>
  <div>
    <div class="tab-content tab-content_ship">
      <div class="tab-content__inner"></div>
    </div>
    <div id="ya-karto"></div>
  </div>
</template>

<script>
import LocImg from '../assets/loc.png';
import CommonMixin from '../common/mixin';

export default {
  name: 'TabTake',
  mixins: [CommonMixin],
  data() {
    return {
      ymaps: null,
    };
  },
  mounted() {
    this.waitYmaps();
  },
  methods: {
    waitYmaps() {
      if (!this.ymaps) {
        let script = document.createElement('script');
        script.src = '//api-maps.yandex.ru/2.1/?load=package.standard&lang=ru_RU';
        document.head.appendChild(script);
        script.onload = () => {
          this.ymaps = global.ymaps;
          this.ymaps.ready(this.initYandexMap);
        };
      } else {
        this.ymaps.ready(this.initYandexMap);
      }
    },
    initYandexMap() {
      const isMobile = {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
          return (
            isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
          );
        },
      };
      let zoomControl = new this.ymaps.control.ZoomControl({
        options: {
          position: {
            left: 'auto',
            right: 10,
            top: 108,
          },
        },
      });

      let myMap = new this.ymaps.Map(
        'ya-karto',
        {
          center: [55.753994, 37.622093],
          zoom: 11,
          controls: [],
        },
        {
          searchControlProvider: 'yandex#search',
        }
      );
      myMap.controls.add(zoomControl);

      const shopCoords = [
        {y: 55.801131, x: 37.508167},
        {y: 55.757556, x: 37.651592},
      ];
      shopCoords.forEach(shopCoord => {
        myMap.geoObjects.add(
          new this.ymaps.Placemark([shopCoord.y, shopCoord.x], null, {
            iconLayout: 'default#image',
            iconImageHref: LocImg,
            iconImageSize: [39, 46],
            iconImageOffset: [-20, -46],
            cursor: 'default',
          })
        );
      });
      if (isMobile.any() || this.device_platform !== 'desktop') {
        myMap.behaviors.disable('drag');
      }
      myMap.behaviors.disable('scrollZoom');
    },
  },
};
</script>

<style scoped lang="scss">
#ya-karto {
  height: 580px;
  width: calc(100vw - 16px);
  position: absolute;
  left: 50%;
  margin-left: calc(8px - 50%);
}
</style>

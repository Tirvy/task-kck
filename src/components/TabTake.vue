<template>
  <div>
    <div class="tab-content tab-content_ship" :class="devicePlatform">
      <div class="tab-content__inner" :class="devicePlatform === 'desktop' ? 'radio_horizontal' : ''">
        <div class="radio-item" v-for="option in takeOptions" :key="option.id">
          <KckRadio :value="selectedOption === option.id" @select="selectOption(option)">
            <div :class="devicePlatform" class="option-name">
              {{ option.name }}
            </div>
          </KckRadio>
        </div>
      </div>
    </div>
    <div id="ya-karto" :class="devicePlatform"></div>
    <div class="tab-content">
      <div class="tab-content__inner flex-end" :class="{'mobile-map-row': devicePlatform === 'mobile'}">
        <div class="button" :class="{disabled: !this.canSend}">
          Отправить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocImg from '../assets/loc.png';
import CommonMixin from '../common/mixin';
import KckRadio from '@/components/KckRadio';

export default {
  name: 'TabTake',
  components: {KckRadio},
  mixins: [CommonMixin],
  data() {
    return {
      takeOptions: [
        {
          id: 'pesok',
          name: 'Пункт Выдачи заказов Песчаная улица, дом 13',
          coords: {y: 55.801131, x: 37.508167},
        },
        {
          id: 'sosna',
          name: 'Пункт Выдачи заказов Подсосенский переулок, 11',
          coords: {y: 55.757556, x: 37.651592},
        },
      ],
      selectedOption: null,
      ymaps: null,
      map: null,
    };
  },
  mounted() {
    this.waitYmaps();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.destroy();
      this.map = null;
    }
  },
  computed: {
    canSend() {
      return !!this.selectedOption;
    },
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option.id;
    },
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

      this.map = new this.ymaps.Map(
        'ya-karto',
        {
          center: [55.753994, 37.622093],
          zoom: this.devicePlatform === 'desktop' ? 11 : 10,
          controls: [],
        },
        {
          searchControlProvider: 'yandex#search',
        }
      );
      this.map.controls.add(zoomControl);

      this.takeOptions.forEach(({coords}) => {
        this.map.geoObjects.add(
          new this.ymaps.Placemark([coords.y, coords.x], null, {
            iconLayout: 'default#image',
            iconImageHref: LocImg,
            iconImageSize: [39, 46],
            iconImageOffset: [-20, -46],
            cursor: 'default',
          })
        );
      });
      if (isMobile.any() || this.device_platform !== 'desktop') {
        this.map.behaviors.disable('drag');
      }
      this.map.behaviors.disable('scrollZoom');
    },
  },
};
</script>

<style scoped lang="scss">
.radio_horizontal {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.radio-item {
  flex: 1 0 50%;
}

.option-name {
  text-align: left;
  &.desktop {
    white-space: nowrap;
  }
}

#ya-karto {
  width: calc(100vw - 16px);
  position: relative;
  left: 50%;
  transform: translate(-50%, 0px);

  &.desktop {
    height: 580px;
  }

  &.mobile {
    height: 400px;
  }
}

.mobile-map-row {
  position: absolute;
  transform: translate(-10px, -100%);
  width: 100%;
}
</style>

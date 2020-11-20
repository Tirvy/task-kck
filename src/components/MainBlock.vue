<template>
  <div class="whole-container">
    <div class="title" :class="devicePlatform">
      Выберите способ доставки
    </div>

    <template v-if="devicePlatform === 'desktop'">
      <div class="tab-header-row">
        <div
          v-for="tab in tabsReversed"
          :key="tab.name"
          class="tab-header"
          :class="[{active: tab === currentTab}, devicePlatform]"
          @click="setActiveTab(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
      <component :is="currentTab.component"></component>
    </template>

    <template v-else>
      <template v-for="tab in tabs">
        <div
          class="tab-header_mobile"
          :key="tab.id"
          :class="[{active: tab === currentTab}, devicePlatform]"
          @click="setActiveTab(tab)"
        >
          {{ tab.name }}
        </div>
        <component :is="tab.component" :key="tab.id" v-if="tab === currentTab"></component>
      </template>
    </template>
  </div>
</template>

<script>
import Mask from '../common/mask.js';
let TabShip = () => import('./TabShip.vue');
let TabTake = () => import('./TabTake.vue');
import CommonMixin from '@/common/mixin';

export default {
  name: 'MainBlock',
  mixins: [CommonMixin],
  components: {TabShip, TabTake},
  directives: {Mask},
  data() {
    const tabs = [
      {
        name: 'Доставка',
        alias: 'ship',
        component: TabShip,
      },
      {
        name: 'Самовывоз',
        alias: 'take',
        component: TabTake,
      },
    ];
    return {
      tabs,
      currentTab: tabs[0],
    };
  },
  computed: {
    tabsReversed() {
      let ret = [...this.tabs];
      ret.reverse();
      return ret;
    },
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped lang="scss">
.whole-container {
  margin: 0 auto;
  max-width: 1200px;
}

.title {
  font-size: 24px;
  text-align: left;
  padding-left: 32px;
  padding-bottom: 16px;

  &.mobile {
    padding-left: 16px;
  }
}
</style>

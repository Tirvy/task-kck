<template>
  <div class="whole-container">
    <div class="title">
      Выберите способ доставки
    </div>
    <div class="tab-header-row">
      <div
        v-for="tab in tabsReversed"
        :key="tab.name"
        class="tab-header"
        :class="{'tab-header_active': tab === currentTab}"
        @click="setActiveTab(tab)"
      >
        {{ tab.name }}
      </div>
    </div>
    <TabShip v-if="currentTab.alias === 'ship'"></TabShip>
    <TabTake v-else></TabTake>
  </div>
</template>

<script>
import Mask from '../common/mask.js';
import TabShip from './TabShip.vue';
import TabTake from './TabTake.vue';
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
      },
      {
        name: 'Самовывоз',
        alias: 'take',
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
}
</style>

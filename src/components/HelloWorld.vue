<template>
  <div>
    <div style="display: flex">
      <div class="button">Button 0</div>
      <div class="button button_hover">Button 1</div>
      <div class="button button_active">Button 2</div>
      <div class="button button_disabled">Button 3</div>
    </div>
    <div class="tab-header-row">
      <div v-for="tab in tabs"
           :key="tab.name"
           class="tab-header"
           :class="{'tab-header_active': tab === currentTab}"
           @click="setActiveTab(tab)">
           {{tab.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
  },
  data() {
    const tabs = [
      {
        name: 'tab1'
      },
      {
        name: 'tab2'
      },
      {
        name: 'the tab 32'
      },
      {
        name: 'tab5'
      },
    ];
    return {
      tabs,
      currentTab: tabs[0]
    }
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

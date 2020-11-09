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
    <div style="margin: 20px 50px">
      <KckInput v-model="inputValue"/>
      <KckInput v-model="inputValue" header="Something"/>
      <KckInput v-model="inputValue" header="Something" disabled errorMessage="Sum Ting Wong"/>
      <KckInput v-model="inputValue" header="Something" disabled="true"/>
      <KckInput v-model="inputValue" showError/>
      <KckInput v-model="inputValue" header="Something" errorMessage="Sum Ting Wong" showError="true"/>
    </div>
  </div>
</template>

<script>
import KckInput from "./KckInput.vue";

export default {
  name: "Tabs",
  props: {
  },
  components: {KckInput},
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
      inputValue: "",
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

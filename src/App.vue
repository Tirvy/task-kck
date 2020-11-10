<template>
  <div id="app">
    <main-block></main-block>
  </div>
</template>

<script>
import MainBlock from "./components/MainBlock.vue";

export default {
  name: "App",
  components: {
    MainBlock
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="scss" src="./styles/common-styles.scss"></style>

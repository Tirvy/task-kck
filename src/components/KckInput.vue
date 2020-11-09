<template>
  <div class="kck-input-container">
    <div class="input-header" :class="{disabled: disabled}">
      {{header}}
    </div>
    <input class="input-field" v-bind="$attrs" v-on="$listeners" :class="{error: showError}" :disabled="disabled"/>
    <div class="error-message" :class="{show: showError}">
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
export default {
  name: "KckInput",
  props: {
    header: String,
    errorMessage: {
      type: String,
      default: 'Некорректные данные'
    },
    showError: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab;
    },
    setValue(value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style scoped lang="scss">

.kck-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4px;
  margin-bottom: 4px;
}

.input-header {
  &.disabled {
    color: #b8bed8;
  }
}

.input-field {
  align-self: stretch;
  border: 1px solid #dadef0;
  cursor: pointer;
  padding: 20px 15px;
  margin-top: 7px;
  margin-bottom: 7px;

  &:hover,
  &.hover {
    border-color: #c3c9db;
  }

  &:active,
  &.active,
  &:focus {
    border-color: #8288a2;
  }

  &_error,
  &.error {
    border-color: #ff1e38;
  }

  &_disabled,
  &.disabled,
  &[disabled],
  &[readonly] {
    cursor: default;
    color: #b8bed8;
    background-color: #edeeef;
    border-color: #edeeef;
  }
}

.error-message {
  color: #ff1e38;
  font-size: 14px;

  visibility: hidden;

  &.show {
    visibility: visible;
  }
}

</style>

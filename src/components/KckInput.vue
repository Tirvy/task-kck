<template>
  <div class="kck-input-container" :class="{error: errorMessage}">
    <div class="input-header" :class="{disabled: disabled}">
      {{ header }}
    </div>
    <slot>
      <input class="input-field" v-bind="$attrs" v-on="$listeners" :disabled="disabled" />
    </slot>
    <div class="error-message">
      {{ errorMessage || 'место под ошибку' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'KckInput',
  props: {
    header: String,
    errorMessage: {
      type: String,
      default: '',
    },
    disabled: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    setValue(value) {
      this.$emit('input', value);
    },
  },
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
  border-radius: 3px;
  cursor: pointer;
  padding: 20px 15px;
  margin-top: 7px;
  margin-bottom: 7px;
  resize: none;
  outline: none;

  &:hover,
  &.hover {
    border-color: #c3c9db;
  }

  &:active,
  &.active,
  &:focus {
    border-color: #8288a2;
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
}

.error {
  & .input-field {
    border-color: #ff1e38;
  }

  & .error-message {
    visibility: visible;
  }
}
</style>

<template>
  <div class="kck-radio" @click="emitSelect" :class="{active: value, disabled: disabled}">
    <div class="circle"></div>
    <div class="text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KckRadio',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: Boolean,
    text: String,
  },
  data() {
    return {};
  },
  methods: {
    emitSelect() {
      this.$emit('select', true);
    },
  },
};
</script>

<style scoped lang="scss">
.kck-radio {
  display: flex;
  align-items: center;
  color: #000;
  padding: 8px 0;

  &.disabled {
    color: #b8bed8;

    & .circle {
      background-color: #edeeef;
      border-color: #edeeef;
    }
  }

  &:not(.disabled) {
    cursor: pointer;

    &.active {
      & .circle {
        border-color: #0698db;

        &:after {
          background-color: #0698db;
        }
      }
    }

    &:hover {
      color: #0698db;

      &.circle {
        border-color: #0698db;
      }
    }
  }
}

.circle {
  border: 1px solid #dce0f1;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;

  &:after {
    content: ' ';
    border-radius: 50%;
    width: 6px;
    height: 6px;
  }
}
</style>

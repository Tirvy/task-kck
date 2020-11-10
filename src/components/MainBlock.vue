<template>
  <div class="whole-container">
    <div class="title">
      Выберите способ доставки
    </div>
    <div class="tab-header-row">
      <div v-for="tab in tabsReversed"
            :key="tab.name"
            class="tab-header"
            :class="{'tab-header_active': tab === currentTab}"
            @click="setActiveTab(tab)">
        {{tab.name}}
      </div>
    </div>
    <div class="tab-content tab-content_ship" v-if="currentTab.alias === 'ship'">
      <div class="tab-content__inner">

        <div class="flex-between">
          <KckInput header="ФИО" :errorMessage="errorMessages.name" class="content-field">
            <input class="input-field" v-model="values.name" placeholder="Только кириллица" @blur="touch(name)">
          </KckInput>
          <KckInput header="Телефон" :errorMessage="errorMessages.phone" class="content-field">
            <input class="input-field" v-model="values.phone" @blur="touch(phone)">
          </KckInput>
        </div>
        <KckInput header="Адрес доставки" :errorMessage="errorMessages.address">
          <input class="input-field" v-model="values.address" placeholder="Город, улица, дом" @blur="touch(address)">
        </KckInput>
        <KckInput header="Комментарий">
          <textarea class="input-field" v-model="values.comment" rows="3"></textarea>
        </KckInput>

        <div class="flex-end">
          <div class="button">
            Отправить
          </div>
        </div>

      </div>
    </div>
    <div class="tab-content" v-else>
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
        name: 'Доставка',
        alias: 'ship'
      },
      {
        name: 'Самовывоз',
        alias: 'take'
      },
    ];
    return {
      tabs,
      currentTab: tabs[0],
      values: {
        name: '',
        phone: '',
        address: '',
        comment: '',
      },
      touched: {
        name: false,
        phone: false,
        address: false,
      }
    }
  },
  computed: {
    errorMessages() {
      let ret = {};
      if (this.touched.name && !this.values.name) {
        ret.name = 'Обязательное поле'
      }
      if (this.touched.phone) {
        if (!this.values.phone || this.values.phone.length < 11) {
          ret.name = 'Введите корректный телефон'
        }
      }
      if (this.touched.address) {
        if (!this.values.address) {
          ret.name = 'Обязательное поле'
        }
      }
      return {};
    },
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
    touch(field) {
      this.$set(this.touched, field, true);
    }
  }
};
</script>

<style scoped lang="scss">
.whole-container {
  margin: 0 auto;
  max-width: 1200px;
}

.tab-content {
  &__inner {
    margin: 32px;
  }
}

.content-field {
  flex-grow: 1;
  &:first-child {
    margin-right: 16px;
  }
}
</style>

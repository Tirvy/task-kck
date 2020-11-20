<template>
  <div class="tab-content tab-content_ship" :class="devicePlatform">
    <div class="tab-content__inner">
      <div :class="devicePlatform === 'desktop' ? 'flex-between' : ''">
        <KckInput
          header="ФИО"
          :errorMessage="errorMessages.name"
          class="content-field"
          :class="{margin_right: devicePlatform === 'desktop'}"
        >
          <input
            class="input-field"
            v-model="values.name"
            @input="checkName"
            placeholder="Только кириллица"
            @blur="touch('name')"
          />
        </KckInput>
        <KckInput header="Телефон" :errorMessage="errorMessages.phone" class="content-field">
          <input
            class="input-field"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            v-model="values.phone"
            v-mask
            @blur="touch('phone')"
          />
        </KckInput>
      </div>
      <KckInput header="Адрес доставки" :errorMessage="errorMessages.address">
        <input class="input-field" v-model="values.address" placeholder="Город, улица, дом" @blur="touch('address')" />
      </KckInput>
      <KckInput header="Комментарий" :errorMessage="errorMessages.comment">
        <textarea
          class="input-field"
          v-model="values.comment"
          :rows="devicePlatform === 'desktop' ? 3 : 6"
          @blur="touch('comment')"
        ></textarea>
      </KckInput>

      <div class="flex-end">
        <div class="button" @click="touchAll" :class="{disabled: !this.canSend}">
          Отправить
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KckInput from './KckInput.vue';
import Mask from '../common/mask.js';
import CommonMixin from '@/common/mixin';

export default {
  name: 'TabShip',
  mixins: [CommonMixin],
  components: {KckInput},
  directives: {Mask},
  data() {
    return {
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
      },
    };
  },
  computed: {
    errorMessages() {
      let ret = {};
      if (this.touched.name) {
        const letters = this.values.name.replace(/[\s-]/g, '');
        if (!letters || !letters.length) {
          ret.name = 'Обязательное поле';
        }
      }
      if (this.touched.phone) {
        if (!this.values.phone || this.values.phone.length < 11 || this.values.phone.match(/\d/g).length !== 11) {
          ret.phone = 'Введите корректный телефон';
        }
      }
      if (this.touched.address) {
        if (!this.values.address) {
          ret.address = 'Обязательное поле';
        }
      }
      if (this.touched.comment && !this.values.comment) {
        ret.comment = 'Обязательное поле';
      }
      return ret;
    },
    canSend() {
      return Object.values(this.errorMessages).every(value => !value);
    },
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab;
    },
    touch(key) {
      this.$set(this.touched, key, true);
    },
    touchAll() {
      Object.keys(this.touched).forEach(key => {
        this.$set(this.touched, key, true);
      });
    },
    checkName() {
      let value = /[А-Яа-яЁё -]+/.exec(this.values.name);
      this.$nextTick(() => {
        if (value && value[0]) {
          this.values.name = value[0];
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content-field {
  flex: 1 0;
}
</style>

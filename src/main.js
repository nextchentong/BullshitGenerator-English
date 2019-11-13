import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
  // vue-i18n多语言初始化
  locale: 'en', // 语言标识
  messages: {
    zh: require('./language/zh.js'),
    en: require('./language/en.js')
  }
})
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import VueBus from "vue-bus"
Vue.use(ElementUI)
Vue.use(VueBus)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

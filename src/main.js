import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import '@/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')

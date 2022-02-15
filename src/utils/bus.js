import Vue from 'vue'

const bus = {}

bus.install = Vue => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(bus)

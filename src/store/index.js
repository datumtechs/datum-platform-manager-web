// import Vue from 'vue'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import workflow from './modules/workflow'
import nodes from './modules/nodes'

// import Cookies from 'js-cookie'
// const expiresTime = new Date(new Date().getTime() + 60 * 1000 * 30 )

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    workflow,
    // @ts-ignore
    nodes
  },
  plugins: [
    // createPersistedState({
    //   storage: {
    //     // getItem: key => localStorage.getItem(key),
    //     // setItem: (key, value) => localStorage.setItem(key, value),
    //     // removeItem: key => localStorage.removeItem(key)
    //     getItem: key => Cookies.get(key),
    //     setItem: (key, value) => Cookies.set(key, value, { expires: expiresTime, secure: true }),
    //     removeItem: key => Cookies.remove(key)
    //   }
    // })
  ]
})

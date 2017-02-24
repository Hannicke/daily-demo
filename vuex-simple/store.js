import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  KEY: []
}

export default new Vuex.Store({
  state,
  mutations: {
    METHOD: state => {
      state.KEY = ''
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions } from "./common";
import lanManage from './module/manage';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    lanManage
  }
})

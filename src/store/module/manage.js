/**
 * @author bys
 * @date 2021-03-10 20:05:19
 * @description 模块管理
 */

const state = {
  loading: false,
};

const mutations = {
  updateLoading(state, bool) {
    state.loading = bool;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
};

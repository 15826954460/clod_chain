/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */

const state = {
  isNetError: false,
  isLogined: false,
  token: '',
};

const mutations = {
  setNetError(state, bool) {
    if (state.isNetError === bool) return;
    state.isNetError = bool;
  },

  updateLogin(state, bool) {
    state.isLogined = bool;
  },
  
  updateToken(state, token = "") {
    state.token = token;
  }
};

const actions = {};

export { state, mutations, actions };

/**
 * @author bys
 * @date 2021-03-10 20:05:19
 * @description 模块管理
 */

const state = {
  userInfo: {
    userType: 0, // 1: 超管 2: 管理员 3: 单位管理员 4: 普通用户 5: 代理用户
    username: '',
  },
};

const mutations = {
  updateUserInfo(state, userinfo) {
    const { userInfo } = state;
    state.userInfo = {
      ...userInfo,
      ...userinfo
    }
  },

  clearUpdateInfo() {
    state.userInfo = {};
  }
};


export default {
  namespaced: true,
  state,
  mutations,
};

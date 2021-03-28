/**
 * @author 柏运送 15826954460
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

export default {
  /** 用户模块 */
  user: {
    // -----登陆
    login(params) {
      return postFetch({
        url: "/users/user_login",
        interfaceKey: "login",
        params,
      });
    },

    // -------注册
    register(params) {
      return postFetch({
        url: "/users/register",
        interfaceKey: "register",
        params,
      });
    },

    // -------获取用户信息
    getUserInfo(params) {
      return getFetch({
        url: "/users",
        interfaceKey: "getUserInfo",
        params,
      });
    },

    // -------修改用户信息
    updateUserInfo(params) {
      return postFetch({
        url: "/users",
        interfaceKey: "updateUserInfo",
        params,
        method: "PUT",
      });
    },

    // --------修改密码
    updatePassword(params) {
      return postFetch({
        url: "/users/update_password",
        interfaceKey: "updatePassword",
        params,
        method: "PUT",
      });
    },

    // ------获取用户列表
    getUserList(params) {
      return getFetch({
        url: "/users",
        interfaceKey: "getUserList",
        params,
      });
    },
  },
};

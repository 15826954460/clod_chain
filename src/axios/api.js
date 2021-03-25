/**
 * @author bys
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

export default {
  /** 用户模块 */
  user: {
    login(params) {
      return postFetch({
        url: "/users/user_login",
        interfaceKey: "login",
        params,
      });
    },

    register(params) {
      return postFetch({
        url: "/users/register",
        interfaceKey: "register",
        params,
      }); 
    },

    getUserInfo(params) {
      return getFetch({
        url: "/users",
        interfaceKey: "getUserInfo",
        params,
      });
    },

    updateUserInfo(params) {
      return postFetch({
        url: "/users",
        interfaceKey: "updateUserInfo",
        params,
        method: 'PUT',
      });
    },

    updatePassword(params) {
      return postFetch({
        url: "/update_password",
        interfaceKey: "updatePassword",
        params,
        method: 'PUT',
      })
    }
  },
};

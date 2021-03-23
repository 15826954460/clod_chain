/**
 * @author bys
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

function __createFormData(params = {}) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      formData.append(key, params[key])
    }
  });
  return formData;
}

export default {
  /** 用户模块 */
  user: {
    login(params) {
      return postFetch({
        url: "/users/user_login",
        interfaceKey: "login",
        params: __createFormData(params),
      });
    },

    register(params) {
      return postFetch({
        url: "/users/register",
        interfaceKey: "register",
        params: __createFormData(params),
      }); 
    },

    post() {
      return postFetch({
        url: "/api/projects",
        interfaceKey: "getProjectList",
      });
    },

    upload() {
      return uploadFile({
        url: "/api/projects",
        interfaceKey: "getProjectList",
      });
    },
  },
};

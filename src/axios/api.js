/**
 * @author bys
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

export default {
  /**
   * @description 获取项目列表
   */
  user: {
    get() {
      return getFetch({
        url: "/api/projects",
        interfaceKey: "getProjectList",
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

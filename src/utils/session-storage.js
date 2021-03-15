
/**
 * @author 柏运送
 * @date 2021-03-15 21:56:33
 * @description session 简易封装
*/

export default {
  set(key, data) {
    if (!key || !data) return;
    sessionStorage.setItem(key, JSON.stringify(data));
  },

  get(key) {
    if (!key) return;
    if (sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      return null;
    }
  },

  remove(key) {
    if (!key) return;
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
}
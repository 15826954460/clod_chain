/**
 * @author bys
 * @date 2021-03-10 21:01:14
 * @description i18n 入口组件
 */

import VueI18n from 'vue-i18n';
import Vue from 'vue';
import common from '@/utils/common';

Vue.use(VueI18n); /** VueI18n实例化之前要 调用Vue.use(VueI18n)生成实例 */

const langs = {
  'zh-CN': require('./zh-CN.json'),
}

const lang = common.getQueryString('lang', location.href);
const locale = lang && langs[lang] ? lang : 'zh-CN';

export default new VueI18n({
  locale,
  messages: langs
})

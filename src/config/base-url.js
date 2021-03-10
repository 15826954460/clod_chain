/**
 * @author bys
 * @date 2021-03-10 20:07:59
 * @description url
 */

import { isPro, isTest } from './env';

let baseUrl = '';

if (isTest) {
  // baseUrl = 'https://template-test.wps.com/client-server';
}

if (isPro) {
  // baseUrl = 'https://template.wps.com/client-server';
}

export {
  baseUrl,
};

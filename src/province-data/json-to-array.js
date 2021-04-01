import JsonData from "./area-json.json";

let arr = [];
let index = 0;

function createArr(obj, arr, code, index) {
  const { n, y, c } = obj;
  const item = { 
    value: n,
    label: index < 2 ? n : `${n}区`,
    code,
    abbreviations: y
  };
  if (c) {
    item.children = [];
    getKeyList(c, item.children, index < 2 ? index + 1 : 0);
  }
  arr.push(item);
}

function getKeyList(JsonData, arr, index) {
  const keys = Object.keys(JsonData);
  for (let i = 0; i < keys.length; i++) {
    createArr(JsonData[keys[i]], arr, keys[i], index);
  }
}

function getArrList() {
  getKeyList(JsonData, arr, index);
}

export { getArrList, arr };

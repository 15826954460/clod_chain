<template>
  <a-cascader
    :options="areaList"
    :default-value="value"
    placeholder="请选择地址"
    @change="onChange"
  />
</template>

<script>
import { areaList } from "@/constant/province-data";
export default {
  name: "select-area-com",

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      areaList,
    };
  },

  methods: {
    onChange(value, options) {
      console.log(2222, value);
      this.$emit("change", value || []);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>

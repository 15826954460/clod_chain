<template>
  <div class="test-container">
    <el-amap vid="amapDemo" class="amap"> </el-amap>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped lang="scss">
.test-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;

  .amap {
    width: 100%;
    height: 100%;
    border: 1px solid blue;
  }
}
</style>

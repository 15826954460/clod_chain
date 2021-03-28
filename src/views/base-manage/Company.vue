<template>
  <div class="company-container">company-list</div>
</template>

<script>
import api from "@/axios/api";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
    width: 80,
  },
  {
    title: "单位名称",
    dataIndex: "projectName",
    width: 100,
  },
  {
    title: "单位地址",
    dataIndex: "address"
  },
  {
    title: ""
  }
];

export default {
  name: "company-list-page",
  components: {},

  data() {
    return {
      data: [],
    };
  },

  computed: {},

  created() {
    this.fetchList();
  },

  mounted() {},

  methods: {
    async fetchList() {
      const { code, data } = await api.company.getCompanyList();
      console.log("---------------", data);
      // if (code === 200) {

      // }
    },
  },
};
</script>

<style scoped lang="scss">
</style>

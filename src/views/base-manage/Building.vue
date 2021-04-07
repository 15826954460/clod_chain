<template>
  <div class="buding-container">
    <a-button
      type="primary"
      size="small"
      style="margin-bottom: 10px"
      @click="create"
      >新建</a-button
    >
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
      bordered
      size="small"
      rowKey="id"
    >
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "建筑名称",
    dataIndex: "buildingName",
    width: 150,
  },
  {
    title: "所属单位",
    dataIndex: "projectName",
    width: 150,
  },
   {
    title: "设备数量",
    dataIndex: "deviceNum",
    width: 150,
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "building-page",

  data() {
    return {
      formItemLayout,
      row: {},
      visiable: false,
      data: [],
      columns,
      loading: false,
      form: this.$form.createForm(this),
    };
  },

  components: {},

  created() {},

  mounted() {},

  methods: {
    create() {
      this.visiable = true;
    },
  },
};
</script>

<style lang='scss' scoped>
.buding-container {
  margin-top: 20px;
}
</style>

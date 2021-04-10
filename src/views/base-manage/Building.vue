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
    <CusModule @cancle="cancel" :visible="visible" :width="800">
      <a-form :form="form">
        <a-form-item
          label="名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'buildingName',
              {
                initialValue: row.buildingName || '',
                rules: [{ required: true, message: '请输入名称' }],
              },
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="所属单位"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'projectName',
              {
                initialValue: row.projectName || '',
                rules: [{ required: true, message: '请选择单位' }],
              },
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="设备数量"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'deviceNum',
              {
                initialValue: row.deviceNum || '',
                rules: [{ required: true, message: '请选择单位' }],
              },
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
      </a-form>
    </CusModule>
  </div>
</template>

<script>
import CusModule from "@/components/common/CusModule.vue";

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
      visible: false,
      data: [],
      columns,
      loading: false,
      form: this.$form.createForm(this),
    };
  },

  components: {
    CusModule,
  },

  created() {},

  mounted() {},

  methods: {
    create() {
      this.visiable = true;
    },

    cancel() {
      this.form.resetFields();
      this.row = {};
      this.visible = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.buding-container {
  margin: 20px;
}
</style>

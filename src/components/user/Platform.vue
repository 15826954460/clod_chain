<template>
  <div class="platform-container" id="platformContainer">
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      bordered
      size="small"
      rowKey="id"
    >
      <p slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="edit(record)"
        >
          编辑
        </a-button>
        <a-button type="danger" size="small" @click="del(record)">
          删除</a-button
        >
      </p>
    </a-table>
  </div>
</template>

<script>
import api from "@/axios/api";

import { USER_ROLE_TYPE } from "@/constant";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
    width: 80,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "角色",
    dataIndex: "userType",
    customRender: (val, record, index) => {
      const list = USER_ROLE_TYPE.filter((item) => {
        return item.userType === val;
      });
      return list[0].label;
    },
  },
  {
    title: "电话",
    dataIndex: "phone",
  },
  {
    title: "姓名",
    dataIndex: "trueName",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "plat-form-com",

  props: {
    userType: {
      type: Number,
      required: true,
    },
  },

  watch: {
    userType(newVal, oldVal) {
      this.getUserList();
    },
  },

  components: {},

  data() {
    return {
      data: [],
      columns,
      loading: false,
    };
  },

  created() {
    this.getUserList();
  },

  mounted() {},

  methods: {
    async getUserList() {
      const { code, data } = await api.user.getUserList();
      if (code === 200) {
        const __data = data.filter((item) => {
          return item.userType !== 1;
        });
        this.data = __data;
      }
    },

    edit() {},

    del() {},
  },
};
</script>

<style scoped lang="scss">
#platformContainer {
  /deep/ .ant-table-body {
    margin: 0;
  }
}
</style>

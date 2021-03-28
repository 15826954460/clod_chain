<template>
  <div class="platform-container" id="platformContainer">
    <a-button type="primary" size="small" style="margin-bottom: 10px;" @click="createUser">新建用户</a-button>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :loading="loading"
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

        <a-popconfirm
          :title="`确认删除当前用户${record.trueName}`"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmDel(record)"
          @cancel="cancel"
        >
          <a-button type="danger" size="small"> 删除</a-button>
        </a-popconfirm>
      </p>
    </a-table>
    <CusModule :visible="visible" @cancel="cancel">
      <Register
        :isEdit="true"
        :isEditOther="true"
        :userInfo="row"
        @cancel="cancel"
        @updateList="getUserList"
      ></Register>
    </CusModule>
  </div>
</template>

<script>
import utils from "@/utils/common";
import api from "@/axios/api";
import CusModule from "@/components/common/CusModule.vue";
import Register from "@/components/common/Register.vue";

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
    title: "用户名",
    dataIndex: "username"
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

  components: {
    CusModule,
    Register,
  },

  data() {
    return {
      data: [],
      columns,
      loading: false,
      visible: false,
      row: {},
    };
  },

  created() {
    this.getUserList();
  },

  mounted() {},

  methods: {
    async getUserList() {
      this.loading = true;
      const { code, data, msg } = await api.user.getUserList();
      if (code === 200) {
        const __data = data.filter((item) => {
          return item.userType !== 1;
        });
        this.data = __data;
      } else {
        utils.log(`${msg}-----${code}`);
      }
      this.loading = false;
    },

    async edit(record) {
      const { id } = record;
      if (!id) {
        this.$message("没有获取到用户id");
        return;
      }
      const { code, data, msg } = await api.user.getUserInfo({ id });
      if (code === 200) {
        this.row = data;
        this.visible = true;
      } else {
        this.$message(`error code: ${code} message: ${msg}`);
      }
    },

    async confirmDel({ id }) {
      if (!id) {
        this.$message("没有获取到用户id");
        return;
      }
      const { code } = await api.user.delUser(id);
      if (code === 200) {
        this.getUserList();
      } else {
        this.$message("删除用户失败，请稍后再试");
      }
    },

    createUser() {
      this.row = { userType: this.userType };
      this.visible = true;
    },

    cancel(bool) {
      this.visible = bool;
      if (!bool) {
        this.row = {};
      }
    },
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

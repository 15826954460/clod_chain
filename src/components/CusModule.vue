<template>
  <div class="modele-wrapper">
    <a-modal
      :title="title"
      :visible="visible"
      :okText="okText"
      :cancelText="cancelText"
      :centered="isCenter"
      :closable="isShowClose"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
      :id="isShowFooterBorder ? '' : 'border-none'"
    >
      <slot></slot>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "module-com",

  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    isCenter: {
      type: Boolean,
      default: false,
    },
    isShowClose: {
      type: Boolean,
      default: true,
    },
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    isShowFooterBorder: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      okText: "确认",
      cancelText: "取消"
    };
  },

  computed: {
  },

  components: {},

  created() {},

  mounted() {},

  methods: {
    handleOk() {
      this.$emit("ok");
    },

    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang='scss' scoped>
#border-none {
  /deep/ .ant-modal-footer {
    border: none;
  }
}
</style>

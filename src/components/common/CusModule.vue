<template>
  <div class="modele-wrapper">
    <a-modal
      :title="title"
      :visible="visible"
      :centered="isCenter"
      :closable="isShowClose"
      :maskClosable="false"
      :footer="null"
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

  methods: {
    handleCancel() {
      this.$emit("cancel", false);
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

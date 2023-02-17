<template>
  <el-popover
    placement="bottom"
    :width="width"
    trigger="manual"
    v-model="visible"
    :visible-arrow="false"
    popper-class="filter-bar_popper"
  >
    <div v-clickOutside="hide" class="el-popover_container">
      <slot></slot>
    </div>
    <div slot="reference" :style="positionStyle">&nbsp;</div>
  </el-popover>
</template>

<script>
import clickOutside from "@/common/clickoutside";

export default {
  directives: { clickOutside },

  props: {
    width: {
      type: Number | String,
      default: () => 200,
    },
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },

    positionStyle: {
      type: Object,
      default: () => ({
        position: "absolute",
        top: "0px",
        left: "0px",
      }),
    },
  },

  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="less">
.filter-bar_popper {
  border-radius: 10px;
}
</style>

<style lang="less" scoped>
.el-popover {
  &_container {
    margin: -12px;
    max-height: 400px;
    overflow: auto;
    padding: 10px;
  }
}
</style>

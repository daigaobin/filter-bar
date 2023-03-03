<template>
  <el-popover
    placement="bottom-start"
    trigger="manual"
    v-model="visible"
    :width="width"
    :visible-arrow="false"
    popper-class="filter-bar_popper"
    :popper-options="{ boundariesElement: 'body', removeOnDestroy: true }"
    ref="popover"
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
      type: String | Number,
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
      this.$emit("close");
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="less" scoped>
.el-popover {
  &_container {
    margin: -12px;
    max-height: 300px;
    overflow: hidden;
    padding: 10px;
  }
}
</style>

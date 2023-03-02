<template>
  <div>
    <div class="selected-more" @click="handleClick">
      <slot>
        <i class="el-icon-plus"></i>
        {{ text }}
        <i class="el-icon-caret-bottom"></i>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownButton",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick($event) {
      this.$emit("click", $event);
    },
  },
};
</script>

<style lang="less" scoped>
.selected-more {
  align-items: center;
  background: #f2f3f5;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  height: 28px;
  max-width: 400px;
  outline: 0;
  padding: 0 12px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgb(0 0 0 / 20%);
  }
}
</style>

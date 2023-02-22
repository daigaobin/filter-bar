<!--
 * @Author: 牧鱼
 * @Date: 2023-02-22 15:53:06
 * @LastEditTime: 2023-02-22 15:57:58
 * @LastEditors: 牧鱼
 * @Description: 筛选器radio选择控件
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\options\radio\index.vue
-->
<template>
  <div class="filter-radio-option">
    <header class="filter-radio-option_header">{{ title }}</header>

    <el-radio-group v-model="radio">
      <el-radio :label="l.value" v-for="l in logic" :key="l.value">{{
        l.label
      }}</el-radio>
    </el-radio-group>

    <el-radio-group v-model="radioValue">
      <el-radio :label="3">全部</el-radio>
      <el-radio :label="6">Android</el-radio>
      <el-radio :label="9">iOS</el-radio>
    </el-radio-group>

    <div class="filter-radio-option_footer">
      <el-button @click="cancel" size="mini">取消</el-button>
      <el-button type="primary" @click="add" size="mini" :disabled="isDisabled"
        >应用</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterRadioOption",
  props: {
    logic: {
      type: Array,
      required: true,
      default: () => [],
    },

    title: {
      type: String,
      required: true,
      default: () => "",
    },
  },

  data() {
    return {
      radio: "==",
      radioValue: "",
    };
  },

  computed: {
    isDisabled() {
      return !this.radioValue;
    },
  },

  methods: {
    rowStyle() {
      return "background:#F3F4F7;color:#555";
    },

    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.filter-radio-option {
  &_header {
    line-height: 30px;
    background-color: #d9d9d9;
    margin: -10px -10px 10px -10px;
    padding: 5px 10px;
    color: rgb(28, 30, 33);
    border-radius: 10px 10px 0 0;
  }

  &_select {
    width: 100%;
  }

  &_footer {
    margin-top: 10px;
    text-align: right;
  }

  .m-t-10 {
    margin-top: 10px;
  }
}
</style>

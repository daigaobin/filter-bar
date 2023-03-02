<!--
 * @Author: 牧鱼
 * @Date: 2023-02-15 18:38:24
 * @LastEditTime: 2023-03-02 16:56:21
 * @LastEditors: 牧鱼
 * @Description: 筛选器input输入框控件
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\options\input\index.vue
-->
<template>
  <div class="filter-input-option">
    <header class="filter-input-option_header">{{ title }}</header>

    <el-radio-group v-model="radio">
      <el-radio :label="l.value" v-for="l in logic" :key="l.value">{{
        l.label
      }}</el-radio>
    </el-radio-group>

    <el-input
      v-model="keyword"
      :placeholder="getPlaceholder"
      :maxLength="100"
      size="mini"
      class="m-t-10"
    ></el-input>

    <div class="filter-input-option_footer">
      <el-button @click="handleClickCancel" size="mini">取消</el-button>
      <el-button
        type="primary"
        @click="handleClickApply"
        size="mini"
        :disabled="isDisabled"
        >应用</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterInput",
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },

    logic: {
      type: Array,
      required: true,
      default: () => [],
    },

    logicValue: {
      type: String | Number,
      default: () => "",
    },

    title: {
      type: String,
      required: true,
      default: () => "",
    },

    value: {
      type: String | Number,
      default: () => "",
    },
  },

  data() {
    return {
      radio: this.logicValue,
      keyword: this.value,
    };
  },

  computed: {
    isDisabled() {
      return !this.keyword.trim();
    },

    getPlaceholder() {
      return `请输入${this.title}`;
    },
  },

  watch: {
    visible(val) {
      if (val) {
        this.radio = this.logicValue;
        this.keyword = this.value;
      }
    },

    logicValue(val) {
      this.radio = val;
    },

    value(val) {
      this.keyword = val;
    },
  },

  methods: {
    handleClickApply() {
      const fieldValue = this.keyword.trim();
      const logicLabel = this.logic.find((l) => l.value === this.radio).label;
      this.$emit("apply", {
        fieldLabel: this.title,
        logicLabel,
        logicValue: this.radio,
        fieldValue,
        fieldText: fieldValue,
      });
      this.$emit("update:visible");
    },

    handleClickCancel() {
      this.$emit("cancel");
      this.$emit("update:visible");
    },
  },
};
</script>

<style lang="less" scoped>
.filter-input-option {
  &_header {
    line-height: 30px;
    background-color: #d9d9d9;
    margin: -10px -10px 10px -10px;
    padding: 5px 10px;
    color: rgb(28, 30, 33);
    border-radius: 10px 10px 0 0;
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

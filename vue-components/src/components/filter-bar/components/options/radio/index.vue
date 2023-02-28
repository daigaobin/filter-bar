<!--
 * @Author: 牧鱼
 * @Date: 2023-02-22 15:53:06
 * @LastEditTime: 2023-02-28 18:36:38
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

    <el-radio-group v-model="radioValue" class="block-radio">
      <el-radio :label="s.value" v-for="s in source" :key="s.value">{{
        s.label
      }}</el-radio>
    </el-radio-group>

    <div class="filter-radio-option_footer">
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
  name: "FilterRadioOption",
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

    source: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      radio: this.logicValue,
      radioValue: this.value,
    };
  },

  computed: {
    isDisabled() {
      return !this.radioValue;
    },
  },

  watch: {
    visible(val) {
      if (val) {
        this.radio = this.logicValue;
        this.radioValue = this.value;
      }
    },

    logicValue(val) {
      this.radio = val;
    },

    value(val) {
      this.radioValue = val;
    },
  },

  methods: {
    handleClickApply() {
      const fieldValue = this.radioValue;
      const logicLabel = this.logic.find((l) => l.value === this.radio).label;
      this.$emit("apply", {
        fieldLabel: this.title,
        logicLabel,
        logicValue: this.radio,
        fieldValue,
        fieldText: this.source.find((s) => s.value === this.radioValue).label,
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
.filter-radio-option {
  &_header {
    line-height: 30px;
    background-color: #d9d9d9;
    margin: -10px -10px 10px -10px;
    padding: 5px 10px;
    color: rgb(28, 30, 33);
    border-radius: 10px 10px 0 0;
  }

  .block-radio {
    margin-top: 6px;
    .el-radio {
      display: block;
      padding: 5px 0;
    }
  }

  &_footer {
    margin-top: 10px;
    text-align: right;
  }
}
</style>

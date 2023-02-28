<!--
 * @Author: 牧鱼
 * @Date: 2023-02-15 18:38:24
 * @LastEditTime: 2023-02-28 17:48:09
 * @LastEditors: 牧鱼
 * @Description: 筛选器输入选择控件
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\options\select-input\index.vue
-->
<template>
  <div class="select-input">
    <header class="select-input_header">{{ title }}</header>

    <el-radio-group v-model="radio">
      <el-radio :label="l.value" v-for="l in logic" :key="l.value">{{
        l.label
      }}</el-radio>
    </el-radio-group>

    <el-select
      v-model="keyword"
      filterable
      allow-create
      default-first-option
      :placeholder="getPlaceholder"
      class="m-t-10 select-input_select"
      size="mini"
      @change="handleChange"
    >
      <el-option
        v-for="item in keywordList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <div class="select-input_list">
      <ul>
        <li v-for="(s, $index) in selectedList" :key="`s-${$index}`">
          <span class="label">{{ s }}</span>
          <span class="close"
            ><i class="el-icon-close" @click="del($index)"></i
          ></span>
        </li>
      </ul>
    </div>

    <div class="select-input_footer">
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
  name: "SelectInput",
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },

    logicValue: {
      type: String | Number,
      default: () => "",
    },

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

    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      keyword: "",
      keywordList: [],
      radio: this.logicValue,
      selectedList: [].concat(this.value),
    };
  },

  computed: {
    isDisabled() {
      return !this.selectedList.length;
    },

    getPlaceholder() {
      return `输入编号来选择${this.title}`;
    },
  },

  watch: {
    visible(val) {
      if (val) {
        this.setRadio(this.logicValue);
        this.setSelectedList(this.value);
      }
    },

    logicValue(radio) {
      this.setRadio(radio);
    },

    value(selectedList) {
      this.setSelectedList(selectedList);
    },
  },

  methods: {
    handleClickApply() {
      const fieldValue = this.selectedList;
      const logicLabel = this.logic.find((l) => l.value === this.radio).label;
      this.$emit("apply", {
        fieldLabel: this.title,
        logicLabel,
        logicValue: this.radio,
        fieldValue,
        fieldText: fieldValue.join(","),
      });
      this.$emit("update:visible");
    },

    handleClickCancel() {
      this.$emit("cancel");
      this.$emit("update:visible");
    },

    handleChange(val) {
      this.keyword = "";
      this.add(val);
    },

    add(val) {
      if (!val.trim() || this.isExist(val)) {
        return;
      }
      this.selectedList.push(val);
    },

    del($index) {
      this.selectedList.splice($index, 1);
    },

    isExist(val) {
      return this.selectedList.includes(val);
    },

    setRadio(radio) {
      this.radio = radio;
    },

    setSelectedList(selectedList) {
      this.selectedList = [].concat(selectedList);
    },
  },
};
</script>

<style lang="less" scoped>
.select-input {
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

  &_list {
    margin-top: 10px;
    ul {
      padding: 0;
      margin: 0;
      li {
        display: flex;
        list-style: none;
        .label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .close {
          width: 20px;
          cursor: pointer;
        }
      }
    }
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

<!--
 * @Author: 牧鱼
 * @Date: 2023-02-15 18:38:24
 * @LastEditTime: 2023-02-22 16:09:51
 * @LastEditors: 牧鱼
 * @Description: 筛选器输入选择控件
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\options\select-input\index.vue
-->
<template>
  <div class="equal-not-equal">
    <header class="equal-not-equal_header">{{ title }}</header>

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
      class="m-t-10 equal-not-equal_select"
      size="mini"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-table
      :data="selectedList"
      :header-cell-style="rowStyle"
      class="m-t-10"
      border
      size="mini"
      :max-height="200"
      :show-header="false"
    >
      <el-table-column
        prop="id"
        label="ID"
        header-align="center"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        label="操作"
        width="80"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="equal-not-equal_footer">
      <el-button @click="cancel" size="mini">取消</el-button>
      <el-button type="primary" @click="add" size="mini" :disabled="isDisabled"
        >应用</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "EqualNotEqual",
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
      keyword: "",
      radio: "==",
      options: [],
      selectedList: [],
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

  methods: {
    rowStyle() {
      return "background:#F3F4F7;color:#555";
    },

    handleChange(val) {
      this.keyword = "";
      this.add(val);
    },

    add(val) {
      if (!val.trim() || this.isExist(val)) {
        return;
      }
      this.selectedList.push({
        id: val,
      });
    },

    del($index) {
      this.selectedList.splice($index, 1);
    },

    cancel() {
      this.$emit("cancel");
    },

    isExist(val) {
      return this.selectedList.findIndex((s) => s.id === val) !== -1;
    },
  },
};
</script>

<style lang="less" scoped>
.equal-not-equal {
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

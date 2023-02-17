<!--
 * @Author: 牧鱼
 * @Date: 2023-02-15 18:38:24
 * @LastEditTime: 2023-02-17 15:17:40
 * @LastEditors: 牧鱼
 * @Description: 包含-不包含控件
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\include-exclude\index.vue
-->
<template>
  <div class="include-exclude">
    <header class="include-exclude_header">{{ title }}</header>

    <el-radio-group v-model="radio">
      <el-radio :label="l.value" v-for="l in logic" :key="l.value">{{
        l.label
      }}</el-radio>
    </el-radio-group>

    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
      size="mini"
      class="m-t-10"
      @keyup.enter.native="add"
    ></el-input>

    <!-- <List :data="keywordList"></List> -->
    <!-- <el-table
      :data="keywordList"
      :header-cell-style="rowStyle"
      class="m-t-10"
      border
      size="mini"
      :max-height="200"
    >
      <el-table-column prop="name" label="名称" header-align="center">
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
    </el-table> -->

    <div class="include-exclude_footer">
      <el-button @click="cancel" size="mini">取消</el-button>
      <el-button type="primary" @click="add" size="mini" :disabled="isDisabled"
        >应用</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
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

    value: {
      type: String | Number,
      default: () => "",
    },
  },

  data() {
    return {
      keyword: this.value,
      radio: "include",
      keywordList: [],
    };
  },

  computed: {
    isDisabled() {
      return !this.keyword.trim();
    },
  },

  methods: {
    rowStyle() {
      return "background:#F3F4F7;color:#555";
    },

    add() {
      if (!this.keyword.trim()) {
        return;
      }
      this.keywordList.push({
        name: this.keyword,
      });
      this.keyword = "";
    },

    del($index) {
      this.keywordList.splice($index, 1);
    },

    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.include-exclude {
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

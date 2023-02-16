<!--
 * @Author: 牧鱼
 * @Date: 2023-02-15 18:49:04
 * @LastEditTime: 2023-02-16 14:58:41
 * @LastEditors: 牧鱼
 * @Description: 列表
 * @FilePath: \组件库\vue-components\src\components\filter-bar\components\list\index.vue
-->
<template>
  <div class="content-list" :style="`height: ${height}`">
    <ul v-for="(d, index) in data" :key="`d${index}`">
      <li>
        <span>{{ d }}</span>
        <span><i class="el-icon-close"></i></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },

    height: {
      type: Number,
      default: () => 200,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.content-list {
  overflow: auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>

<template>
  <div id="app">
    <FilterBar></FilterBar>
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <el-table
      :data="[{ name: 'Sdsdsdasaa阿达萨达' }]"
      class="m-t-10"
      border
      size="mini"
      :max-height="200"
    >
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import FilterBar from "./components/filter-bar";

export default {
  name: "App",
  components: {
    // HelloWorld,
    FilterBar,
  },
};
</script>

<style>
html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ccc;
  margin: 10px;
}

</style>

<template>
  <el-card class="custom-column">
    <div slot="header" class="clearfix">
      <span>预设自定义列</span>
      <i class="el-icon-close f-r"></i>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="20">
          <el-input
            prefix-icon="el-icon-search"
            size="small"
            v-model="keyword"
            clearable
          ></el-input>
        </el-col>
        
        <el-col :span="4">
          <el-popover placement="bottom-end" width="200" trigger="click">
            <el-button slot="reference" type="info" plain size="small"
              >···</el-button
            >
          </el-popover>
        </el-col>

        <el-col :span="24">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth"
              >定时任务补偿</el-tab-pane
            >
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "CustomColumn",

  data() {
    return {
      keyword: "",
    };
  },
};
</script>

<style lang="less" scoped>
.f-r {
  float: right;
}

.custom-column {
  ::v-deep .el-card__header {
    padding: 10px 10px;
    font-weight: bold;

    .el-icon-close {
      margin-top: 1px;
      font-weight: bold;
    }
  }

  ::v-deep .el-card__body {
    padding: 10px;
    height: calc(100vh - 130px);
  }
}
</style>

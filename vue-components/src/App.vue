<template>
  <div id="app">
    <FilterBar
      :fieldList="fieldList"
      :saveList="saveList"
      @delete="handleDelete"
      @apply="handleApply"
      class="m-b-10"
    ></FilterBar>

    <el-row>
      <el-col :span="20">
        <el-button class="f-r m-b-10" size="small">自定义列</el-button>
        <el-table :height="200" border>
          <!-- <el-column label="名称"></el-column> -->
        </el-table>
      </el-col>
      <el-col :span="4">
        <!-- <CustomColumn></CustomColumn> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import FilterBar from "./components/filter-bar";
import CustomColumn from "./components/custom-column";

export default {
  name: "App",
  components: {
    // HelloWorld,
    FilterBar,
    CustomColumn,
  },
  data() {
    const LOGIC_EQ_NEQ = [
      {
        label: "等于",
        value: "==",
      },
      {
        label: "不等于",
        value: "!=",
      },
    ];

    const LOGIC_IC_EC = [
      {
        label: "包含",
        value: "include",
      },
      {
        label: "不包含",
        value: "exclude",
      },
    ];

    return {
      fieldList: [
        {
          label: "商主ID",
          key: "business_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
          searchType: ["number"], //过滤类型
          multiple: true, //是否多选
          onlyWindow: true, //使用唯一窗口
        },
        {
          label: "商主名称",
          key: "business_name",
          logic: LOGIC_IC_EC,
          logicValue: "exclude",
          componentId: "InputOption",
          searchType: ["string"],
        },
        {
          label: "供应商ID",
          key: "supplier_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
          searchType: ["number"],
          multiple: true,
          onlyWindow: true,
        },
        {
          label: "供应商名称",
          key: "supplier_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
          searchType: ["string"],
        },
        {
          label: "广告组ID",
          key: "ad_group_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
          searchType: ["number"],
          multiple: true,
          onlyWindow: true,
        },
        {
          label: "广告组名称",
          key: "ad_group_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
          searchType: ["string"],
        },
        {
          label: "广告ID",
          key: "ad_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
          searchType: ["number"],
          multiple: true,
          onlyWindow: true,
        },
        {
          label: "广告名称",
          key: "ad_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
          searchType: ["string"],
        },
        {
          label: "包名",
          key: "package_name",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "InputOption",
          searchType: ["string"],
        },
        {
          label: "应用类型",
          key: "app_type",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "RadioOption",
          source: [
            {
              label: "全部",
              value: 3,
            },
            {
              label: "Android",
              value: 6,
            },
            {
              label: "iOS",
              value: 9,
            },
          ],
          onlyWindow: true,
        },
      ],
      saveList: [
        {
          name: "sxxxxx",
          id: 1232132,
          data: [
            {
              fieldKey: "business_id",
              fieldLabel: "商主ID",
              logicLabel: "等于",
              logicValue: "==",
              fieldValue: ["商主ID", "商主ID2"],
              fieldText: "商主ID,商主ID2",
            },
            {
              fieldKey: "business_name",
              fieldLabel: "商主名称",
              logicLabel: "包含",
              logicValue: "include",
              fieldValue: "商主名称",
              fieldText: "商主名称",
            },
            {
              fieldKey: "app_type",
              fieldLabel: "应用类型",
              logicLabel: "等于",
              logicValue: "==",
              fieldValue: 3,
              fieldText: "全部",
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleDelete(id) {
    },

    handleApply(data) {
    },
  },
};
</script>

<style lang="less" scoped>
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

.f-r {
  float: right;
}

.m-b-10 {
  margin-bottom: 10px;
}
</style>

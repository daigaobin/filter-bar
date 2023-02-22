<template>
  <div class="filter-bar">
    <div class="filter-bar_left">
      <div class="filter-bar_left_content">
        <!-- icon -->
        <div class="filter-bar_left_content_icon m-r-10">
          <slot name="icon">
            <i class="el-icon-search"></i>
          </slot>
        </div>

        <!-- 选中展示 -->
        <div class="filter-bar_left_content_selected">
          <SelectItem
            v-for="(d, $index) in selectedList"
            :fieldLabel="d.fieldLabel"
            :logicLabel="d.logicLabel"
            :fieldText="d.fieldText"
            :key="`d.fieldLabel${$index}`"
            class="m-r-10"
            @del="handleDelSelected($index)"
            @focus.stop="handleFocusSelectedItem($event, d, $index)"
          >
          </SelectItem>

          <MoreButton
            text="2个筛选条件"
            ref="moreButton"
            @click.stop="handleClickMore"
            class="m-r-10"
          >
          </MoreButton>
        </div>

        <!-- 输入 -->
        <el-input
          v-model="search"
          placeholder="搜索和筛选"
          class="w200 m-r-10"
          size="mini"
          ref="input"
          @focus.stop="handleInputFocus"
        ></el-input>
      </div>
      <!-- 清除 -->
      <div class="filter-bar_left_clear">
        <el-button type="text" size="mini">保存</el-button>
        <el-button type="text" size="mini">清除</el-button>
      </div>
    </div>

    <div class="filter-bar_right">
      <slot name="right">
        <el-button size="mini">更新</el-button>
      </slot>
    </div>

    <!-- 筛选指标列表popover -->
    <Popover :visible.sync="visibleList" :positionStyle="fieldListPopoverStyle">
      <div class="el-popover_container_title">近期搜索记录</div>
      <ul class="el-popover_container_list">
        <li
          @click="handleFieldListClick(f)"
          v-for="f in fieldList"
          :key="f.value"
        >
          {{ f.label }}
        </li>
      </ul>
      <div class="el-popover_container_title">已保存的搜索条件</div>
      <ul class="el-popover_container_list">
        <li
          @click="handleFieldListClick(f)"
          v-for="f in fieldList"
          :key="f.value"
        >
          {{ f.label }}
        </li>
      </ul>
      <div class="el-popover_container_title">筛选条件</div>
      <ul class="el-popover_container_list">
        <li
          @click="handleFieldListClick(f)"
          v-for="f in fieldList"
          :key="f.value"
        >
          {{ f.label }}
        </li>
      </ul>
    </Popover>

    <!-- 填写具体filter内容popover -->
    <Popover
      :visible.sync="visibleContent"
      :positionStyle="formPopoverStyle"
      @close="handleClose"
    >
      <component
        :visible.sync="visibleContent"
        :is="componentId"
        :logic="logic"
        :logicValue="logicValue"
        :title="popoverTitle"
        :value="fieldValue"
        @cancel="visibleContent = false"
        @apply="handleApply"
        ref="filterContent"
      ></component>
    </Popover>

    <!-- 更多内容下拉列表 -->
    <Popover
      :visible.sync="moreListVisible"
      width="auto"
      :positionStyle="moreListPopoverStyle"
    >
      <SelectItem
        v-for="(d, index) in selectedList"
        :fieldLabel="d.fieldLabel"
        :logicLabel="d.logicLabel"
        :fieldText="d.fieldText"
        :key="`d.fieldLabel${index}`"
        class="m-b-10"
        @del="handleDelSelected(index)"
        @focus="handleFocusMoreList(d)"
      >
      </SelectItem>
    </Popover>
  </div>
</template>

<script src="./script.js"></script>

<style lang="less" scoped>
.el-popover {
  &_container {
    margin: -12px;
    max-height: 400px;
    overflow: auto;
    padding: 10px;

    &_title {
      font-weight: bold;
      color: rgb(28, 30, 33);
      padding: 0 5px;
    }

    &_list {
      margin: 0;
      list-style: none;
      padding: 0;
      li {
        cursor: pointer;
        padding: 5px;
        color: rgba(0, 0, 0, 0.85);
        &:hover {
          background-color: rgb(243, 244, 247);
          border-radius: 5px;
        }
      }
    }
  }
}

.filter-bar {
  height: 30px;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  margin-top: 100px;
  position: relative;

  &_left {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    &_content {
      flex: 1;
      display: flex;
      justify-content: left;
      align-items: center;

      &_selected {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 12px;
      }
    }

    &_clear {
      width: 100px;
      text-align: left;
    }
  }

  &_right {
    width: 300px;
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .w200 {
    width: 200px;
  }

  .m-r-10 {
    margin-right: 10px;
  }
}

.m-b-10 {
  margin-bottom: 10px;
}
</style>

<style lang="less">
.filter-bar_popper {
  border-radius: 10px;
}
</style>

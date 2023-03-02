<template>
  <el-card class="filter-container">
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
              v-for="(d, $index) in computedSelectedList"
              :fieldLabel="d.fieldLabel"
              :logicLabel="d.logicLabel"
              :fieldText="d.fieldText"
              maxWidth="200px"
              :key="`d.fieldLabel${$index}`"
              class="m-r-10"
              @del="handleDelSelectedItem($index)"
              @focus.stop="handleFocusSelectedItem($event, d, $index)"
              ref="selectedItem"
            >
            </SelectItem>

            <DropDown
              :text="dropDownText"
              ref="moreButton"
              @click.stop="handleClickMore"
              class="m-r-10"
              v-if="isShowMoreButton"
            >
            </DropDown>
          </div>

          <!-- 输入 -->
          <el-input
            v-model="search"
            placeholder="搜索和筛选"
            class="w200 m-r-10"
            maxLength="100"
            size="mini"
            ref="input"
            @focus.stop="handleInputFocus"
            @blur.stop="handleInputBlur"
          ></el-input>
        </div>
        <!-- 清除 -->
        <div class="filter-bar_left_clear">
          <el-button type="text" size="mini" @click="handleClickSave"
            >保 存</el-button
          >
          <el-button type="text" size="mini" @click="handleClickClear"
            >清 除</el-button
          >
        </div>
      </div>

      <div class="filter-bar_right">
        <slot name="right">
          <el-button size="mini">更 新</el-button>
        </slot>
      </div>

      <!-- 筛选指标列表popover -->
      <el-popover
        placement="bottom-start"
        :width="200"
        trigger="manual"
        :visible-arrow="false"
        popper-class="filter-bar_popper"
        :popper-options="{ boundariesElement: 'body', removeOnDestroy: true }"
        ref="fieldPopover"
      >
        <div class="el-popover_container">
          <!-- 已保存 -->
          <template v-if="saveList.length">
            <div class="el-popover_container_title">已保存的搜索条件</div>
            <ul class="el-popover_container_list">
              <li
                @click="handleClickFieldItem(f)"
                v-for="f in saveList"
                :key="f.value"
              >
                <span>{{ f.label }}</span>
                <i class="el-icon-close"></i>
              </li>
            </ul>
          </template>

          <!-- 搜索建议 -->
          <template v-if="computedSearchSuggestList.length">
            <div class="el-popover_container_title">搜索建议</div>
            <ul class="el-popover_container_list">
              <li
                v-for="s in computedSearchSuggestList"
                :key="s.value"
                @click="handleClickSuggestItem(s)"
              >
                <span class="label">{{ s.label }}</span>
                <span class="logic">{{ s.logicLabel }}</span>
                <span class="value">{{ search }}</span>
              </li>
            </ul>
          </template>

          <!-- 筛选条件 -->
          <template v-if="computedFieldList.length">
            <div class="el-popover_container_title">筛选条件</div>
            <ul class="el-popover_container_list">
              <li
                @click="handleClickFieldItem(f)"
                v-for="f in computedFieldList"
                :key="f.value"
              >
                {{ f.label }}
              </li>
            </ul>
          </template>
        </div>
        <div slot="reference" :style="fieldListPopoverStyle">&nbsp;</div>
      </el-popover>

      <!-- 填写具体filter内容popover -->
      <Popover
        :visible.sync="visibleFormPopover"
        :positionStyle="formPopoverStyle"
        @close="handleClose"
        ref="formPopover"
      >
        <component
          :visible.sync="visibleFormPopover"
          :is="componentId"
          :logic="logic"
          :logicValue="logicValue"
          :title="logicLabel"
          :value="fieldValue"
          :source="currentSource"
          @cancel="visibleFormPopover = false"
          @apply="handleApply"
          ref="filterContent"
        ></component>
      </Popover>

      <!-- 更多内容下拉列表 -->
      <Popover
        :visible.sync="visibleMorePopover"
        width="auto"
        :positionStyle="moreListPopoverStyle"
      >
        <SelectItem
          v-for="(d, $index) in computedMoreList"
          :fieldLabel="d.fieldLabel"
          :logicLabel="d.logicLabel"
          :fieldText="d.fieldText"
          :key="`d.fieldLabel${$index}`"
          :class="{ 'm-t-10': !!$index }"
          @del="handleDelMoreItem($index)"
          @focus="handleFocusMoreItem(d, $index)"
        >
        </SelectItem>
      </Popover>
    </div>

    <!-- 保存dialog -->
    <SaveDialog
      :visible.sync="visibleSaveDialog"
      @sure="handleSaveSure"
      ref="saveDialog"
    ></SaveDialog>
  </el-card>
</template>

<script src="./script.js"></script>

<style lang="less" scoped>
.filter-container {
  ::v-deep .el-card__body {
    padding: 0 !important;
  }
}

.el-popover {
  &_container {
    margin: -12px;
    max-height: 320px;
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
        display: flex;
        &:hover {
          background-color: rgb(243, 244, 247);
          border-radius: 5px;
        }

        .label {
        }

        .logic {
          color: #bbb;
          padding: 0 5px;
        }

        .value {
          flex: 1;
          color: #409eff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

.m-t-10 {
  margin-top: 10px;
}
</style>

<style lang="less">
.filter-bar_popper {
  border-radius: 10px;
}
</style>

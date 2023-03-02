import DropDown from "../components/drop-down";
import Popover from "../components/popover";
import SelectItem from "../components/select-item";

import InputOption from "../components/options/input";
import SelectInputOption from "../components/options/select-input";
import RadioOption from "../components/options/radio";
import SaveDialog from "../components/save-dialog";

export default {
  name: "FilterBar",

  components: {
    DropDown,
    Popover,
    SelectItem,
    InputOption,
    SelectInputOption,
    RadioOption,
    SaveDialog,
  },

  props: {
    fieldList: {
      type: Array,
      default: () => [],
    },

    saveList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      componentId: "",
      logic: [],
      logicValue: "",
      logicLabel: "",
      fieldValue: "",
      currentSource: [],
      search: "",
      visibleFormPopover: false,
      fieldListPopoverStyle: {
        position: "absolute",
        top: "0px",
        left: "0px",
      },
      formPopoverStyle: {
        position: "absolute",
        top: "0px",
        left: "0px",
      },
      moreListPopoverStyle: {
        position: "absolute",
        top: "0px",
        left: "0px",
      },
      visibleMorePopover: false,
      selectedList: [],
      maxLength: 1,
      visibleSaveDialog: false,
    };
  },

  computed: {
    computedFieldList() {
      return this.fieldList.filter((f) => f.label.indexOf(this.search) !== -1);
    },

    computedSelectedList() {
      return this.selectedList.slice(0, this.maxLength);
    },

    computedMoreList() {
      return this.selectedList.slice(this.maxLength);
    },

    computedSearchSuggestList() {
      let searchSuggestList = [];
      if (this.search) {
        const type = this.getSearchType();
        searchSuggestList = this.fieldList.filter((f) => {
          if (f.searchType && f.searchType.includes(type)) {
            const logicLabel = f.logic.find(
              (l) => l.value === f.logicValue
            ).label;
            f.logicLabel = logicLabel;
            return f;
          }
        });
      }
      return searchSuggestList;
    },

    isShowMoreButton() {
      return this.selectedList.length > this.maxLength;
    },

    dropDownText() {
      const { length } = this.computedMoreList;
      return `${length}个筛选条件`;
    },
  },

  methods: {
    /**
     * 选中input输入框
     */
    handleInputFocus() {
      this.setPopoverStyle(this.$refs.input.$el, this.fieldListPopoverStyle);
      this.showFieldPopover();
    },

    /**
     * 移出input输入框
     */
    handleInputBlur() {
      this.hideFieldPopover();
    },

    getSearchType() {
      const { length } = this.search;
      const reg = /\D+/;
      /* 长度小于10统一处理为string */
      if (length <= 10 || reg.test(this.search)) {
        return "string";
      }
      return "number";
    },

    /**
     * 应用按钮回调函数
     * @param {*} value
     */
    handleApply(value) {
      this.addOrUpdate(value);
    },

    /**
     * 新增Or更新
     * @param {*} value
     */
    addOrUpdate(value) {
      this.currentSelectedItemIndex !== ""
        ? this.update(value)
        : this.add(value);
    },

    /**
     * 新增同时判断是否存在相同的值
     * @param {*} value
     */
    add(value) {
      if (!this.isExist(value)) {
        this.selectedList.push({
          fieldKey: this.currentKey,
          ...value,
        });
      }
    },

    /**
     * 更新Field
     * @param {*} value
     */
    update(value) {
      const fieldKey =
        this.selectedList[this.currentSelectedItemIndex].fieldKey;
      this.selectedList.splice(this.currentSelectedItemIndex, 1, {
        fieldKey,
        ...value,
      });
    },

    /**
     * 判断是否存在相同的值
     * @param {*} param0
     * @returns
     */
    isExist({ logicValue, fieldValue }) {
      const existList = this.selectedList.filter(
        (s) =>
          s.logicValue === logicValue &&
          s.fieldValue === fieldValue &&
          s.fieldKey === this.currentKey
      );

      return !!existList.length;
    },

    /**
     * 选中已选的Field
     * @param {*} $event
     * @param {*} field
     * @param {*} currentSelectedItemIndex
     */
    handleFocusSelectedItem($event, field, currentSelectedItemIndex) {
      this.setFormPopoverInfo(
        $event.currentTarget,
        field,
        currentSelectedItemIndex
      );
    },

    /**
     * 选中更多下拉列表中的Field
     * @param {*} field
     * @param {*} currentSelectedItemIndex
     */
    handleFocusMoreItem(field, currentSelectedItemIndex) {
      this.setFormPopoverInfo(
        this.$refs.moreButton.$el,
        field,
        currentSelectedItemIndex + this.maxLength
      );
    },

    /**
     * 设置表单内容、位置等
     * @param {*} el
     * @param {*} param1
     * @param {*} currentSelectedItemIndex
     */
    setFormPopoverInfo(
      el,
      { fieldKey, fieldValue, logicValue },
      currentSelectedItemIndex
    ) {
      const logic = this.fieldList.find((f) => f.key === fieldKey);
      this.setFieldValue(fieldValue);
      this.currentSelectedItemIndex = currentSelectedItemIndex;
      this.setPopoverStyle(el, this.formPopoverStyle);
      this.setComponentInfo(Object.assign({}, logic, { logicValue }));
      this.hideMorePopover();
      this.showFormPopover();
    },

    /**
     * 单击更多下拉列表按钮事件
     */
    handleClickMore() {
      this.setPopoverStyle(
        this.$refs.moreButton.$el,
        this.moreListPopoverStyle
      );
      this.hideFormPopover();
      this.showMorePopover();
    },

    /**
     * 设置内容popover位置
     * @param {*} $el
     * @param {*} popoverStyle
     */
    setPopoverStyle($el, popoverStyle) {
      const { width, height, left, top } = $el.getBoundingClientRect();
      popoverStyle.left = left + "px";
      popoverStyle.top = height - 20 + "px";
    },

    /**
     * 单击Field，判断是否唯一窗口
     * onlyWindow：true打开原窗口
     * onlyWindow：false打开新窗口
     * @param {*} field
     */
    handleClickFieldItem(field) {
      const { key: fieldKey, multiple, onlyWindow } = field;
      let fieldValue = [];
      let el = this.$refs.input.$el;
      //判断是否唯一窗口
      if (onlyWindow) {
        const selectedItem = this.selectedList.find(
          (s) => s.fieldKey === fieldKey
        );
        selectedItem && (fieldValue = selectedItem.fieldValue);

        const selectedIndex = this.computedSelectedList.findIndex(
          (s) => s.fieldKey === fieldKey
        );
        if (selectedIndex !== -1) {
          el = this.$refs.selectedItem[selectedIndex].$el;
          this.currentSelectedItemIndex = selectedIndex;
        }

        const moreIndex = this.computedMoreList.findIndex(
          (s) => s.fieldKey === fieldKey
        );
        if (moreIndex !== -1) {
          el = this.$refs.moreButton.$el;
          this.currentSelectedItemIndex = moreIndex + this.maxLength;
        }
      }

      this.setPopoverStyle(el, this.formPopoverStyle);
      this.fieldValue = fieldValue.length ? fieldValue : multiple ? [] : "";
      this.setComponentInfo(field);
      this.showFormPopover();
    },

    /* 单击搜索建议item */
    handleClickSuggestItem(item) {
      const {
        key: fieldKey,
        multiple,
        onlyWindow,
        logicValue,
        logicLabel,
        label: fieldLabel,
      } = item;
      let fieldValue = multiple ? [this.search] : this.search;
      let fieldText = this.search;
      //判断存不存在
      const { field, index } = this.getSelectedItemInfo(fieldKey);
      if (field) {
        if (onlyWindow) {
          this.currentSelectedItemIndex = index;
          fieldValue = multiple
            ? field.fieldValue.concat([this.search])
            : this.search;
          fieldText = multiple ? fieldValue.join(",") : this.search;
        }
      }
      this.addOrUpdate({
        fieldKey,
        fieldLabel,
        logicLabel,
        logicValue,
        fieldValue,
        fieldText,
      });
      this.clearSearch();
    },

    getSelectedItemInfo(fieldKey) {
      const field = this.selectedList.find((s) => s.fieldKey === fieldKey);
      const index = this.selectedList.findIndex((s) => s.fieldKey === fieldKey);
      return { field, index };
    },

    handleDelMoreItem(index) {
      this.selectedList.splice(index + this.maxLength, 1);
      if (!this.isShowMoreButton) {
        this.hideMorePopover();
      }
    },

    handleDelSelectedItem(index) {
      this.selectedList.splice(index, 1);
    },

    setComponentInfo({ logic, componentId, label, logicValue, key, source }) {
      this.logic = logic;
      this.componentId = componentId;
      this.logicLabel = label;
      this.logicValue = logicValue;
      this.currentKey = key;
      this.currentSource = source;
    },

    setFieldValue(fieldValue) {
      this.fieldValue = fieldValue;
    },

    handleClose() {
      this.currentSelectedItemIndex = "";
      this.currentKey = "";
    },

    handleClickSave() {
      if (!this.selectedList.length) {
        this.$message.error("请先添加搜索条件后，再保存");
        return;
      }
      this.visibleSaveDialog = true;
    },

    handleSaveSure({ name }) {
      debugger;
    },

    /**
     * 清空输入框
     */
    clearSearch() {
      this.search = "";
    },

    /**
     * 单击清除按钮事件
     */
    handleClickClear() {
      this.selectedList = [];
    },

    showFieldPopover() {
      this.$refs.fieldPopover.doShow();
    },

    hideFieldPopover() {
      this.$refs.fieldPopover.doClose();
    },

    showFormPopover() {
      this.visibleFormPopover = true;
      this.$nextTick(() => {
        this.$refs.formPopover.$refs.popover.updatePopper();
      });
    },

    hideFormPopover() {
      this.visibleFormPopover = false;
    },

    showMorePopover() {
      this.visibleMorePopover = true;
    },

    hideMorePopover() {
      this.visibleMorePopover = false;
    },
  },
};

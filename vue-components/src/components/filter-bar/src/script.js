import MoreButton from "../components/more-button";
import Popover from "../components/popover";
import SelectItem from "../components/select-item";

import InputOption from "../components/options/input";
import SelectInputOption from "../components/options/select-input";
import RadioOption from "../components/options/radio";
import SaveDialog from "../components/save-dialog";

export default {
  name: "FilterBar",

  components: {
    MoreButton,
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
      visibleList: false,
      visibleContent: false,
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
      contentList: [],
      moreListVisible: false,
      selectedList: [],
      maxLength: 1,
      saveDialogVisible: false,
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
  },

  methods: {
    getSearchType() {
      const { length } = this.search;
      const reg = /\D+/;
      /* 长度小于10统一处理为string */
      if (length <= 10 || reg.test(this.search)) {
        return "string";
      }
      return "number";
    },

    handleApply(value) {
      this.currentSelectedItemIndex !== ""
        ? this.update(value)
        : this.add(value);
    },

    add(value) {
      if (!this.isExist(value)) {
        this.selectedList.push({
          fieldKey: this.currentKey,
          ...value,
        });
      }
    },

    isExist({ logicValue, fieldValue }) {
      const existList = this.selectedList.filter(
        (s) =>
          s.logicValue === logicValue &&
          s.fieldValue === fieldValue &&
          s.fieldKey === this.currentKey
      );

      return !!existList.length;
    },

    update(value) {
      const fieldKey =
        this.selectedList[this.currentSelectedItemIndex].fieldKey;
      this.selectedList.splice(this.currentSelectedItemIndex, 1, {
        fieldKey,
        ...value,
      });
    },

    handleFocusSelectedItem(
      $event,
      { fieldKey, fieldValue, logicValue },
      currentSelectedItemIndex
    ) {
      this.setFormPopoverInfo(
        $event.currentTarget,
        { fieldKey, fieldValue, logicValue },
        currentSelectedItemIndex
      );
    },

    handleFocusMoreItem(
      { fieldKey, fieldValue, logicValue },
      currentSelectedItemIndex
    ) {
      this.setFormPopoverInfo(
        this.$refs.moreButton.$el,
        { fieldKey, fieldValue, logicValue },
        currentSelectedItemIndex + this.maxLength
      );
    },

    setFormPopoverInfo(
      el,
      { fieldKey, fieldValue, logicValue },
      currentSelectedItemIndex
    ) {
      const logic = this.fieldList.find((f) => f.key === fieldKey);
      this.fieldValue = fieldValue;
      this.currentSelectedItemIndex = currentSelectedItemIndex;
      this.setPopoverStyle(el, this.formPopoverStyle);
      this.setComponentInfo(Object.assign({}, logic, { logicValue }));
      this.hideMorePopover();
      this.showFormPopover();
      this.$nextTick(() => {
        this.$refs.formPopover.$refs.popover.updatePopper();
      });
    },

    handleClickMore() {
      this.setPopoverStyle(
        this.$refs.moreButton.$el,
        this.moreListPopoverStyle
      );
      this.showMorePopover();
      this.hideFormPopover();
    },

    handleInputFocus() {
      this.setPopoverStyle(this.$refs.input.$el, this.fieldListPopoverStyle);
      this.showFieldPopover();
    },

    handleInputBlur() {
      this.hideFieldPopover();
    },

    setPopoverStyle($el, popoverStyle) {
      const { width, height, left, top } = $el.getBoundingClientRect();
      popoverStyle.left = left + "px";
      popoverStyle.top = height - 20 + "px";
    },

    showFieldPopover() {
      this.$refs.fieldPopover.doShow();
    },

    hideFieldPopover() {
      this.$refs.fieldPopover.doClose();
    },

    showFormPopover() {
      this.visibleContent = true;
    },

    hideFormPopover() {
      this.visibleContent = false;
    },

    showMorePopover() {
      this.moreListVisible = true;
    },

    hideMorePopover() {
      this.moreListVisible = false;
    },

    /* 单击field item */
    handleClickFieldItem(logic) {
      const { key: fieldKey, multiple, onlyWindow } = logic;
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
      this.setComponentInfo(logic);
      this.showFormPopover();
    },

    /* 单击搜索建议 item */
    handleClickSuggestItem(item) {
      const logicLabel = item.logic.find(
        (l) => l.value === item.logicValue
      ).label;
      this.setComponentInfo(item);
      //判断是否唯一窗口
      this.add({
        fieldKey: item.key,
        fieldLabel: item.label,
        logicLabel,
        logicValue: item.logicValue,
        fieldValue: this.search,
        fieldText: this.search,
      });
      this.clearSearch();
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

    handleClose() {
      this.currentSelectedItemIndex = "";
      this.currentKey = "";
    },

    handleClickClear() {
      this.selectedList = [];
    },

    handleClickSave() {
      if (!this.selectedList.length) {
        this.$message.error("请先添加搜索条件以后再保存");
        return;
      }
      this.saveDialogVisible = true;
    },

    handleSaveSure({ name }) {
      debugger;
    },

    clearSearch() {
      this.search = "";
    },
  },
};

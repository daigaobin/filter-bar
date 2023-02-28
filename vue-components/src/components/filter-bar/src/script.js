import MoreButton from "../components/more-button";
import Popover from "../components/popover";
import SelectItem from "../components/select-item";

import InputOption from "../components/options/input";
import SelectInputOption from "../components/options/select-input";
import RadioOption from "../components/options/radio";

export default {
  name: "FilterBar",

  components: {
    MoreButton,
    Popover,
    SelectItem,
    InputOption,
    SelectInputOption,
    RadioOption,
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
    /* const LOGIC_EQ = [
      {
        label: "等于",
        value: "==",
      },
    ]; */

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
      componentId: "",
      logic: [],
      logicValue: "",
      popoverTitle: "",
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
      /* fieldList: [
        {
          label: "商主ID",
          key: "business_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
        },
        {
          label: "商主名称",
          key: "business_name",
          logic: LOGIC_IC_EC,
          logicValue: "exclude",
          componentId: "InputOption",
        },
        {
          label: "供应商ID",
          key: "supplier_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
        },
        {
          label: "供应商名称",
          key: "supplier_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
        },
        {
          label: "广告组ID",
          key: "ad_group_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
        },
        {
          label: "广告组名称",
          key: "ad_group_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
        },
        {
          label: "广告ID",
          key: "ad_id",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "SelectInputOption",
        },
        {
          label: "广告名称",
          key: "ad_name",
          logic: LOGIC_IC_EC,
          logicValue: "include",
          componentId: "InputOption",
        },
        {
          label: "包名",
          key: "package_name",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "RadioOption",
        },
        {
          label: "应用类型",
          key: "app_type",
          logic: LOGIC_EQ_NEQ,
          logicValue: "==",
          componentId: "RadioOption",
        },
      ], */
      contentList: [],
      moreListVisible: false,
      selectedList: [],
      maxLength: 1,
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
        currentSelectedItemIndex
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
      this.setValue(Object.assign({}, logic, { logicValue }));
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
      this.fieldValue = logic.multiple ? [] : "";
      this.setPopoverStyle(this.$refs.input.$el, this.formPopoverStyle);
      this.setValue(logic);
      this.showFormPopover();
    },

    /* 单机搜索建议 item */
    handleClickSuggestItem(logic) {
      this.setValue(logic);
      this.add(logic.logicValue, this.search);
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

    setValue({ logic, componentId, label, logicValue, key, source }) {
      this.logic = logic;
      this.componentId = componentId;
      this.popoverTitle = label;
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

    handleClickSave() {},

    clearSearch() {
      this.search = "";
    },
  },
};

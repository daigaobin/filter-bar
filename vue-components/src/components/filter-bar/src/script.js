import clickOutside from "@/common/clickoutside";
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

  directives: { clickOutside },

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
      fieldList: [
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
      ],
      contentList: [],
      moreListVisible: false,
      selectedList: [],
      maxLength: 1,
    };
  },

  computed: {
    computedSelectedList() {
      return this.selectedList.slice(0, this.maxLength);
    },

    computedMoreList() {
      return this.selectedList.slice(this.maxLength);
    },

    isShowMoreButton() {
      return this.selectedList.length > this.maxLength;
    },
  },

  methods: {
    handleApply({ logicValue, value: fieldText }) {
      this.currentSelectedItemIndex !== ""
        ? this.update(logicValue, fieldText)
        : this.add(logicValue, fieldText);
    },

    add(logicValue, fieldText) {
      const existList = this.selectedList.filter(
        (s) =>
          s.logicValue === logicValue &&
          s.fieldText === fieldText &&
          s.fieldKey === this.currentKey
      );
      !existList.length &&
        this.selectedList.push({
          ...this.getSelectedItemInfo(this.currentKey, logicValue),
          fieldText,
        });
    },

    update(logicValue, fieldText) {
      const fieldKey =
        this.selectedList[this.currentSelectedItemIndex].fieldKey;
      this.selectedList.splice(this.currentSelectedItemIndex, 1, {
        ...this.getSelectedItemInfo(fieldKey, logicValue),
        fieldText,
      });
    },

    getSelectedItemInfo(fieldKey, logicValue) {
      const { label: fieldLabel, logic } = this.fieldList.find(
        (f) => f.key === fieldKey
      );
      const logicLabel = logic.find((l) => l.value === logicValue).label;
      return {
        fieldLabel,
        logicLabel,
        logicValue,
        fieldKey,
      };
    },

    handleFocusSelectedItem(
      $event,
      { fieldKey, fieldText, logicValue },
      currentSelectedItemIndex
    ) {
      const logic = this.fieldList.find((f) => f.key === fieldKey);
      this.fieldValue = fieldText;
      this.currentSelectedItemIndex = currentSelectedItemIndex;
      this.setPopoverStyle($event.currentTarget, this.formPopoverStyle);
      this.setValue(Object.assign({}, logic, { logicValue }));
      this.hideMorePopover();
      this.showFormPopover();
      this.$nextTick(() => {
        this.$refs.formPopover.$refs.popover.updatePopper();
      });
    },

    handleFocusMoreItem(
      { fieldKey, fieldText, logicValue },
      currentSelectedItemIndex
    ) {
      const logic = this.fieldList.find((f) => f.key === fieldKey);
      this.fieldValue = fieldText;
      this.currentSelectedItemIndex = currentSelectedItemIndex + this.maxLength;
      this.setPopoverStyle(this.$refs.moreButton.$el, this.formPopoverStyle);
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

    handleFieldListClick(logic) {
      this.fieldValue = "";
      this.setPopoverStyle(this.$refs.input.$el, this.formPopoverStyle);
      this.setValue(logic);
      this.showFormPopover();
    },

    handleDelMoreItem(index) {
      this.selectedList.splice(index + this.maxLength, 1);
    },

    handleDelSelectedItem(index) {
      this.selectedList.splice(index, 1);
    },

    setValue({ logic, componentId, label, logicValue, key }) {
      this.logic = logic;
      this.componentId = componentId;
      this.popoverTitle = label;
      this.logicValue = logicValue;
      this.currentKey = key;
    },

    showMorePopover() {
      this.moreListVisible = true;
    },

    hideMorePopover() {
      this.moreListVisible = false;
    },

    handleClose() {
      this.currentSelectedItemIndex = "";
      this.currentKey = "";
    },

    handleClickClear() {
      this.selectedList = [];
    },

    handleClickSave() {},
  },
};

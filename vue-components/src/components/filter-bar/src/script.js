import IncludeExclude from "../components/include-exclude";
import clickOutside from "@/common/clickoutside";
import MoreButton from "../components/more-button";
import Popover from "../components/popover";
import MoreList from "../components/select-content";

export default {
  name: "FilterBar",

  components: { IncludeExclude, MoreButton, Popover, MoreList },

  directives: { clickOutside },

  data() {
    const LOGIC_EQ = [
      {
        label: "等于",
        value: "==",
      },
    ];

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
      popoverTitle: "",
      popoverValue: "",
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
        { label: "商主ID", value: "business_id", logic: LOGIC_EQ_NEQ },
        {
          label: "商主名称",
          value: "business_name",
          logic: LOGIC_IC_EC,
          componentId: "IncludeExclude",
        },
        { label: "供应商ID", value: "supplier_id", logic: LOGIC_EQ_NEQ },
        { label: "供应商名称", value: "supplier_name", logic: LOGIC_IC_EC },
        { label: "广告组ID", value: "ad_group_id", logic: LOGIC_EQ_NEQ },
        { label: "广告组名称", value: "ad_group_name", logic: LOGIC_IC_EC },
        { label: "广告ID", value: "ad_id", logic: LOGIC_EQ_NEQ },
        { label: "广告名称", value: "ad_name", logic: LOGIC_IC_EC },
        { label: "包名", value: "package_name", logic: LOGIC_EQ_NEQ },
        { label: "应用类型", value: "app_type", logic: LOGIC_EQ },
      ],
      contentList: [],
      moreListVisible: false,
      selectedList: [
        {
          label: "商主名称",
          logic: "包含",
          value: "business_name",
          text: "上海头条",
        },
        {
          label: "商主ID",
          logic: "包含",
          value: "business_id",
          text: "上海头条",
        },
        {
          label: "商主ID",
          logic: "包含",
          value: "business_id",
          text: "上海头条",
        },
        {
          label: "商主ID",
          logic: "包含",
          value: "business_id",
          text: "上海头条",
        },
      ],
    };
  },

  methods: {
    handleApply() {},

    handleClickMore() {
      this.setPopoverStyle(
        this.$refs.moreButton.$el,
        this.moreListPopoverStyle
      );
      this.showMoreList();
    },

    handleInputFocus() {
      this.setPopoverStyle(this.$refs.input.$el, this.fieldListPopoverStyle);
      this.showListPopover();
    },

    setPopoverStyle($el, popoverStyle) {
      const { width, height, left, top } = $el.getBoundingClientRect();
      popoverStyle.left = left + width / 2 + "px";
      popoverStyle.top = height - 10 + "px";
    },

    showListPopover() {
      setTimeout(() => {
        this.visibleList = true;
      }, 100);
    },

    hideFieldListPopover() {
      if (!this.$refs.input.$el.contains(document.activeElement)) {
        this.visibleList = false;
      }
    },

    showContentPopover() {
      this.visibleContent = true;
    },

    hideContentPopover() {
      this.visibleContent = false;
    },

    handleFieldListClick(logic) {
      this.hideFieldListPopover();
      this.setPopoverStyle(this.$refs.input.$el, this.formPopoverStyle);
      this.setContentPopoverComponentId(logic);
      this.showContentPopover();
    },

    handleDelSelected(index) {
      debugger;
    },

    handleFocusMoreList({ value, text }) {
      const logic = this.fieldList.find((f) => f.value === value);
      this.popoverValue = text;
      this.hideMoreList();
      this.setPopoverStyle(this.$refs.moreButton.$el, this.formPopoverStyle);
      this.setContentPopoverComponentId(logic);
      this.showContentPopover();
    },

    setContentPopoverComponentId({ logic, componentId, label }) {
      this.logic = logic;
      this.componentId = componentId;
      this.popoverTitle = label;
    },

    showMoreList() {
      this.moreListVisible = true;
    },

    hideMoreList() {
      this.moreListVisible = false;
    },
  },
};

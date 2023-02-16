import IncludeExclude from "../components/include-exclude";
import clickOutside from "@/common/clickoutside";

export default {
  name: "FilterBar",

  components: { IncludeExclude },

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
      search: "",
      visibleList: false,
      visibleContent: false,
      popoverStyle: {
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
    };
  },

  methods: {
    handleApply() {},

    handleInputFocus() {
      const { width, height, left, top } =
        this.$refs.input.$el.getBoundingClientRect();
      this.popoverStyle.left = left + width / 2 + "px";
      this.popoverStyle.top = height - 10 + "px";
      this.$nextTick(() => {
        this.showListPopover();
      });
    },

    showListPopover() {
      setTimeout(() => {
        this.visibleList = true;
      }, 100);
    },

    hideListPopover() {
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
      this.hideListPopover();
      this.showContentPopover();
      this.setComponentId(logic);
    },

    setComponentId({ logic, componentId, label }) {
      this.logic = logic;
      this.componentId = componentId;
      this.popoverTitle = label;
    },
  },
};

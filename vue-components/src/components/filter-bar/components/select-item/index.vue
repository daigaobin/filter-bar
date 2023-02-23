<template>
  <div class="select-container">
    <div class="select-content" @click="handleFocus">
      <span class="select-content_name">{{ fieldLabel }}</span>
      <span class="select-content_logic">{{ logicLabel }}</span>
      <span class="select-content_text">
        {{ fieldText }}
      </span>
    </div>
    <i class="el-icon-close select-close" @click="handleDel"></i>
  </div>
</template>

<script>
export default {
  props: {
    fieldLabel: {
      type: String | Number,
    },
    logicLabel: {
      type: String | Number,
    },
    fieldText: {
      type: String | Number,
    },
  },

  methods: {
    handleDel() {
      this.$emit("del");
    },

    handleFocus($event) {
      this.$emit("focus", $event);
    },
  },
};
</script>

<style lang="less" scoped>
.select-container {
  display: flex;
  align-items: center;
  line-height: 28px;
  cursor: pointer;
  .select-content {
    display: flex;
    padding: 0 8px;
    background-color: #f2f2f2;
    border-radius: 6px 0 0 6px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &_name,
    &_logic {
      margin-right: 5px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }

    &_text {
      margin-right: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.75);
    }
  }

  .select-close {
    padding: 0 8px;
    line-height: 28px;
    background-color: #f2f2f2;
    border-radius: 0 6px 6px 0;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>

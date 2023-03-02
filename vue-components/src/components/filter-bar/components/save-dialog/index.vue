<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="400px"
    class="custom_dialog"
    :before-close="handleBeforeClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          size="small"
          maxlength="40"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="handleCancel" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleSure" size="mini"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "保存搜索条件",
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    const validator = (rule, value, callback) => {
      const { max } = rule;
      if (!value || !value.trim() || value.length > max) {
        callback(rule.message);
      }
      callback();
    };

    return {
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称,长度不超过20个中文字符",
            trigger: "blur",
            validator,
            max: 20,
          },
        ],
      },
    };
  },

  methods: {
    setValue({ name }) {
      this.$nextTick(() => {
        this.ruleForm.name = name;
      });
    },

    handleBeforeClose(done) {
      this.handleCancel();
    },

    handleCancel() {
      this.$refs.ruleForm.resetFields();
      this.$emit("update:visible", false);
    },

    handleSure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("sure", this.ruleForm);
          this.handleCancel();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

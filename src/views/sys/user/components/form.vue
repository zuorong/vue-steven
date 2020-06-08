<template>
  <el-dialog
    title="修改用户"
    :before-close="handleClose"
    :visible.sync="show"
    width="40%"
  >
    <el-form ref="ruleForm" label-width="80px" :model="userModel" :rules="rules">
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="userModel.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="userModel.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="userModel.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机：" prop="mobile">
        <el-input v-model="userModel.mobile" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="角色：" prop="roles">
        <el-select
          v-model="userModel.roles"
          style="width: 100%;"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'UserForm',
  props: {
    show: Boolean
  },
  data() {
    return {
      userModel: {
        name: '',
        password: '',
        email: '',
        mobile: '',
        roles: []
      },
      options: [
        {
          value: 'admin',
          label: '超级管理员'
        },
        {
          value: 'dev',
          label: '开发人员'
        },
        {
          value: 'test',
          label: '测试人员'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.onCancel()
    },
    onCancel() {
      this.$emit('update:show', false)
      this.userModel = {
        name: '',
        password: '',
        email: '',
        mobile: '',
        roles: []
      }
      this.resetForm('ruleForm')
    },
    onConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.userModel)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

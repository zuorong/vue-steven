<template>
  <el-dialog
    :title="identity ? '修改角色' : '新增角色'"
    :before-close="handleClose"
    :visible.sync="show"
    width="40%"
  >
    <el-form ref="ruleForm" label-width="100px" :model="userModel" :rules="rules">
      <el-form-item label="角色名：" prop="name">
        <el-input v-model="userModel.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="userModel.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item v-if="identity" label="菜单权限：">
        <el-tree
          ref="tree"
          :data="menuTree"
          show-checkbox
          node-key="id"
        />
      </el-form-item>
    </el-form>
    <el-button v-if="identity" @click="onTest">get</el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveRoles } from '@/api/user'
export default {
  name: 'UserForm',
  props: {
    show: Boolean,
    onSuccess: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  data() {
    return {
      userModel: {
        name: '',
        remark: '',
        id: ''
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        }
      ],
      rules: {
        name: [
          { required: false, message: '请输入角色名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      identity: false,
      checkedKeys: []
    }
  },
  computed: {
    menuTree() {
      return this.$store.state.user.menuTree
    }
  },
  methods: {
    initTreeData(keys) {
      this.formatTree(this.$store.state.user.roleTree)
      const timer = setTimeout(() => {
        // this.$refs.tree.setCheckedNodes(this.checkedKeys)
        this.$refs.tree.setCheckedKeys(this.checkedKeys)
        clearTimeout(timer)
      })
    },
    formatTree(data) {
      data.forEach(item => {
        if (!item.children) {
          this.checkedKeys.push(item.id)
        }
        item.children && item.children.length && this.formatTree(item.children)
      })
    },
    onTest(d) {
      // console.log(this.$refs.tree.getCheckedNodes())
      console.log(this.$refs.tree.getCheckedKeys())
      // console.log(this.$refs.tree.getHalfCheckedNodes())
      console.log(this.$refs.tree.getHalfCheckedKeys())
    },
    handleClose() {
      this.onCancel()
    },
    onCancel() {
      this.$emit('update:show', false)
      this.userModel = {
        name: '',
        remark: ''
      }
      this.resetForm('ruleForm')
      this.checkedKeys = []
    },
    onConfirm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          if (this.identity) {
            const id = this.userModel.id
            const data = []
            const keys = [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]
            keys.forEach(item => {
              const d = {
                roleId: id,
                menuId: 0
              }
              d.menuId = item
              data.push(d)
            })
            console.log(data)
            await saveRoles(data)
          }
          this.onSuccess()
          this.handleClose()
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

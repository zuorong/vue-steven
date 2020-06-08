<template>
  <el-dialog
    :title="title"
    :before-close="handleClose"
    :visible.sync="show"
    width="40%"
  >
    <el-form ref="ruleForm" label-width="100px" :model="userModel" :rules="rules">
      <el-form-item label="上级菜单：">
        <Treeselect
          v-model="userModel.parentId"
          :options="$store.state.user.menuTree"
          @select="onChangeTree"
        />
      </el-form-item>
      <el-form-item label="菜单类型：">
        <el-radio-group v-model="userModel.menuRadio" @change="onChangeMenuType">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="`${userModel.menuRadio == 0 ? '目录' : userModel.menuRadio == 1 ? '菜单' : '按钮'}名称：`">
        <el-input v-model="userModel.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="userModel.orderNum" :min="0" />
      </el-form-item>
      <template v-if="userModel.menuRadio == 0">
        <el-form-item label="目录地址：">
          <el-input v-model="userModel.dirUrl" placeholder="请输入目录地址" />
        </el-form-item>
      </template>
      <template v-if="userModel.menuRadio == 1">
        <el-form-item label="路由地址：">
          <el-input v-model="userModel.menuUrl" placeholder="请输入路由地址：" />
        </el-form-item>
        <el-form-item label="菜单状态：">
          <el-radio v-model="userModel.menuStatus" label="0">隐藏</el-radio>
          <el-radio v-model="userModel.menuStatus" label="1">显示</el-radio>
        </el-form-item>
      </template>
      <template v-if="userModel.menuRadio != 0">
        <el-form-item label="授权标识：">
          <el-input v-model="userModel.flag" placeholder="请输入授权标识：" />
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onConfirm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { saveMenu } from '@/api/user'
export default {
  name: 'Form',
  components: {
    Treeselect
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      }
    },
    onSuccess: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  data() {
    return {
      title: '新增',
      userModel: this.initUserModel(),
      rules: {},
      options: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa'
            },
            {
              id: 'ab',
              label: 'ab'
            }
          ]
        }
      ],
      identity: false
    }
  },
  methods: {
    initUserModel(payload) {
      let parentId = null
      let menuRadio = 0
      let name = ''
      let orderNum = 0
      let flag = ''
      let menuUrl = ''
      let parentName = ''
      let id = ''
      if (payload) {
        parentId = payload.parentId
        menuRadio = payload.menuRadio
        name = payload.name
        orderNum = payload.orderNum
        flag = payload.flag
        menuUrl = payload.menuUrl
        parentName = payload.parentName
        id = payload.id
      }
      return {
        parentId,
        menuRadio,
        name,
        orderNum,
        flag,
        dirUrl: '', // 目录地址
        menuUrl,
        menuStatus: '1', // 菜单显示隐藏状态
        parentName,
        id
      }
    },
    onChangeMenuType() {
      const userModel = this.userModel
      this.userModel = this.initUserModel()
      this.userModel.menuRadio = userModel.menuRadio
      this.userModel.parentName = userModel.parentName
      this.userModel.parentId = userModel.parentId
      this.userModel.id = userModel.id
      this.$refs['ruleForm'].resetFields()
    },
    setFileds(payload) {
      this.userModel = this.initUserModel(payload)
    },
    handleClose() {
      this.onCancel()
    },
    onCancel() {
      this.$emit('update:show', false)
      this.userModel = this.initUserModel()
      this.$refs['ruleForm'].resetFields()
    },
    async onConfirm(type) {
      const userModel = this.userModel
      const data = {
        type: userModel.menuRadio,
        typeList: ['目录', '菜单', '按钮'],
        name: userModel.name,
        parentId: userModel.parentId,
        parentName: userModel.parentName,
        url: userModel.menuUrl,
        perms: userModel.flag,
        orderNum: userModel.orderNum,
        icon: 'fa',
        iconList: []
      }
      // true：编辑状态，false：新增状态
      if (this.identity) {
        data.id = userModel.id
      } else {
        data.id = 0
      }
      await saveMenu(data)
      this.onSuccess()
      this.handleClose()
    },
    onChangeTree(data) {
      if (data.id * 1 !== 0) {
        this.userModel.parentName = data.label
      }
      this.userModel.parentId = data.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class="app-container">
    <el-form :inline="true" label-width="80px">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机：">
        <el-input placeholder="请输入手机" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      :stripe="true"
      style="width: 100%"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 'auto'"
          :show-overflow-tooltip="true"
        />
      </template>
      <el-table-column
        prop="handle"
        label="操作"
        width="150"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click.native="onEdit(scope)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="onDelete(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <FormComponent
      ref="formRef"
      :show.sync="dialogVisible"
    />
  </div>
</template>

<script>
import FormComponent from './components/form'
// import { checkPermission } from '@/utils/permission'
export default {
  name: 'User',
  components: {
    FormComponent
  },
  data() {
    return {
      tableData: [],
      columns: [],
      dialogVisible: false
    }
  },
  async created() {
    const user = fetch('user.json').then(res => res.json())
    const roles = fetch('roles.json').then(res => res.json())
    const res = await Promise.all([user, roles])
    this.tableData = res[0].data.content
    this.columns = [
      {
        prop: 'id',
        label: 'ID'
      },
      {
        prop: 'name',
        label: '用户名'
      },
      {
        prop: 'roleNames',
        label: '角色'
      },
      {
        prop: 'email',
        label: '邮箱'
      },
      {
        prop: 'mobile',
        label: '手机'
      },
      {
        prop: 'status',
        label: '状态'
      }
    ]
  },
  methods: {
    initUserData(data) {
      return {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        roles: data.roles
      }
    },
    onDelete(scope) {
      console.log(scope)
      this.$confirm('是否删除该数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    onEdit(scope) {
      const formRef = this.$refs.formRef
      const roles = ['dev', 'admin', 'test']
      scope.row.roles = [roles[Math.floor(Math.random() * 3)]]
      formRef.userModel = this.initUserData(scope.row)
      this.dialogVisible = true
    },
    onSearch() {
      console.log('search')
    },
    onAdd() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

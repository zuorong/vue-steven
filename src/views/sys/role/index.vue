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
        prop="createTime"
        label="创建时间"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="handle"
        label="操作"
        width="150"
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
      ref="form"
      :show.sync="visible"
      :on-success="initData"
    />
  </div>
</template>

<script>
import { queryRoles, queryMenu, queryRolesDetail } from '@/api/user'
import { parseTime } from '@/utils'
import FormComponent from './components/form'
export default {
  name: 'Role',
  components: {
    FormComponent
  },
  data() {
    return {
      visible: false,
      tableData: []
    }
  },
  created() {
    this.initData()
    this.columns = [
      {
        prop: 'id',
        label: 'ID',
        width: 50
      },
      {
        prop: 'name',
        label: '角色名称'
      },
      {
        prop: 'remark',
        label: '备注'
      },
      {
        prop: 'createBy',
        label: '创建人'
      }
    ]
  },
  methods: {
    async initData() {
      const res = await Promise.all([queryRoles(), queryMenu()])
      this.tableData = res[0].data.content
      this.$store.commit('user/setMenuTree', this.formatData(res[1].data))
    },
    formatData(data) {
      data.forEach(item => {
        item.label = item.name
        item.children && item.children.length && this.formatData(item.children)
      })
      return data
    },
    parseTime,
    onSearch() {
    },
    onAdd() {
      const form = this.$refs.form
      form.identity = false
      this.visible = true
    },
    async onEdit(scope) {
      const res = await queryRolesDetail(scope.row.id)
      this.$store.commit('user/setRole', this.formatData(this.formatMenu(res.data)))
      const form = this.$refs.form
      form.initTreeData()
      form.identity = true
      form.userModel.id = scope.row.id
      this.visible = true
    },
    formatMenu(data) {
      return data.filter(item => {
        const d = data.filter(list => {
          return item.id === list.parentId
        })
        if (d.length) {
          item.children = d
        }
        return item.parentId * 1 === 0
      })
    },
    onDelete(scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

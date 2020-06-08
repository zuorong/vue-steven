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
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%"
    >
      <el-table-column
        label="名称"
        prop="name"
      />
      <el-table-column
        label="类型"
        prop="type"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" type="success">目录</el-tag>
          <el-tag v-if="scope.row.type === 1" type="warning">菜单</el-tag>
          <el-tag v-if="scope.row.type === 2">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="上级菜单"
        prop="parentName"
      />
      <el-table-column
        label="菜单url"
        prop="url"
      />
      <el-table-column
        label="授权标识"
        prop="perms"
      />
      <el-table-column
        label="排序"
        prop="orderNum"
      />
      <el-table-column
        label="操作"
        prop="operate"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="onEdit(scope)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="onDelete(scope)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <FormComponent
      ref="formRef"
      :on-success="initData"
      :show.sync="isShow"
    />
  </div>
</template>

<script>
import { queryMenu } from '@/api/user'
import FormComponent from './component/form'
export default {
  name: 'Menu',
  components: {
    FormComponent
  },
  data() {
    return {
      tableData: [],
      isShow: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const res = await queryMenu()
      this.tableData = res.data
      const info = {
        id: 0,
        label: '根目录',
        children: [
          ...this.formatterData(JSON.parse(JSON.stringify(res.data)))
        ]
      }
      this.$store.commit('user/setMenuTree', [info])
    },
    formatterData(data) {
      data.forEach(item => {
        item.children && item.children.length === 0 && delete item.children
        item.label = item.name
        item.children && item.children.length && this.formatterData(item.children)
      })
      return data
    },
    onSearch() {
      console.log('search')
    },
    onAdd() {
      const formRef = this.$refs.formRef
      this.isShow = true
      formRef.identity = false // 编辑状态
    },
    onEdit(scope) {
      console.log(scope.row)
      const formRef = this.$refs.formRef
      const row = scope.row
      formRef.setFileds({
        parentId: row.parentId,
        parentName: row.parentName,
        menuRadio: row.level,
        name: row.name,
        orderNum: row.orderNum,
        flag: row.perms,
        menuUrl: row.url,
        id: row.id
      })
      this.isShow = true
      formRef.identity = true // 编辑状态
    },
    onDelete(scope) {
      console.log(scope)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

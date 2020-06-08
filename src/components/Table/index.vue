<template>
  <div class="app-container">
    <el-table
      :data="data"
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
          :fixed="item.fixed ? item.fixed : false"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </template>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

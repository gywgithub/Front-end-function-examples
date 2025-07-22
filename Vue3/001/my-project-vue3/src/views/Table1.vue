<template>
  <div class="about">

    <!-- Ant Design Vue 树形表格 -->
    <a-table :dataSource="treeData" :columns="columns" rowKey="id" :expandable="expandable" :pagination="false"
      bordered />
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { Table } from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// 原始树结构数据
const treeData = ref([
  {
    id: 1,
    name: '111',
    age: 19,
    parentId: 0,
    children: [
      {
        id: 2,
        name: '222',
        age: 18,
        parentId: 1,
        children: [
          { id: 4, name: '444', age: 16, parentId: 2 },
          { id: 5, name: '555', age: 15, parentId: 2 },
          { id: 6, name: '666', age: 14, parentId: 2 }
        ]
      },
      {
        id: 3,
        name: '333',
        age: 17,
        parentId: 1,
        children: [
          { id: 7, name: '777', age: 13, parentId: 3 },
          { id: 8, name: '888', age: 12, parentId: 3 },
          { id: 9, name: '999', age: 11, parentId: 3 }
        ]
      },
      {
        id: 10, 
        name: '1010', 
        age: 10, 
        parentId: 1,
        rows: 3, 
        children: [
          { id: 11, name: '1111', age: 9, parentId: 10 },
          { id: 12, name: '1111', age: 8, parentId: 10 },
          { id: 13, name: '1111', age: 7, parentId: 10 }
        ]
      }
    ]
  }
])

// 表格列定义
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' }
]

// 获取所有节点的 id 作为默认展开的 key
const getAllKeys = (data) => {
  const keys = []
  const traverse = (nodes) => {
    nodes.forEach(node => {
      keys.push(node.id)
      if (node.children?.length > 0) {
        traverse(node.children)
      }
    })
  }
  traverse(treeData.value)
  return keys
}

// 默认展开所有行
const expandedKeys = computed(() => getAllKeys())

// 定义 expandable 配置
const expandable = {
  expandedRowRender: record => h(Table, {
    dataSource: record.children,
    columns: columns,
    pagination: false,
    rowKey: 'id'
  }),
  defaultExpandedRowKeys: expandedKeys.value,
  treeColumnIndex: 0 // 指定第一列作为树形结构展示列
}
</script>

<style scoped>
.about {
  padding: 20px;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
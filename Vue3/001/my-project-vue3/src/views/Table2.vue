<template>
  <div class="about">
    <a-table 
      :dataSource="flattenedData" 
      :columns="columns"
      :pagination="false"
      bordered
      :customRow="() => ({ style: { height: '32px' } })"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 原始树结构数据
const treeData = ref([
  {
    id: 1,
    name: '111',
    age: 19,
    parentId: 0,
    row: 6,
    isBottom: 0,
    children: [
      {
        id: 2,
        name: '222',
        age: 18,
        parentId: 1,
        row: 3,
        isBottom: 0,
        children: [
          { id: 4, name: '444', age: 16, parentId: 2, row: 1, isBottom: 1 },
          { id: 5, name: '555', age: 15, parentId: 2, row: 1, isBottom: 1 },
          { id: 6, name: '666', age: 14, parentId: 2, row: 1, isBottom: 1 }
        ]
      },
      {
        id: 3,
        name: '333',
        age: 17,
        parentId: 1,
        row: 3,
        isBottom: 0,
        children: [
          { id: 7, name: '777', age: 13, parentId: 3, row: 1, isBottom: 1 },
          { id: 8, name: '888', age: 12, parentId: 3, row: 1, isBottom: 1 },
          { id: 9, name: '999', age: 11, parentId: 3, row: 1, isBottom: 1 }
        ]
      }
    ]
  }
])

// 拍平树结构并计算层级与 rowSpan
const flattenTree = (data) => {
  const result = []

  const traverse = (node, level = 0, parentPath = []) => {
    const path = [...parentPath, node.id]
    const depth = path.length - 1

    // 构造当前节点的占位对象
    const flatNode = {
      key: node.id,
      [getLevelKey(depth)]: node.name,
      ...node,
      path: path.slice(0) // 显式拷贝路径
    }

    delete flatNode.children

    // 如果是叶子节点，则添加到结果数组中多次（根据 row 数量）
    if (node.isBottom === 1) {
      for (let i = 0; i < node.row; i++) {
        result.push({
          ...flatNode,
          id: node.id,
          name: node.name,
          age: node.age
        })
      }
    } else {
      result.push(flatNode)
    }

    // 如果有子节点，递归处理
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        traverse(child, depth + 1, path)
      })
    }
  }

  data.forEach(item => traverse(item))

  // 计算每个层级的 rowSpan
  const maxLevel = Math.max(...result.map(item => {
    return item.path ? item.path.length - 1 : 0 // 安全访问 path
  }))

  for (let level = 0; level <= maxLevel; level++) {
    let currentId = null
    let count = 0

    for (let i = 0; i < result.length; i++) {
      const item = result[i]
      const id = item.path ? item.path[level] : null

      if (id === currentId && item[getLevelKey(level)] !== undefined) {
        count++
        result[i][getLevelKey(level)] = null // 空值不显示
      } else {
        if (currentId !== null) {
          // 设置上一个节点的 rowSpan
          for (let j = i - count; j < i; j++) {
            const val = result[j][getLevelKey(level)]
            result[j][getLevelKey(level)] = { value: val, rowSpan: count }
          }
        }
        currentId = id
        count = 1
      }
    }

    // 处理最后一个节点
    if (currentId !== null) {
      for (let j = result.length - count; j < result.length; j++) {
        const val = result[result.length - count][getLevelKey(level)]
        result[j][getLevelKey(level)] = { value: val, rowSpan: count }
      }
    }
  }

  return result
}

const getLevelKey = (level) => `level${level}`

// 生成列配置
const generateColumns = (data) => {
  const maxLevel = Math.max(...data.map(item => item.path.length - 1))
  const columns = []

  for (let level = 0; level <= maxLevel; level++) {
    columns.push({
      title: `Level ${level + 1}`,
      dataIndex: getLevelKey(level),
      customCell: (_, index, column) => {
        const value = data[index]?.[column.dataIndex]
        if (value && typeof value === 'object' && 'rowSpan' in value) {
          return { rowSpan: value.rowSpan }
        }
        return {}
      },
      onCell: (_, record) => {
        const value = record[getLevelKey(level)]
        return {
          style: {
            fontWeight: level === 0 ? 'bold' : 'normal',
            paddingLeft: `${level * 20}px`
          }
        }
      }
    })
  }

  // 添加基础字段列
  columns.push(
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' }
  )

  return columns
}

const flattenedData = ref(flattenTree(treeData.value))
const columns = computed(() => generateColumns(flattenedData.value))
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
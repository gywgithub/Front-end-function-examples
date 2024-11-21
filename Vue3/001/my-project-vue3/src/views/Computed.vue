<template>
  <div>
    <div>Computed</div>
    <p>原始数字： {{ number }}</p>
    <p>平方：{{ squaredNumber }}</p>
    <p>格式化后的数字：{{ formattedNumber }}</p>
    <input v-model="number" type="number" placeholder="输入一个数字">
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'

// 创建响应式数据
const number = ref<number>(5)

// 计算属性：计算平方
const squaredNumber = computed(() => {
  return number.value * number.value
})

// 计算属性：格式化数字
const formattedNumber = computed(() => {
  return number.value.toLocaleString()
})
</script>

<!-- toString 和 toLocaleString 的区别 -->
<!-- toString(): 用于将对象转换为字符串，返回对象的基本字符串表示。
toLocaleString(): 用于将对象转换为字符串，并根据特定的区域设置格式化输出，通常用于数字和日期的本地化表示 -->
<template>
  <div>
    <div>Event</div>
    <button @click="count++">Add 1</button>    
    <p>Count is: {{ count }}</p>

    <button @click="greet">Greet</button>

    <button @click="warn('Form cannot be sumitted yet.', $event)">
      Submit
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)

function greet(event: any) {
  console.log(event.target.tagName)
  console.log(event)
}

function warn(message: string, event: any) {
  if (event) {
    event.preventDefault() // 阻止事件的默认行为
    // 阻止表单提交，阻止连接跳转，阻止其他默认行为
  }
  console.log(message)

  // event.stopPropagation(); // 阻止事件的传播
  // 阻止事件冒泡，防止父元素的事件处理程序被触发
}
</script>

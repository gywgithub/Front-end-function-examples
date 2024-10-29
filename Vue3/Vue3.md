# Vue3

## app.config.globalProperties

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

> 通俗的理解：`app.config.globalProperties` 是 Vue3 中用于注册全局属性的对象

### 使用示例

再 main.ts 中注册全局属性

```js
import { createApp } from 'vue'
const app = createApp(App);

// 注册全局属性
app.config.globalProperties.$myGlobalPropertyMessage = 'GlobalProperty Hello, World!';

app.mount('#app');
```

在 HomeView.vue 中使用全局属性

```js
<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const myGlobalPropertyMessage = instance?.appContext.config.globalProperties.$myGlobalPropertyMessage
</script>

<template>
  <main>
    <div>{{ myGlobalPropertyMessage }}</div>
  </main>
</template>
```

> 如果是 js ，则在组件中使用 this.$myGlobalPropertyMessage 访问

### 官方链接

[https://cn.vuejs.org/api/application#app-config-globalproperties](https://cn.vuejs.org/api/application#app-config-globalproperties)

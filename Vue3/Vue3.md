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

## 响应式基础

### ref()

在组合式API中，推荐使用 `ref()` 函数声明响应式状态

#### TS中使用

```js
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
console.log(count)  // Ref对象
console.log(count.value) // 0
count.value++
console.log(count.value) // 1
</script>
<template>
  <div>{{ count }}</div>
</template>

```

> 注意! 在模板中使用 ref 时，我们不需要附加 `.value`

在事件监听器中改变一个 ref

```js
<button @click="count++">increment</button>
```

#### 为什么要使用ref？

为什么需要使用带有 `.value` 的 ref，而不是普通的变量？为了解释这一点，需要简单讨论一下 Vue 的响应式系统是如何工作的。

当在模板中使用一个 ref，改变这个 ref 的值时，Vue 会自动监测到这个变化，并响应更新 DOM。这是通过一个基于依赖追踪的响应式系统实现的。当一个组件首次渲染时，Vue 会追踪在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会触发追踪它的组件的一次重新渲染。

在标准的 JavaScript 中，监测普通变量的访问或修改时行不通的。然而可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。

该 `.value` 属性给于了 Vue 一个机会监测 ref 何时被访问或修改。在其内部， Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。从概念上讲，可以讲 ref 看做是一个如下对象

```js
// 伪代码
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

另一个 ref 的好处是，与普通变量不同，可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用。

#### 深层响应式

Ref 可以持有任何类型的值，包括深层嵌套的对象、数组、或 JavaScript 内置的数据结构，比如 Map。

Ref 会使它的值具有深层响应式。这意味着即使改变嵌套对象或数组时，变化也会被检测到：

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

非原始值将通过 `reactive()` 转换为响应式代理。

也可以通过 `shallow ref` 来放弃深层响应式。对于浅层 ref，只有 `.value` 的访问会被追踪。浅层 ref 可以用于避免大型数据的响应性开销来优化性能、或有外部库管理其内部状态的情况。

#### DOM更新时机

当修改了响应式状态时，DOM会被自动更新。需要注意的是，DOM更新时不同步的。 Vue 会在 `next tick` 更新周期中缓冲所有状态的修改，以确保不管进行了多少次状态修改，每个组件只会被更新一次。

要等待 DOM 更新后在执行额外的代码，可以使用 `nextTick()` 全局API
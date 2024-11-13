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

```js
async function mutateDeeply() {
  obj.value.nested.count++;
  obj.value.arr.push('baz')
  await nextTick();
}
```

---

### reactive()

另外一种声明响应式状态的方式，使用 `reactive()` API。与将内部值包装在特殊对象中的 ref 不同，`reactive()` 将使对象本身具有响应式：

```js
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({ count: 0 })
</script>
```

在模板中使用

```html
<template>
  <button @click="state.count++">{{ state.count }}</button>
</template>
```

响应式对象是 JavaScript 代理，其行为和普通对象一样。不同的是，Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。

`reactive()` 将深层地转换对象：当访问嵌套对象时，他们也会被 `reactive()` 包装。当 ref 的值是一个对象时， ref() 也会在内部调用它。与浅层 ref 类似，`shallowReactive()` API可以选择退出深层响应性。

#### Reactive Proxy vs. Original

`reactive()` 返回的是一个原始对象的 Proxy，他和原始对象是不相等的：

```js
<script setup lang="ts">
import { reactive } from 'vue'
const raw = {}
const proxy = reactive(raw)

console.log(proxy === raw) // false
</script>
```

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是仅使用你声明对象的代理版本。

为保证访问代理的一致性，对同一个原始对象调用 `reactive()` 会总是返回同样的代理对象，而对一个已存在的代理对象调用 `reactive()` 会返回其本身：

```js
console.log(reactive(raw) === proxy); // true
console.log(reactive(proxy) === proxy); // true
```

这个规则对嵌套对象也适用。依靠深层响应式，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({})
const raw = {}
proxy.nested = raw
console.log(proxy.nested === raw) // false;
```

#### reactive() 的局限性

1.有限的值类型：只能用于对象类型（对象、数组、Map、Set 等）。不能持有如 `string`、`number` 或 `boolean` 这种的原始类型

2.不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着不能轻易“替换”响应式对象，这样的话第一个引用的响应式连接将丢失：

```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// 响应式连接将丢失
state = reative({ count: 1 })
```

3.对解构操作不友好：将响应式对象的原始类型属性解构为本地变量时，或将该属性传递给函数时，将丢失响应式连接：

```js
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
count++

console.log(count) // 1

console.log(state.count) // 0
```

由于这些限制，建议使用 `ref()` 作为申明响应式状态的首选方式。

### 额外的 ref 解包细节

#### 作为 reactive 对象的属性

一个 ref 会作为响应式对象的属性被访问或修改时自动解包。换句话说，它的行为就像一个普通的属性：

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的ref:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1

const otherCount = ref(2)

state.count = otherCount

console.log(state.count) // 2

// 原始 ref 现在已经和 state.count 解绑了
console.log(count.value) // 1
```

只有当嵌套在一个深层响应式对象时，才会发生 ref 解包。当其作为浅层响应式对象的属性被访问时不会解包。

#### 数组和集合的注意事项

与 reactive 对象不同的是，当 ref 作为响应式数组或集合类型（如 Map）中的元素被访问时，它不会解包：

```js
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value) // 'Vue 3 Guide'

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value) // 0

```

#### 在模板中解包的注意事项

在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

在下面例子中， count 和 object 是顶级属性，但 `object.id` 不是:

```js
const count = ref(0)
const object = { id: ref(1) }
```

下面表达式按预期工作

```html
{{ count + 1 }}
```

但是下面表达式不会：

```html
{{ object.id + 1 }}
```

渲染结果是 `[object Object]1`，因为在计算表达式时 `object.id` 没有被解包，仍然是一个 ref 对象。解决这个问题，可以将 id 解构为一个顶级属性：

```js
const { id } = object
```

```template
{{ id + 1 }}
```

现在渲染的结果将是 2。

另一个需要注意的点事，如果 ref 是文本差值的最终计算值（即 `{{}}` 标签），那么它将被解包，因此以下内容将渲染为 `1`:

```template
{{ object.id }}
```

该特性仅仅是文本插值的一个便利特性，等价于 `{{ object.id.value }}`。

##### 为什么在模板渲染的上下文中，只有顶级的 ref 属性才会被解包

在 Vue 的模板渲染上下文中，只有顶级的 ref 属性被解包的原因主要与 Vue 的响应式系统和性能优化有关。以下是一些关键点：

1.性能优化：Vue 的响应式系统通过依赖追踪来优化性能。只有顶级的 ref 属性被解包，可以减少对嵌套属性的监测和更新，从而提高渲染性能。

2.简化依赖追踪：如果嵌套的 ref 属性也被解包，Vue 将需要在每次访问时进行更复杂的依赖追踪。这会增加计算开销，尤其是在深层嵌套的对象中。

3.一致性：在模板中，顶级 ref 的解包行为保持了一致性，使得开发者在使用时更容易理解和预测其行为。嵌套的 ref 属性如果被解包，可能会导致意外的行为和难以调试的问题。

4.避免解构问题：如果嵌套的 ref 属性被解包，可能会导致解构操作时失去响应式连接。通过只解包顶级 ref，可以避免这种情况。

总之，Vue 选择只在模板渲染上下文中解包顶级 ref 属性，是为了优化性能、简化依赖追踪、保持一致性以及避免潜在的解构问题

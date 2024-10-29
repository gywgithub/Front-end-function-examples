# Note

## defineProps

`defineProps` 用于定义组件接收的 props 的宏，允许组件内部声明 props, 并指定 props 的类型，默认值以及是否必需。

主要目的是提高组件的封装性和可维护性。通过在内部声明 props，可以清晰地知道组件需要哪些外部数据，并对这些数据进行类型检查和默认值设置。

## 宏

宏是一种强大的工具，它可以帮助开发者减少重复代码、提高代码的可读性和可维护性，以及实现一些在运行时难以完成的任务

## UnwrapRef

UnwrapRef 是 Vue 3 中的一个类型工具，用于处理响应式引用（ref）时的类型推导。它的主要作用是从一个响应式引用中提取出其原始值的类型。

作用：

1. 类型推导：当你使用 ref 创建一个响应式对象时，UnwrapRef 可以帮助你获取这个响应式对象的原始类型，而不是它的引用类型

2. 简化类型：在 TypeScript 中，使用 UnwrapRef 可以让你在处理响应式数据时，避免手动解包引用，简化代码的类型定义。

```js
import { ref, UnwrapRef } from 'vue';

const myRef = ref({ name: 'John', age: 30 });

// 使用 UnwrapRef 获取原始类型
type MyType = UnwrapRef<typeof myRef>; // { name: string; age: number; }
```

## defineExpose

defineExpose 函数是 Vue 3 中的一个 API，主要用于在组合式 API 中暴露组件的内部方法和属性，以便在父组件中访问。它通常与 setup 函数一起使用，允许开发者控制哪些内部状态或方法可以被外部访问。

功能：

1. 暴露内部 API：通过 defineExpose，你可以选择性地将组件内部的属性和方法暴露给父组件。

2. 增强组件的可重用性：使得组件的内部逻辑可以被外部组件调用，从而提高了组件的灵活性和可重用性。

```js
<script setup>
import { ref, defineExpose } from 'vue';

const count = ref(0);

function increment() {
    count.value++;
}

// 使用 defineExpose 暴露内部方法和属性
defineExpose({
    increment,
    count
});
</script>
```

在这个示例中，increment 方法和 count 属性被暴露给父组件，父组件可以通过引用子组件的实例来调用这些方法或访问这些属性

## router

vue3 中路由的引入方式发生了一些变化，以前是 import VueRouter from 'vue-router'，现在改为 import { useRouter } from 'vue-router'

```js
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>
```

## v-for 和 v-if

当它们同时存在于一个节点上时，v-if 比 v-for 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名

同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显

## Vue侦听响应式数组的变更方法

- push():向数组的末尾添加一个或多个元素，并返回新的长度。会直接修改原始数组
- pop():用于从数组的末尾删除一个元素，并返回被删除的元素。会直接修改原始数组
  - 注意：如果数组为空，pop() 方法将不执行任何操作，返回 undefined
- shift():从数组的开头删除一个元素，并返回被删除的元素。会直接修改原始数组
  - 注意：如果数组为空，shift() 方法将不执行任何操作，返回 undefined
- unshift():向数组的开头添加一个或多个元素，并返回新的长度。会直接修改原始数组
- splice():用于添加、删除或替换数组的元素。会直接修改原始数组
  - 范湖第一个包含被删除的元素的数组，如果没有删除的元素，则返回一个空数组
- sort():对数组进行排序，并返回排序后的数组。会直接修改原始数组
- reverse():将数组中的元素顺序颠倒，并返回颠倒后的数组。会直接修改原始数组

> 小结一下，Vue中的数组响应式变化，Vue都是监听的能够修改原始数组的方法

## toRaw

`toRaw` 是 Vue3 中的一个函数，用于获取响应式对象的原始对象。它返回一个对象，该对象与原始对象具有相同的属性，但所有属性都是非响应式的。因此对其进行的修改不会影响响应式对象

```js
import { reactive, toRaw } from 'vue';

const state = reactive({
    count: 0,
    message: 'Hello, Vue 3!'
});

// 获取原始对象
const rawState = toRaw(state);

console.log(rawState); // { count: 0, message: 'Hello, Vue 3!' }
```

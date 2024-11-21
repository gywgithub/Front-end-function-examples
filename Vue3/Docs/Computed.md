# Vue3

## Computed 计算属性

计算属性是一个非常重要的特性，它允许你基于已有的数据计算出新的值。

推荐使用计算属性来描述依赖响应式状态的复杂逻辑

计算属性返回一个值，它的返回值是响应式的，会根据依赖的响应式数据自动更新

### 示例

```vue
<template>
  <div>
    <div>Computed</div>
    <p>原始数字： {{ number }}</p>
    <p>平方：{{ squaredNumber }}</p>
    <p>格式化后的数字：{{ formattedNumber }}</p>
    <input v-model="number" type="number" placeholder="输入一个数字" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";

// 创建响应式数据
const number = ref<number>(5);

// 计算属性：计算平方
const squaredNumber = computed(() => {
  return number.value * number.value;
});

// 计算属性：格式化数字
const formattedNumber = computed(() => {
  return number.value.toLocaleString();
});

console.log(squaredNumber.value); // 25
</script>

<!-- toString 和 toLocaleString 的区别 -->
<!-- toString(): 用于将对象转换为字符串，返回对象的基本字符串表示。
toLocaleString(): 用于将对象转换为字符串，并根据特定的区域设置格式化输出，通常用于数字和日期的本地化表示 -->
```

`computed()` 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。和其他一般的 ref 类似，可以通过 `squaredNumber.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 `.value`

### 计算属性缓存和方法

将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，不同之处在于计算属性会基于其响应式依赖进行缓存

一个计算属性仅会在其响应式依赖更新时才会重新计算。而方法调用总是会在重渲染发生时再次执行函数

### 可写计算属性

可写计算属性（Writable Computed Properties）是一种特殊的计算属性，它不仅可以计算值，还可以通过设置值来更新相关的响应式状态。这是的可写计算属性非常适合用于处理表单输入或其他需要双向绑定的场景

计算属性默认是只读的。当尝试修改一个计算属性时，会收到一个运行时警告

可写计算属性的创建方式与普通计算属性类似，但需要提供一个 set 方法

#### 示例

```vue
<template>
  <div>
    <div>可写计算属性示例</div>
    <p>原始数字：{{ number2 }}</p>
    <p>平方：{{ squaredNumber2 }}</p>
    <input v-model="squaredNumber2" type="number" placeholder="输入一个数字" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";

const number2 = ref<number>(5);

const squaredNumber2 = computed({
  get() {
    return number2.value * number2.value; // 计算平方
  },
  set(newValue) {
    number2.value = Math.sqrt(newValue); // 更新原始数字
  },
});
</script>
```

### 最佳实践

#### 使用计算属性代替方法

- 计算属性：当需要基于响应式计算一个值时，使用计算属性。计算属性会根据其依赖的响应式数据自动缓存，只有依赖的数据变化时才会重新计算
- 方法：如果在模板中直接调用方法，每次渲染都会执行改方法，可能导致性能问题

#### 避免副作用

计算属性应该是纯函数，不应包含副作用，例如修改数据、发起网络请求等。它的唯一职责是计算并返回一个值

```js
// 不推荐：计算属性中有副作用
const computedValue = computed(() => {
  someReactiveData.value = "new value"; // 这是副作用
  return someValue;
});
```

#### 使用可写计算属性

当需要双向绑定时，使用可写计算属性。它允许在计算属性中定义 get 和 set 方法，从而在更新值时自动更新相关的响应式数据

```js
const squaredNumber = computed({
  get() {
    return number.value * number.value;
  },
  set(newValue) {
    number.value = Math.sqrt(newValue);
  },
});
```

#### 组合计算属性

计算属性可以依赖其他计算属性。通过组合计算属性，可以构建复杂的逻辑，同时保持代码的可读性

```js
const basePrice = ref(100);
const taxRate = ref(0.2);
const tatalPrice = computed(() => {
  return basePrice.value + basePrice.value * taxRate.value;
});
console.log(tatalPrice.value) // 120
```

#### 避免直接修改计算属性

计算属性返回的值时派生状态，可以把它看作一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照，更改快照是没有意义的，因此计算属性的返回值应该被视为制度的，并且永远不应该被修改——应该更新它所依赖的源状态从而触发新的计算

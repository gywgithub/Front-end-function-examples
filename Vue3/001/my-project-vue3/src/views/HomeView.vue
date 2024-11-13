<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { ref, nextTick, reactive } from 'vue'

const object = { id: ref(1) }


const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)

console.log('--1--')

const proxy = reactive({})
const raw = {}
proxy.nested = raw
console.log(1)
console.log(proxy.nested === raw) // false;

const state = reactive({
  count: 0
})

console.log('---')

const state2 = reactive({
  count2: 0
})

let { count2 } = state2

count2++

console.log('count2: ', count2)
console.log('state2.count2: ', state2.count2)

console.log('===')

// const raw = {}
// const proxy = reactive(raw)

// console.log(proxy === raw); // false

// console.log(reactive(raw) === proxy); // true
// console.log(reactive(proxy) === proxy); // true



const instance = getCurrentInstance()
const myGlobalPropertyMessage =
  instance?.appContext.config.globalProperties.$myGlobalPropertyMessage

const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color: green;'
}
let number: number = 1
const message = 'Hello World abc 123 !'
const ok = true
const id = 1

const seen = true
const url = 'https://yiwuan.xyz'

function print(text: string) {
  console.log(text)
}

const atttributeName = 'href'
const eventName = 'click'

const count = ref(0)
console.log(count)  // Ref对象
console.log(count.value) // 0
count.value++
console.log(count.value) // 1

// const count1 = 0
// count1++
// console.log(count1)

function decrement() {
  count.value--
}

const obj = ref({
  nested: {
    count: 0
  },
  arr: ['foo', 'bar']
})

async function mutateDeeply() {
  obj.value.nested.count++;
  obj.value.arr.push('baz')
  await nextTick();
}
</script>

<template>
  <main>
    <!-- <div style="background-color: red;">{{ object.id + 1 }}</div> -->
    <div>
      <button @click="state.count++">{{ state.count }}</button>
      <br>
      <br>
      <button @click="count++">increment</button>
      <br>
      <br>
      <button @click="decrement">decrement</button>
    </div>
    <div>{{ count }}</div>
    
    <div>Hello World</div>
    <div v-bind="objectOfAttrs">11</div>

    <div>{{ number + 1 }}</div>
    <div>{{ ok ? 'YES' : 'NO' }}</div>
    <div>{{ message.split('').reverse().join('') }}</div>
    <div :id="`list-${id}`">1</div>

    <!-- <time :title="toTitleDate(date)" :datetime="date">
      {{ formatDate(date) }}
    </time> -->

    <div>{{ myGlobalPropertyMessage }}</div>

    <p v-if="seen">Now you see me</p>
    <a v-bind:href="url" target="_blank">https://yiwuan.xyz</a><br /><br />
    <a :href="url" target="_blank">https://yiwuan.xyz</a>

    <br>
    <br>
    <input type="button" value="button1" v-on:click="print('button1')" />

    <br>
    <br>
    <a v-bind:[atttributeName]="url">https://yiwuan.xyz</a>
    <br>
    <br>
    <a :[atttributeName]="url">https://yiwuan.xyz</a>

    <br>
    <br>

    <input type="button" value="button2" v-on:[eventName]="print('button2')" />

    <br>
    <br>

    <input type="button" value="button3" @[eventName]="print('button3')" />
  </main>
</template>

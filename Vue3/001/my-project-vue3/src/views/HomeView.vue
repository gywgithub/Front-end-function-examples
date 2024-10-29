<script setup lang="ts">
import { getCurrentInstance } from 'vue'

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
</script>

<template>
  <main>
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

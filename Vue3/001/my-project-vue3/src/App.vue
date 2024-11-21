<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="padding: 20px;">
    <RouterLink to="/">Home</RouterLink> &nbsp;&nbsp;
    <RouterLink to="/about">About</RouterLink> &nbsp; &nbsp;
    <RouterLink to="/form">Form</RouterLink> &nbsp; &nbsp;
    <RouterLink to="/computed">Computed</RouterLink> &nbsp; &nbsp;

    <RouterView />
  </div>
</template>

<style scoped>
</style>

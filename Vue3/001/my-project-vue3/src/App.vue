<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
const router = useRouter()
const routes = ref([])

onMounted(() => {
  routes.value = router.getRoutes().filter(route => route.name && route.path !== '/404')
})
</script>

<template>
  <div>

    <div
      style="position: fixed; top: 10px; left: 10px; right: 20px; z-index: 1000; background-color: #fff; padding: 10px; border-radius: 5px;">
      <template v-for="route in routes" :key="route.path">
        <RouterLink :to="route.path">
          {{ route.name }}
        </RouterLink> &nbsp; &nbsp;
      </template>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

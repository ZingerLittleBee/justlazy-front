<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { GetServers } from './api/serverProperties'

export default defineComponent({
  name: 'App',
  setup() {
    onMounted(async () => {
      const data = await GetServers()
      console.log('data', data)
    })
  }
})
</script>

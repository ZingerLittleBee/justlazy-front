<template>
  <div
    class="
      m-4
      flex
      shadow-xl
      rounded-lg
      bg-white
      flex
      justify-between
      content-center
      px-4
      py-2
      rounded-full
    "
  >
    <el-input v-model="inputValue" />
    <el-button>搜索</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearchBox',
  setup() {
    const inputValue = ref('')
    return {
      inputValue
    }
  }
})
</script>

<style scoped>
::v-deep(.el-input__inner) {
  @apply text-2xl;
  border: none;
}
</style>

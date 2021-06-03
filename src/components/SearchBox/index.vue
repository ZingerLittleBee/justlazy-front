<template>
  <div
    class="
      m-4
      flex
      shadow-md
      bg-white
      flex
      justify-between
      content-center
      pl-1
      pr-4
      py-2
      rounded-full
      focus-within:ring-2
      ring-indigo-300
      space-x-1
    "
  >
    <el-input
      v-model="inputValue"
      size="mini"
      placeholder="search what you want"
    />
    <el-button size="mini" class="focus:ring-2">搜索</el-button>
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
  @apply text-xl;
  border: none;
}
</style>

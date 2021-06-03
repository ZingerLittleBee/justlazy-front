<template>
  <div class="bg-white m-4 flex flex-col shadow-xl rounded-lg">
    <div class="flex justify-between content-center p-2">
      <span
        class="
          bg-clip-text
          text-transparent
          bg-gradient-to-r
          from-green-400
          to-blue-500
          text-2xl
          font-extrabold
        "
      >
        <slot name="title">Server</slot>
      </span>
      <i
        class="
          el-icon-caret-right
          text-4xl
          rounded-full
          bg-gray-200
          hover:bg-gray-400
        "
      ></i>
    </div>
    <div><slot name="detail"></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShowMore'
})
</script>

<style scoped></style>

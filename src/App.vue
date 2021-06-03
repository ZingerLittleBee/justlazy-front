<template>
  <div class="bg-gray-50 flex justify-center items-center flex-col">
    <search-box />
    <show-more class="w-1/2" />
    <shot-chart class="w-1/6" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ShotChart from '@/components/ShotChart/index.vue'
import ShowMore from '@/components/ShowMore/index.vue'
import SearchBox from '@/components/SearchBox/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    ShotChart,
    ShowMore,
    SearchBox
  },
  setup() {
    const isShow = ref(true)
    const handlerClick = () => {
      isShow.value = !isShow.value
    }
    return {
      isShow,
      handlerClick
    }
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

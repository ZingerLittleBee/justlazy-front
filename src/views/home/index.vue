<template>
  <div class="p-4 w-full h-full flex justify-center">
    <draggable
      :list="list"
      :disabled="!enabled"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <transition name="bounce">
          <el-card
            class="box-card"
            :class="[
              { 'not-draggable': !enabled },
              { 'col-span-full': !!element['showMore'] }
            ]"
          >
            <template #header>
              <div
                class="card-header flex flex-row items-center justify-between"
              >
                <div class="space-x-4">
                  <span>Server {{ element.id }}</span>
                  <el-tag>在线</el-tag>
                </div>
                <div class="flex items-center space-x-4">
                  <el-button class="button" type="text">详情</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-arrow-right"
                    @click="handlerShowMore($event, element.id)"
                    class="
                      text-black
                      bg-white
                      rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-600
                    "
                  />
                </div>
              </div>
            </template>
            <detail-box :show-more="!!element['showMore']" />
          </el-card>
        </transition>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable'
import DetailBox from '@/components/DetailBox/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    draggable,
    DetailBox
  },
  display: 'Simple',
  order: 0,
  setup() {
    const handlerShowMore = (e: MouseEvent, id: number) => {
      list.value.forEach(l => {
        l.id === id ? (l['showMore'] = !l['showMore']) : null
      })
    }
    const enabled = ref(true)
    const list = ref<{ name: string; id: number; showMore?: boolean }[]>([
      { name: 'qwe', id: 0 },
      { name: 'asd', id: 1 },
      { name: 'zxc', id: 2 },
      { name: 'rty', id: 3 }
    ])
    const dragging = ref(false)

    return {
      enabled,
      list,
      dragging,
      handlerShowMore
    }
  }
})
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  @apply w-10/12 grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center;
}

.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>

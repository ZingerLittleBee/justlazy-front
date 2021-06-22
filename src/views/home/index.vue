<template>
  <div class="p-2 w-full h-full flex justify-center">
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
          <el-card class="box-card" :class="[{ 'not-draggable': !enabled }]">
            <template #header>
              <div
                class="card-header flex flex-row items-center justify-between"
              >
                <div class="space-x-4">
                  <span>Server {{ element.id }}</span>
                  <n-tag type="success">在线</n-tag>
                  <span>KVM</span>
                </div>
                <div class="flex items-center space-x-4">
                  <el-button class="button" type="text">详情</el-button>
                  <el-button
                    type="text"
                    :icon="
                      element.showMore
                        ? 'el-icon-arrow-left'
                        : 'el-icon-arrow-right'
                    "
                    @click="handlerShowMore($event, element.id)"
                    class="home__header--icon"
                  />
                </div>
              </div>
            </template>
            <detail-box
              :data="socketData[element.id]"
              :show-more="!!element['showMore']"
            />
          </el-card>
        </transition>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { NTag } from 'naive-ui'
import draggable from 'vuedraggable/src/vuedraggable'
import DetailBox from '@/components/DetailBox/index.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    NTag,
    draggable,
    DetailBox
  },
  display: 'Simple',
  order: 0,
  setup() {
    const store = useStore()
    const socket = computed(() => store.getters.getSocket)
    const socketData = computed(() => store.getters.getServerData)
    onMounted(async () => {
      await store.dispatch('initSocket', {
        url: 'http://localhost:9527/servers',
        opts: { auth: { token: '123' } }
      })
    })
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
      socketData,
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
::v-deep(.el-card__header) {
  padding: 6px 15px;
}
::v-deep(.el-card__body) {
  padding: 5px 5px 10px;
}
.list-group {
  @apply w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center;
}

::v-deep(.home__header--icon) {
  @apply w-6 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-gray-200 hover:bg-gray-200;
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

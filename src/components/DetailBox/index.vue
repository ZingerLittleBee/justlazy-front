<template>
  <div
    class="detail-box-wrapper space-y-4"
    :class="`grid-cols-${showMore ? '2' : '1'}`"
  >
    <div class="detail-box__header">
      <shot-chart />
      <shot-chart
        :chartData="[60, 40]"
        :chartColor="['Indigo', '#c17777']"
        :chartConfig="{ name: '流量' }"
      />
      <shot-chart
        :chartData="[40, 20]"
        :chartColor="['gray', 'purple']"
        :chartConfig="{ name: '磁盘' }"
      />
    </div>
    <div v-if="showMore" class="detail-box__content">
      <span><el-tag type="warning">负载</el-tag>88%</span>
      <span><el-tag type="success">磁盘</el-tag>50G / 100G</span>
      <span><el-tag>流量</el-tag>1000MB</span>
      <span>磁盘：100M/S</span>
      <span>磁盘：100M/S</span>
      <span>磁盘：100M/S</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ShotChart from '@/components/ShotChart/index.vue'

export default defineComponent({
  name: 'DetailBox',
  components: {
    ShotChart
  },
  props: {
    showMore: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-box-wrapper {
  @apply grid gap-4 justify-center;
  .detail-box__header {
    @apply grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center;
  }
  .detail-box__content {
    @apply grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center;
  }
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

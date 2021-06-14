<template>
  <n-el>
    <n-progress
      type="multiple-circle"
      :stroke-width="10"
      :circle-gap="0.8"
      :percentage="[
        percentage,
        (percentage + 10) % 100,
        (percentage + 30) % 100
      ]"
      :color="[
        judgeColor(percentage),
        judgeColor(percentage + 10),
        judgeColor(percentage + 30)
      ]"
    />
    <n-progress
      type="circle"
      :stroke-width="10"
      :percentage="percentage"
    />
  </n-el>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UsageRing',
  setup() {
    const percentage = ref(30)

    //
    const judgeColor = (per: number) => {
      if (per > 90) {
        return 'var(--error-color)'
      }
      if (per >= 70) {
        return 'var(--warning-color)'
      }
      return 'var(--info-color)'
    }
    const add = () => {
      percentage.value += 10
    }
    const minus = () => {
      percentage.value -= 10
    }

    return {
      percentage,
      judgeColor,
      minus,
      add
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.n-progress--multiple-circle) {
  width: 100px !important;
}
::v-deep(.n-progress--circle) {
  width: 100px !important;
}
::v-deep(.n-progress-text) {
  font-size: 20px !important;
}
</style>

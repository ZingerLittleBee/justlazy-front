<template>
  <v-chart class="chart" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ShotChart',
  setup: () => {
    const option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 12
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
            {
              value: 80,
              name: 'CPU',
              title: {
                offsetCenter: ['0%', '120%']
              },
              detail: {
                offsetCenter: ['0%', '0%']
              }
            }
          ],
          detail: {
            width: 25,
            height: 15,
            fontSize: 15,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: '{value}%'
          }
        }
      ]
    }
    const optionRef = ref(option)
    return { option: optionRef }
  }
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>

<template>
  <v-chart :style="{ height }" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

interface ChartConfig {
  name?: string
  unit?: string
}

export default defineComponent({
  name: 'ShotChart',
  props: {
    height: {
      type: String,
      default: () => '140px'
    },
    chartData: {
      type: Array as PropType<number[]>,
      default: () => [80, 40]
    },
    chartColor: {
      type: Array as PropType<string[]>,
      default: () => ['#5370C6', '#91CC74']
    },
    chartConfig: {
      type: Object as PropType<ChartConfig>,
      default: () => {
        return { name: 'CPU/RAM', unit: '%' }
      }
    }
  },
  setup: props => {
    const option = ref({
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
            clip: false
          },
          axisLine: {
            lineStyle: {
              width: 15
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
              value: props.chartData[0],
              name: props.chartConfig.name ? props.chartConfig.name : 'CPU/RAM',
              title: {
                offsetCenter: ['0%', '120%']
              },
              detail: {
                offsetCenter: ['0%', '-25%'],
                formatter: `{value}${
                  props.chartConfig.unit ? props.chartConfig.unit : '%'
                }↑`
              },
              itemStyle: {
                color: props.chartColor[0]
              }
            },
            {
              value: props.chartData[1],
              detail: {
                offsetCenter: ['0%', '25%'],
                formatter: `{value}${
                  props.chartConfig.unit ? props.chartConfig.unit : '%'
                }↓`
              },
              itemStyle: {
                color: props.chartColor[1]
              }
            }
          ],
          detail: {
            width: 24,
            height: 10,
            fontSize: 10,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1
          }
        }
      ]
    })
    const optionRef = ref(option)
    return { option: optionRef }
  }
})
</script>

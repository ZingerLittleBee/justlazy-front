<template>
  <v-chart :style="{ height }" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GaugeChart',
  props: {
    height: {
      type: String,
      default: () => '140px'
    },
    title: {
      type: String
    },
    data: {
      type: Object
    },
    axisLineWidth: {
      type: Number,
      default: () => 10
    },
    // 数据是否在同一条进度条上
    overlap: {
      type: Boolean,
      default: () => true
    }
  },
  setup(props) {
    const option = ref({
      title: {
        show: true,
        text: props.title,
        left: '45%',
        top: '85%',
        textAlign: 'center',
        textStyle: {
          fontSize: 14
        }
      },
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
            roundCap: true,
            overlap: props.overlap
          },
          axisLine: {
            lineStyle: {
              width: props.axisLineWidth
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: props.data,
          detail: {
            width: 30,
            height: 12,
            lineHeight: 12,
            fontSize: 12,
            color: 'inherit',
            borderColor: 'inherit',
            borderRadius: 20,
            borderWidth: 1,
            rich: {
              unitStyle: {
                fontSize: 8,
                verticalAlign: 'bottom',
                color: '#6B7280'
              }
            },
            formatter: '12321'
          }
        }
      ]
    })
    const optionRef = ref(option)
    return { option: optionRef }
  }
})
</script>

<template>
  <div
    class="detail-box-wrapper space-y-4"
    :class="`grid-cols-${showMore ? '1' : '1'}`"
  >
    <div v-if="!showMore" class="detail-box__header">
      <gauge-chart title="CPU" :data="cpuChartData" />
      <pie-chart title="RAM" :data="ramChartData" />
      <gauge-chart
        title="NET"
        :overlap="false"
        :axisLineWidth="15"
        :data="networkChartData"
      />
      <gauge-chart title="IO" :data="ioChartData" />
    </div>
    <!--    TODO 字段待确定-->
    <div v-if="showMore" class="detail-box__content">
      <span><n-tag type="warning">负载</n-tag>88%</span>
      <span><n-tag type="success">磁盘</n-tag>50G/100G</span>
      <span><n-tag type="info">流量</n-tag>1000MB</span>
      <span><n-tag type="success">磁盘</n-tag>100M/S</span>
      <span><n-tag type="success">时长</n-tag>100h</span>
      <span><n-tag type="success">用户</n-tag>1</span>
    </div>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref, toRefs, watchEffect } from 'vue'
import { NTag } from 'naive-ui'
import GaugeChart from '@/components/charts/GaugeChart/index.vue'
import PieChart from '@/components/charts/PieChart/index.vue'

export default defineComponent({
  name: 'DetailBox',
  components: {
    NTag,
    GaugeChart,
    PieChart
  },
  props: {
    data: {
      type: Object
    },
    showMore: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const cpuChartData = [
      {
        value: ref(0),
        detail: {
          offsetCenter: ['0%', '0%'],
          formatter: '{value}%',
          itemStyle: {
            // color: props.chartColor[0]
          }
        }
      }
    ]

    const ramChartData = ref([
      { value: 0, name: '已使用' },
      { value: 0, name: '已缓存' },
      { value: 0, name: '未使用' }
    ])

    const networkChartData = ref([
      {
        value: 0,
        detail: {
          offsetCenter: ['0', '-25%'],
          borderWidth: 0,
          formatter: (value: number) => {
            if (value > 1000) {
              return `${(value / 1024).toFixed(0)}{unitStyle|Mb/s}↑`
            }
            return `${value.toFixed(0)}{unitStyle|Kb/s}↑`
          }
        }
      },
      {
        value: 0,
        detail: {
          offsetCenter: ['0', '25%'],
          borderWidth: 0,
          formatter: (value: number) => {
            if (value > 1000) {
              return `${(value / 1024).toFixed(0)}{unitStyle|Mb/s}↓`
            }
            return `${value.toFixed(0)}{unitStyle|Kb/s}↓`
          }
        }
      }
    ])

    const ioChartData = ref([
      {
        value: 20,
        detail: {
          offsetCenter: ['0', '-25%'],
          formatter: `{value}{unitStyle|Kb/s}↓`,
          borderWidth: 0
        }
      },
      {
        value: 40,
        detail: {
          offsetCenter: ['0', '25%'],
          formatter: `{value}{unitStyle|Kb/s}↑`,
          borderWidth: 0
        }
      }
    ])

    watchEffect(() => {
      cpuChartData[0].value.value = props.data?.CPU.used
      ramChartData.value[0].value = props.data?.RAM.used
      ramChartData.value[1].value = props.data?.RAM.cache
      ramChartData.value[2].value = props.data?.RAM.free
      networkChartData.value[0].value = (props.data?.NET.tx / 1024) * 8
      networkChartData.value[1].value = (props.data?.NET.rx / 1024) * 8
      ioChartData.value[0].value = props.data?.ROM.read
      ioChartData.value[1].value = props.data?.ROM.write
    })

    // setInterval(() => {
    //   cpuChartData.value[0].value = ~~(Math.random() * 100)
    //   ramChartData.value.forEach(r => (r.value = ~~(Math.random() * 100)))
    //   networkChartData.value.forEach(n => (n.value = ~~(Math.random() * 100)))
    //   ioChartData.value.forEach(i => (i.value = ~~(Math.random() * 100)))
    // }, 2000)

    return {
      cpuChartData,
      ramChartData,
      networkChartData,
      ioChartData
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-box-wrapper {
  @apply grid gap-4 justify-center;
  .detail-box__header {
    @apply grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center;
  }
  .detail-box__content {
    @apply grid grid-rows-2 gap-4 justify-start;
  }
}
</style>

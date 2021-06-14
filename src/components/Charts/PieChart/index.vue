<template>
  <v-chart :style="{ height }" :option="option" :autoresize="true" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PieChart',
  props: {
    height: {
      type: String,
      default: () => '140px'
    },
    data: {
      type: Object
    }
  },
  setup(props) {
    const option = ref({
      title: {
        show: true,
        text: 'RAM',
        left: '45%',
        top: '85%',
        textAlign: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['58%', '75%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '15',
              fontWeight: 'bold'
            }
          },
          data: props.data
        }
      ]
    })
    const optionRef = ref(option)
    return { option: optionRef }
  }
})
</script>

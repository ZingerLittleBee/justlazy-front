import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import 'virtual:svg-icons-register'

import SvgIcon from '@/components/SvgIcon/index.vue'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// 手动引入 ECharts 各模块来减小打包体积
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, GaugeChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  GaugeChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])

createApp(App).component('svg-icon', SvgIcon).component('v-chart', ECharts).use(ElementPlus).mount('#app')

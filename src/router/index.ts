import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/home/index.vue'
import Xterm from '@/components/Xterm/index.vue'
import UsageRing from '@/components/UsageRing/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/term', component: Xterm },
  { path: '/usagering', component: UsageRing }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

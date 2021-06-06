import { onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash'

const useChartResize = () => {
  const resizeHandler = (event: Event) => {
    console.log('event', event)
  }

  onMounted(() => {
    window.addEventListener('resize', debounce(resizeHandler, 500))
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}

export default useChartResize

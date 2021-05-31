import { computed } from 'vue'

const res = computed(
  () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
)

// onMounted(() => {
//   window.addEventListener(
//     'resize',
//     debounce(() => {}),
//     1000
//   )
// })
//
// onUnmounted(() => {
//   window.removeEventListener('resize')
// })

const computedSize = (size: number) => size * (res.value / screen.width)

export { computedSize }

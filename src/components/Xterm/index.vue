<template>
  <div id="terminal"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import 'xterm/css/xterm.css'
import { io } from 'socket.io-client'

export default defineComponent({
  name: 'Xterm',
  setup: () => {
    let socket
    let term
    const initXterm = () => {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true
      })
      const attachAddon = new AttachAddon(socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('terminal')!)
      fitAddon.fit()
      term.focus()
      term.onData(() => {})
      term.write('xxxx')
    }

    onMounted(() => {
      socket = io('http://localhost:9527/servers', {
        auth: {
          token: '123'
        },
        transports: ['websocket']
      })
      socket.on('connect', () => {
        initXterm()
        console.log('连接成功')
        socket.emit('start-servers-listener')
        socket.on('servers-message', e => {
          console.log(new Date().getTime(), e)
        })
      })
    })

    const handlerClick = () => {
      console.log('socket', socket)
      socket.on('connect', () => {
        console.log('连接成功')
        socket.emit('message', 'world')
      })
      socket.on('connect_error', e => {
        console.log('error', e)
      })
      socket.emit('message', 'world')
    }
    return {
      handlerClick
    }
  }
})
</script>

<style scoped></style>

<style scoped></style>

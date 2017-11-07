// import openSocket from 'socket.io-client';
import io from 'socket.io-client'
import { loadState, saveState } from 'trading_app/lib/LocalStorage'

class WebSocketService {
  constructor() {
    const agentAddress = loadState('REKCLE::IP') || '127.0.0.1'
    saveState('REKCLE::IP', agentAddress)

    this.socket = io(`http://${agentAddress}:5000/`, {
      autoConnect: false,
      reconnection: false,
      // reconnectionAttempts: 3,
      transports: ['websocket']
    })
    // console.log(this.socket)
  }

  connect() {
    this.socket.open()
    // this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  send(message) {
    this.socket.send(message)
  }

  emit(event, data) {
    this.socket.emit(event, data)
    // socket.emit('CSE', {data: 'blah'})
  }
}

export default WebSocketService

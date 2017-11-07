import { observable, computed, action, autorun } from 'mobx';
import io from 'socket.io-client'
import { loadState, saveState } from 'trading_app/lib/LocalStorage'
import * as connAPI from 'trading_app/api/connectionAPI'

class connectionStore {
  @observable connectionInfo = {
    connected: 'disconnected',  // 'connected', 'disconnected', 'connecting'
    loggedIn: false,
    address: loadState('REKCLE::IP') || '0.0.0.0',
  }

  @observable basicInfo = {
    userName: '',
    userId: '',
    accountNo: ''
  }

  constructor(webSocketService) {
    this.wss = webSocketService

    this.handleConnect = this.handleConnect.bind(this)
    this.handleConnectError = this.handleConnectError.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
    this.handleAuth = this.handleAuth.bind(this)

    this.handleBasicInfo = this.handleBasicInfo.bind(this)

    this.timerListener = this.timerListener.bind(this)
    this.handleSSE = this.handleSSE.bind(this)
    this.handleMessage = this.handleMessage.bind(this)

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.setAddress = this.setAddress.bind(this)
    this.login = this.login.bind(this)

    this.addListenerToEvent()
    this.wss.connect()

    this.retryCount = 0

  }

  addListenerToEvent() {
    this.wss.socket.on('connect', this.handleConnect)
    this.wss.socket.on('connect_error', this.handleConnectError)
    this.wss.socket.on('disconnect', this.handleDisconnect)
    this.wss.socket.on('authentication', this.handleAuth)

    this.wss.socket.on('basic-info', this.handleBasicInfo)

    this.wss.socket.on('timer', this.timerListener)
    this.wss.socket.on('SSE', this.handleSSE)
    this.wss.socket.on('message', this.handleMessage)
  }

  handleConnect() {
    console.log('WebSocket connected: ', this.wss.socket.id)
    this.connectionInfo.connected = 'connected'
    this.retryCount = 0

    // this.addListenerToEvent()
    // this.wss.socket.emit('subscribeToTimer', 10000);
    // this.wss.send('CLient sent message')
  }

  handleConnectError() {
    console.log('WebSocket Connect Error: ', this.retryCount)
    this.retryCount += 1
    // this.addListenerToEvent()

    // if(this.retryCount <= 3)
    //   this.connectionInfo.connected = 'connecting'
    // else
    //   this.connectionInfo.connected = 'disconnected'
    this.connectionInfo.connected = 'disconnected'
  }

  handleDisconnect() {
    // console.log('WebSocket disonncted: ', this.wss.socket.id)
    this.connectionInfo.connected = 'disconnected'
    this.retryCount = 1
    this.connectionInfo.loggedIn = false
    // this.wss.connect();
  }

  handleAuth(json) {
    console.log('Auth:', json)
    if(json['status'] == 'logged_in')
      this.connectionInfo.loggedIn = true
    else // logged_out
      this.connectionInfo.loggedIn = false
  }

  handleBasicInfo(json) {
    this.basicInfo.userName = json['USER_NAME']
    this.basicInfo.userId = json['USER_ID']
    this.basicInfo.accountNo = json['ACCNO'].endsWith(';') ? json['ACCNO'].slice(0, -1) : json['ACCNO']
  }

  handleSSE(json) {
    console.log('SSE: ', json)
    // this.wss.emit('CSE', json)
  }

  handleMessage(message) {
    console.log(message)
  }

  timerListener(timestamp) {
    console.log('Callback:', timestamp)
  }

  @action connect() {
    if (loadState('REKCLE::IP') !== this.connectionInfo.address) {
      saveState('REKCLE::IP', this.connectionInfo.address)
      this.wss.disconnect() // previous if any
      this.wss.socket = io(`http://${this.connectionInfo.address}:5000`, {
        autoConnect: false,
        reconnection: false,
        // reconnectionAttempts: 3,
        transports: ['websocket']
      })
      this.addListenerToEvent()
    }
    this.retryCount = 0
    this.wss.connect()
  }

  @action disconnect() {
    connAPI.poweroff(this.connectionInfo.address)
    // return connAPI.poweroff(this.connectionInfo.address).then(
    //   (response) => {},
    //   (error) => { return {error: error.message}}
    // )
    // or
    this.wss.disconnect()
  }

  @action setAddress(ipAddress) {
    // console.log(ipAddress)
    this.connectionInfo.address = ipAddress
  }

  @action login() {
    return connAPI.login(this.connectionInfo.address).then(
      (response) => {this.connectionInfo.loggedIn = response.connected},
      (error) => { return {error: error.message}}
    )
    // this.connectionInfo.loggedIn = true

  }
}

export default connectionStore

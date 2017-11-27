import { loadState, saveState } from 'trading_app/lib/utils/localStorage'

import * as stockAPI from 'trading_app/api/stockAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class ConnectionLoginService {
  constructor(kiwoomStore) {
    this.kiwoomStore = kiwoomStore

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.setAddress = this.setAddress.bind(this)
    this.login = this.login.bind(this)
    this.updateLogin = this.updateLogin.bind(this)
    this.handleConnect = this.handleConnect.bind(this)
    this.handleConnectError = this.handleConnectError.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
    this.handleAuth = this.handleAuth.bind(this)
  }

  connect() {
    if (loadState('REKCLE::IP') !== this.kiwoomStore.connectionInfo.address) {
      saveState('REKCLE::IP', this.kiwoomStore.connectionInfo.address)
      this.kiwoomStore.wss.disconnect() // previous if any
      this.kiwoomStore.wss.socket = io(`http://${this.kiwoomStore.connectionInfo.address}:5000`, {
        autoConnect: false,
        reconnection: false,
        // reconnectionAttempts: 3,
        transports: ['websocket']
      })
      this.kiwoomStore.addListenerToEvent()
    }
    this.kiwoomStore.retryCount = 0
    this.kiwoomStore.wss.connect()
  }

  disconnect() {
    const url =  `http://${this.kiwoomStore.connectionInfo.address}:5000/poweroff`
    kiwoomAPI.poweroff(url)
    // return kiwoomAPI.poweroff(url).then(
    //   (response) => {},
    //   (error) => { return {error: error.message}}
    // )
    // or
    this.kiwoomStore.wss.disconnect()
  }

  setAddress(ipAddress) {
    // console.log(ipAddress)
    this.kiwoomStore.connectionInfo.address = ipAddress
  }

  login() {
    const url =  `http://${this.kiwoomStore.connectionInfo.address}:5000/login`
    return kiwoomAPI.login(url).then(
      (response) => {this.kiwoomStore.connectionInfo.loggedIn = response.connected},
      (error) => { return {error: error.message}}
    )
    // this.connectionInfo.loggedIn = true
  }

  updateLogin() {
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/users`
    const { userName, userId, accountNo } = this.kiwoomStore.basicInfo
    stockAPI.updateLogin(url, {userName, userId, accountNo}).then(
      (response) => response,
      (error) => { return {error: error.message}}
    )
  }

  handleConnect() {
    console.log('WebSocket connected: ', this.kiwoomStore.wss.socket.id)
    this.kiwoomStore.connectionInfo.connected = 'connected'
    this.kiwoomStore.retryCount = 0
  }

  handleConnectError() {
    console.log('WebSocket Connect Error: ', this.kiwoomStore.retryCount)
    this.kiwoomStore.retryCount += 1
    // this.kiwoomStore.addListenerToEvent()

    // if(this.kiwoomStore.retryCount <= 3)
    //   this.kiwoomStore.connectionInfo.connected = 'connecting'
    // else
    //   this.kiwoomStore.connectionInfo.connected = 'disconnected'
    this.kiwoomStore.connectionInfo.connected = 'disconnected'
  }

  handleDisconnect() {
    console.log('WebSocket disonncted')
    this.kiwoomStore.connectionInfo.connected = 'disconnected'
    this.kiwoomStore.retryCount = 1
    this.kiwoomStore.connectionInfo.loggedIn = false
    // this.wss.connect();
  }

  handleAuth(json) {
    // console.log('Auth:', json)
    if(json['status'] == 'logged_in')
      this.kiwoomStore.connectionInfo.loggedIn = true
    else // logged_out
      this.kiwoomStore.connectionInfo.loggedIn = false
  }

}

export default ConnectionLoginService

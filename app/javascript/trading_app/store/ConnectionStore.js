import { observable, computed, action, autorun } from 'mobx';

import { loadState, saveState } from 'trading_app/lib/utils/localStorage'
import io from 'socket.io-client'

import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class ConnectionStore {
  @observable connectionInfo = {
    connected: 'disconnected',  // 'connected', 'disconnected', 'connecting'
    loggedIn: false,
    // address: loadState('REKCLE::IP') || '0.0.0.0'
  }

  constructor(rootStore) {
    this.rootStore = rootStore
    this.retryCount = 0

    // this.kiwoomStore = kiwoomStore

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
    if (loadState('REKCLE::IP') !== this.rootStore.agentAddress) {
      saveState('REKCLE::IP', this.rootStore.agentAddress)
      this.rootStore.wss.disconnect() // previous if any
      this.rootStore.wss.socket = io(`http://${this.rootStore.agentAddress}:5000`, {
        autoConnect: false,
        reconnection: false,
        // reconnectionAttempts: 3,
        transports: ['websocket']
      })
      this.rootStore.addListenerToEvent()
    }
    this.retryCount = 0
    this.rootStore.wss.connect()
  }

  disconnect() {
    const { agentAddress } = this.rootStore

    kiwoomAPI.poweroff(agentAddress)
    // return kiwoomAPI.poweroff(agentAddress).then(
    //   (response) => {},
    //   (error) => { return {error: error.message}}
    // )
    // or
    this.rootStore.wss.disconnect()
  }

  setAddress(ipAddress) {
    // console.log(ipAddress)
    this.rootStore.agentAddress = ipAddress
  }

  login() {
    const { agentAddress } = this.rootStore

    return kiwoomAPI.login(agentAddress).then(
      (response) => {this.connectionInfo.loggedIn = response.connected},
      (error) => { return {error: error.message}}
    )
    // this.connectionInfo.loggedIn = true
  }

  updateLogin() {
    const { serverAddress } = this.rootStore
    const { userName, userId, accountNo } = this.rootStore.basicInfoStore.basicInfo

    railsAPI.updateLogin(serverAddress, {userName, userId, accountNo}).then(
      (response) => response,
      (error) => { return {error: error.message}}
    )
  }

  handleConnect() {
    console.log('WebSocket connected: ', this.rootStore.wss.socket.id)
    this.connectionInfo.connected = 'connected'
    this.retryCount = 0
  }

  handleConnectError() {
    console.log('WebSocket Connect Error: ', this.retryCount)
    this.retryCount += 1
    // this.rootStore.addListenerToEvent()

    // if(this.retryCount <= 3)
    //   this.connectionInfo.connected = 'connecting'
    // else
    //   this.connectionInfo.connected = 'disconnected'
    this.connectionInfo.connected = 'disconnected'
  }

  handleDisconnect() {
    console.log('WebSocket disonncted')
    this.connectionInfo.connected = 'disconnected'
    this.retryCount = 1
    this.connectionInfo.loggedIn = false
    // this.wss.connect();
  }

  handleAuth(json) {
    // console.log('Auth:', json)
    if(json['status'] == 'logged_in')
      this.connectionInfo.loggedIn = true
    else // logged_out
      this.connectionInfo.loggedIn = false
  }

}

export default ConnectionStore

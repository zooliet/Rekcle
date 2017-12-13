import { loadState, saveState } from 'trading_app/lib/utils/localStorage'

import WebSocketService from 'trading_app/store/WebSocketService'

// import FakeStore from 'trading_app/store/FakeStore'
import KiwoomStore from 'trading_app/store/KiwoomStore'
import ConnectionStore from 'trading_app/store/ConnectionStore'
import BasicInfoStore from 'trading_app/store/BasicInfoStore'
import StockListStore from 'trading_app/store/StockListStore'
import StrategyStore from 'trading_app/store/StrategyStore'

class RootStore {
  constructor() {
    this.serverAddress = document.getElementById('trading_app').dataset.env === 'production' ? 'rekcle.com' : 'localhost:3000'
    this.agentAddress = loadState('REKCLE::IP') || '0.0.0.0'

    this.wss = new WebSocketService()

    this.kiwoomStore = new KiwoomStore(this)
    this.connectionStore = new ConnectionStore(this)
    this.basicInfoStore = new BasicInfoStore(this)
    this.stockListStore = new StockListStore(this)
    this.strategyStore = new StrategyStore(this)

    this.stores = {
      kiwoomStore: this.kiwoomStore,
      connectionStore: this.connectionStore,
      basicInfoStore: this.basicInfoStore,
      stockListStore: this.stockListStore,
    }

    // this.timerListener = this.timerListener.bind(this)
    // this.handleSSE = this.handleSSE.bind(this)
    // this.handleMessage = this.handleMessage.bind(this)

    this.addListenerToEvent()
    this.wss.connect()

    this.stockListStore.getAllSymbols().then(symbols => {
      if(symbols && symbols.error) { console.log(symbols.error) }
    })

  }

  addListenerToEvent() {

    this.wss.socket.on('connect', this.connectionStore.handleConnect)
    this.wss.socket.on('connect_error', this.connectionStore.handleConnectError)
    this.wss.socket.on('disconnect', this.connectionStore.handleDisconnect)
    this.wss.socket.on('authentication', this.connectionStore.handleAuth)

    this.wss.socket.on('basic-info', this.basicInfoStore.handleBasicInfo)
    this.wss.socket.on('balance-info', this.basicInfoStore.handleBalanceInfo)

    this.wss.socket.on('assets-info', this.stockListStore.handleAssetsInfo)
    this.wss.socket.on('equations-info', this.stockListStore.handleKiwoomEquationsInfo)

    this.wss.socket.on('timer', this.timerListener.bind(this))
    this.wss.socket.on('SSE', this.handleSSE.bind(this))
    this.wss.socket.on('message', this.handleMessage.bind(this))
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
}

export default RootStore

import { observable, computed, action, autorun } from 'mobx';
import io from 'socket.io-client'
import { loadState, saveState } from 'trading_app/lib/utils/localStorage'

import WebSocketService from 'trading_app/store/WebSocketService'
import ConnectionLoginService from 'trading_app/store/ConnectionLoginService'
import BasicInfoService from 'trading_app/store/BasicInfoService'
import StockListService from 'trading_app/store/StockListService'

import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'
import * as stockAPI from 'trading_app/api/stockAPI'

class KiwoomStore {
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

  @observable balanceInfo = {
    예수금: 0,
    'D+2추정예수금': 0,
    유가잔고평가액: 0,
    예탁자산평가액: 0,
    추정예탁자산: 0,
    누적손익율: 0
  }

  @observable symbolList = []
  @observable assets = []
  @observable recommendedList = []
  @observable searchTerm = ""

  @computed get filteredList() {
    const searchFilter = new RegExp(this.searchTerm, 'i')
    return this.symbolList.filter(stock => !this.searchTerm || searchFilter.test(stock.company) || searchFilter.test(stock.symbol))
  }

  @computed get watchList() {
    const watchList = this.symbolList.filter(stock => stock.watching)
    // const assets = [...this.assets]
    let assets = this.assets.map(asset => {
      return({symbol: asset.symbol, company: asset.company,
              watching: false, shares: asset.shares,
              currentPrice: asset.currentPrice, averageBuyingPrice: asset.averageBuyingPrice
      })
    })

    for (let watched of watchList) {
      let watched_asset = assets.find(asset => {
        return asset.symbol === watched.symbol
      })
      if(watched_asset) {
        watched_asset.watching = true
      } else {
        assets.push({symbol: watched.symbol, company: watched.company, watching: true, shares: 0})
      }
    }

    return assets.sort((a, b) => {
      if (a.company > b.company) return 1
      else if (a.company < b.company) return -1
      return 0
    })
  }

  @observable kiwoomEquations = []

  constructor() {
    this.timerListener = this.timerListener.bind(this)
    this.handleSSE = this.handleSSE.bind(this)
    this.handleMessage = this.handleMessage.bind(this)

    this.retryCount = 0
    this.serverAddress = document.getElementById('trading_app').dataset.env === 'production' ? 'rekcle.com' : 'localhost:3000'
    // console.log(this.serverAddress)

    this.wss = new WebSocketService()
    this.cls = new ConnectionLoginService(this)
    this.bis = new BasicInfoService(this)
    this.sls = new StockListService(this)

    this.addListenerToEvent()
    this.wss.connect()

  }

  addListenerToEvent() {
    this.wss.socket.on('connect', this.cls.handleConnect)
    this.wss.socket.on('connect_error', this.cls.handleConnectError)
    this.wss.socket.on('disconnect', this.cls.handleDisconnect)
    this.wss.socket.on('authentication', this.cls.handleAuth)

    this.wss.socket.on('basic-info', this.bis.handleBasicInfo)
    this.wss.socket.on('balance-info', this.bis.handleBalanceInfo)

    this.wss.socket.on('assets-info', this.sls.handleAssetsInfo)
    this.wss.socket.on('equations-info', this.sls.handleKiwoomEquationsInfo)
    
    this.wss.socket.on('timer', this.timerListener)
    this.wss.socket.on('SSE', this.handleSSE)
    this.wss.socket.on('message', this.handleMessage)
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

export default KiwoomStore

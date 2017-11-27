// import { observable, computed, action, autorun } from 'mobx';
import * as stockAPI from 'trading_app/api/stockAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class StockListService {
  constructor(kiwoomStore) {
    this.kiwoomStore = kiwoomStore

    this.toggleWatching = this.toggleWatching.bind(this)
    this.addAsset = this.addAsset.bind(this)

    this.handleAssetsInfo = this.handleAssetsInfo.bind(this)
  }

  getAllSymbols() {
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/symbols/${this.kiwoomStore.basicInfo.accountNo}`
    return stockAPI.getAllSymbols(url).then(
      (response) => {
        this.kiwoomStore.symbolList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
      },
      (error) => { return {error: error.message}}
    )
  }

  getAssets() {
    const url =  `http://${this.kiwoomStore.connectionInfo.address}:5000/assets/${this.kiwoomStore.basicInfo.accountNo}`
    return kiwoomAPI.getAssets(url).then(
      (response) => response.data,
      (error) => { return {error: error.message}}
    )
  }

  getWatchList() {
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/watchlist/${this.kiwoomStore.basicInfo.accountNo}`
    return stockAPI.getWatchList(url).then(
      (response) => {
        this.kiwoomStore.watchList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
      },
      (error) => { return {error: error.message}}
    )
  }

  toggleWatching({watched, symbol, company}) {
    const stock = this.kiwoomStore.symbolList.find(stock => stock.symbol === symbol)
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/watchlist/${this.kiwoomStore.basicInfo.accountNo}`

    if(watched) { // 현재 상태: watching => 중지
      return stockAPI.removeWatchList(url, symbol, company).then(
        (response) => {
          stock.watching = false
          // kiwoomStore.symbolList = kiwoomStore.symbolList.filter(stock => stock.symbol !== symbol)
          // return
        },
        (error) => { return {error: error.message}}
      )
    }
    else { // 현재 not watched => add to watchlist
      return stockAPI.addWatchList(url, symbol, company).then(
        (response) => {
          stock.watching = true

          // kiwoomStore.watchList.push({symbol, company, watching: true})
          // kiwoomStore.watchList = kiwoomStore.watchList.sort((a, b) => {
          //   if (a.company > b.company) return 1
          //   else if (a.company < b.company) return -1
          //   return 0
          // })
        },
        (error) => { return {error: error.message}}
      )
    }
  }

  addAsset(asset) {
    // const { 종목코드, 종목명, 보유수량, 평균단가, 현재가 } = asset
    const { symbol, company, shares, averageBuyingPrice, currentPrice } = asset
    const index = this.kiwoomStore.assets.findIndex(asset => asset.symbol === symbol)
    if (index !== -1) {
      this.kiwoomStore.assets = this.kiwoomStore.assets.slice(0, index).concat(asset).concat(this.kiwoomStore.assets.slice(index+1))
    } else {
      this.kiwoomStore.assets = [...this.kiwoomStore.assets, asset]
    }
  }

  handleAssetsInfo(jsons) {
    for (let json of jsons) {
      let stock = {}
      stock['symbol'] = json['종목코드'].slice(1)
      stock['company'] = json['종목명']
      stock['shares'] = parseInt(json['보유수량'])
      stock['averageBuyingPrice'] = Math.round(parseFloat(json['평균단가']))
      stock['currentPrice'] = parseInt(json['현재가'])
      this.addAsset(stock)
    }
  }
}

export default StockListService

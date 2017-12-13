import { observable, computed, action, autorun } from 'mobx';
import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class Asset {
  constructor(symbol, name, shares, averageBuyingPrice, currentPrice) {
    Object.assign(this, {symbol, name, shares, averageBuyingPrice, currentPrice})
  }
}

class StockListStore {
  @observable symbolList = []
  @observable assets = []
  @observable recommendedList = []
  @observable searchTerm = ""

  @computed get filteredList() {
    const searchFilter = new RegExp(this.searchTerm, 'i')
    return this.symbolList.filter(stock => !this.searchTerm || searchFilter.test(stock.name) || searchFilter.test(stock.symbol))
  }

  @computed get watchedSymbolList() {
    const watchList = this.symbolList.filter(stock => stock.watching)
    // const assets = [...this.assets]
    let assets = this.assets.map(asset => {
      return({symbol: asset.symbol, name: asset.name,
              watching: false, shares: asset.shares,
              currentPrice: asset.currentPrice, averageBuyingPrice: asset.averageBuyingPrice
      })
    })

    for (let watched of watchList) {
      let watched_asset = assets.find(asset => asset.symbol === watched.symbol)
      if(watched_asset) {
        watched_asset.watching = true
      } else {
        assets.push({symbol: watched.symbol, name: watched.name, watching: true, shares: 0})
      }
    }

    return assets.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  }
  @observable kiwoomEquations = []

  constructor(rootStore) {
    this.rootStore = rootStore

    this.toggleWatching = this.toggleWatching.bind(this)
    this.addAsset = this.addAsset.bind(this)

    this.handleAssetsInfo = this.handleAssetsInfo.bind(this)
    this.handleKiwoomEquationsInfo = this.handleKiwoomEquationsInfo.bind(this)

    // this.getAllSymbols().then(symbols => {
    //   if(symbols && symbols.error) { console.log(symbols.error) }
    // })
  }

  getAllSymbols() {
    const { serverAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo

    return railsAPI.getAllSymbols(serverAddress, accountNo).then(
      (response) => {
        this.symbolList = response.sort((a, b) => a.name > b.name ? 1 : -1)
      },
      (error) => { return {error: error.message}}
    )
  }

  toggleWatching({watched, symbol, name}) {
    const { serverAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo

    const stock = this.symbolList.find(stock => stock.symbol === symbol)
    if(watched) { // 현재 상태: watching => 중지
      return railsAPI.removeWatchList(serverAddress, accountNo, symbol, name).then(
        (response) => {
          stock.watching = false
          // this.symbolList = this.symbolList.filter(stock => stock.symbol !== symbol)
          // return
        },
        (error) => { return {error: error.message}}
      )
    }
    else { // 현재 not watched => add to watchlist
      return railsAPI.addWatchList(serverAddress, accountNo, symbol, name).then(
        (response) => {
          stock.watching = true
          // kiwoomStore.watchList.push({symbol, name, watching: true})
          // kiwoomStore.watchList = kiwoomStore.watchList.sort((a, b) => {
          //   if (a.name > b.name) return 1
          //   else if (a.name < b.name) return -1
          //   return 0
          // })
        },
        (error) => { return {error: error.message}}
      )
    }
  }

  getAssets() {
    const { agentAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo

    return kiwoomAPI.getAssets(agentAddress, accountNo).then(
      (response) => response.data,
      (error) => { return {error: error.message}}
    )
  }

  handleAssetsInfo(jsons) {
    for (let json of jsons) {
      let asset = {}
      asset['symbol'] = json['종목코드'].slice(1)
      asset['name'] = json['종목명']
      asset['shares'] = parseInt(json['보유수량'])
      asset['averageBuyingPrice'] = Math.round(parseFloat(json['평균단가']))
      asset['currentPrice'] = parseInt(json['현재가'])
      this.addAsset(asset)
    }
  }

  addAsset(asset) {
    // const { 종목코드, 종목명, 보유수량, 평균단가, 현재가 } = asset

    const newAsset = new Asset(asset)
    const index = this.assets.findIndex(asset => newAsset.symbol === symbol)
    if (index !== -1) { // update
      this.assets = this.assets.slice(0, index).concat(newAsset).concat(this.assets.slice(index+1))
    } else {
      this.assets = [...this.assets, newAsset]
    }
    // const { symbol, name, shares, averageBuyingPrice, currentPrice } = asset
    // const index = this.assets.findIndex(asset => asset.symbol === symbol)
    // if (index !== -1) { // update
    //   this.assets = this.assets.slice(0, index).concat(asset).concat(this.assets.slice(index+1))
    // } else {
    //   this.assets = [...this.assets, asset]
    // }
  }
}

export default StockListStore

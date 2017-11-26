import { observable, computed, action, autorun } from 'mobx';
import * as stockAPI from 'trading_app/api/stockAPI'

import { getAllSymbols, getWatchList } from 'trading_app/api/stockAPI'

class StockListStore {
  @observable accountNo = ""

  @observable allStockList = []
  @observable searchTerm = ""
  @computed get filteredList() {
    const searchFilter = new RegExp(this.searchTerm, 'i')
    return this.allStockList.filter(stock => !this.searchTerm || searchFilter.test(stock.company) || searchFilter.test(stock.symbol))
  }

  @observable watchList = []
  @computed get myStockList() {
    return this.watchList.filter(stock => stock.shares > 0)
  }
  @observable recommendedList = []
  @observable portfolio = []

  constructor() {
    // console.log('StockListStore#constructor()')
    this.serverAddress = document.getElementById('trading_app').dataset.env === 'production' ? 'rekcle.com' : 'localhost:3000'
    // console.log(this.serverAddress)

    this.toggleWatching = this.toggleWatching.bind(this)
    // this.getWatchList = this.getWatchList.bind(this)
    this.addPortfolio = this.addPortfolio.bind(this)

    this.getAllSymbols()
    // this.getWatchList('8096696211')
  }


  @action getAllSymbols() {
    stockAPI.getAllSymbols(`http://${this.serverAddress}/api/v1/symbols`).then(
      (response) => {
        this.allStockList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
      },
      (error) => { return {error: error.message}}
    )
  }

  @action getWatchList(accountNo) {
    return stockAPI.getWatchList(`http://${this.serverAddress}/api/v1/watchlist/${accountNo}`).then(
      (response) => {
        // console.log(response)]
        this.watchList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
      },
      (error) => { return {error: error.message}}
    )
  }

  @action toggleWatching(watched, {symbol, company}) {
    const stock = this.watchList.find(stock => stock.symbol === symbol)

    if(watched) { // 현재 상태: watching => 중지
      console.log('this')
      return stockAPI.removeWatchList(`http://${this.serverAddress}/api/v1/watchlist/${this.accountNo}`, symbol, company).then(
        (response) => {
          this.watchList = this.watchList.filter(stock => stock.symbol !== symbol)
        },
        (error) => { return {error: error.message}}
      )
    }
    else { // 현재 not watched => add to watchlist
      console.log('that')
      return stockAPI.addWatchList(`http://${this.serverAddress}/api/v1/watchlist/${this.accountNo}`, symbol, company).then(
        (response) => {
          this.watchList.push({symbol, company, watching: true})
          this.watchList = this.watchList.sort((a, b) => {
            if (a.company > b.company) return 1
            else if (a.company < b.company) return -1
            return 0
          })
        },
        (error) => { return {error: error.message}}
      )
    }

    return stockAPI.toggleWatching(`http://${this.serverAddress}/api/v1/watchlist/${this.accountNo}`, symbol, company).then(
      (response) => {
        if(watched) {  // watched면 => 삭제
          this.watchList.find(stock => stock.symbol === symbol).watching = false
          // if(stock.shares > 0) {
          //   stock.watching = false
          // }
          // else {
          this.watchList = this.watchList.filter(stock => stock.symbol !== symbol)
          // }
        }
        else {
          if(stock) {
            stock.watching = true
          }
          else {
            this.watchList.push({symbol, company, watching: true})
          }

          this.watchList = this.watchList.sort((a, b) => {
            if (a.company > b.company) return 1
            else if (a.company < b.company) return -1
            return 0
          })
        }
      },
      (error) => { return {error: error.message}}
    )
  }

  @action addPortfolio(asset) {
    // const { 종목코드, 종목명, 보유수량, 평균단가, 현재가 } = asset
    const { symbol, company, shares, averageBuyingPrice, currentPrice } = asset
    const index = this.portfolio.findIndex(asset => asset.symbol === symbol)
    if (index !== -1) {
      this.portfolio = this.portfolio.slice(0, index).concat(asset).concat(this.portfolio.slice(index+1))
    } else {
      this.portfolio = [...this.portfolio, asset]
    }
  }
}

export default StockListStore

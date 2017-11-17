import { observable, computed, action, autorun } from 'mobx';
import * as stockAPI from 'trading_app/api/stockAPI'

import { getAllSymbols, getWatchList } from 'trading_app/api/stockAPI'

class StockListStore {
  @observable visibleList = []
  @observable visibleWatchList = []
  @observable recommendedList = []
  @observable excludedList = []

  constructor() {
    // console.log('StockListStore#constructor()')
    this.allStockList = []

    this.applyFilterBy = this.applyFilterBy.bind(this)
    this.toggleWatching = this.toggleWatching.bind(this)
    this.toggleExcluding = this.toggleExcluding.bind(this)

    this.serverAddress = document.getElementById('trading_app').dataset.env === 'production' ? 'rekcle.com' : 'localhost:3000'
    // console.log(this.serverAddress)

    // getAllSymbols().then((data) => {
    //   // this.visibleList = [...data]
    //   this.allStockList = data.sort((a, b) => {
    //     if (a.company > b.company) return 1
    //     else if (a.company < b.company) return -1
    //     return 0
    //   })
    //   this.visibleList = [].concat(...this.allStockList)
    // })

    // getWatchList().then((data) => {
    //   this.watchList = data.sort((a, b) => {
    //     if (a.company > b.company) return 1
    //     else if (a.company < b.company) return -1
    //     return 0
    //   })
    //   this.visibleWatchList = [].concat(...this.watchList)
    // })

    this.getAllSymbols()
    this.getWatchList('8096696211')


  }

  @action getAllSymbols() {
    stockAPI.getAllSymbols(`http://${this.serverAddress}/api/v1/symbols`).then(
      (response) => {
        this.allStockList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
        this.visibleList = [].concat(...this.allStockList)
      },
      (error) => { return {error: error.message}}
    )
  }

  @action getWatchList(accountNo) {
    return stockAPI.getWatchList(`http://${this.serverAddress}/api/v1/watchlist/${accountNo}`).then(
      (response) => {
        // console.log(response)
        this.watchList = response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
        this.visibleWatchList = [].concat(...this.watchList)
      },
      (error) => { return {error: error.message}}
    )
  }

  @action applyFilterBy({type, filter}) {
    let filtered
    switch(type) {
      case 'SEARCH':
         filtered = this.allStockList.filter(stock => (
          stock.company.toLowerCase().includes(filter.toLocaleLowerCase()) ||
          stock.symbol.includes(filter)
        ))
        this.visibleList = [].concat(...filtered)
        break

      // case 'WATCHLIST':
      //   filtered = this.allStockList.filter(stock => (
      //     this.watchList.includes(stock.symbol)
      //   ))

      case 'SEARCH_IN_WATCHLIST':
        filtered = this.watchList.filter(stock => (
          stock.company.toLowerCase().includes(filter.toLocaleLowerCase()) ||
          stock.symbol.includes(filter)
        ))
        this.visibleWatchList = [].concat(...filtered)
        break

      default:
        this.visibleList = []
    }
  }

  @action toggleWatching(watched, {symbol, company}) {
    if(watched) {
      this.watchList = this.watchList.filter(stock => stock.symbol !== symbol)
      this.visibleWatchList = [].concat(...this.watchList)
    }
    else
      this.watchList.push({symbol, company})
      this.watchList = this.watchList.sort((a, b) => {
        if (a.company > b.company) return 1
        else if (a.company < b.company) return -1
        return 0
      })
      this.visibleWatchList = [].concat(...this.watchList)
  }

  @action toggleExcluding(excluded, {symbol, company}) {
    if(excluded)
      this.excludedList = this.excludedList.filter(stock => stock.symbol !== symbol)
    else
      this.excludedList.push({symbol, company})
      this.excludedList = this.excludedList.sort((a, b) => {
        if (a.company > b.company) return 1
        else if (a.company < b.company) return -1
        return 0
      })
  }

}

export default StockListStore

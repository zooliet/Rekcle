// import { observable, computed, action, autorun } from 'mobx';
import * as stockAPI from 'trading_app/api/stockAPI'

class StockListService {
  constructor(kiwoomStore) {
    this.kiwoomStore = kiwoomStore

    this.toggleWatching = this.toggleWatching.bind(this)
    // this.addPortfolio = this.addPortfolio.bind(this)
  }

  // getAllSymbols(serverAddress, accountNo) {
  getAllSymbols() {
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/symbols/${this.kiwoomStore.basicInfo.accountNo}`
    return stockAPI.getAllSymbols(url).then(
      (response) => {
        return response.sort((a, b) => {
          if (a.company > b.company) return 1
          else if (a.company < b.company) return -1
          return 0
        })
      },
      (error) => { return {error: error.message}}
    )
  }

  getWatchList() {
    const url = `http://${this.kiwoomStore.serverAddress}/api/v1/watchlist/${this.kiwoomStore.basicInfo.accountNo}`
    return stockAPI.getWatchList(url).then(
      (response) => {
        // console.log(response)]
        return response.sort((a, b) => {
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
          const stock = this.kiwoomStore.symbolList.find(stock => stock.symbol === symbol)
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
          const stock = this.kiwoomStore.symbolList.find(stock => stock.symbol === symbol)
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

  // addPortfolio(asset) {
  //   // const { 종목코드, 종목명, 보유수량, 평균단가, 현재가 } = asset
  //   const { symbol, company, shares, averageBuyingPrice, currentPrice } = asset
  //   const index = this.portfolio.findIndex(asset => asset.symbol === symbol)
  //   if (index !== -1) {
  //     this.portfolio = this.portfolio.slice(0, index).concat(asset).concat(this.portfolio.slice(index+1))
  //   } else {
  //     this.portfolio = [...this.portfolio, asset]
  //   }
  // }
}

export default StockListService

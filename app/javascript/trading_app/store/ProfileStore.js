
import { observable, computed, action, autorun } from 'mobx';
// import { getAllSymbols, getWatchList } from 'trading_app/api/profileAPI'


class ProfileStore {
  @observable visibleList = []
  @observable visibleWatchList = []
  @observable recommendedList = []
  @observable excludedList = []

  constructor() {
    // console.log('StockListStore#constructor()')
    this.allStockList = []

    // getAllSymbols().then((data) => {
    //   // this.visibleList = [...data]
    //   this.allStockList = data.sort((a, b) => {
    //     if (a.company > b.company) return 1
    //     else if (a.company < b.company) return -1
    //     return 0
    //   })
    //   this.visibleList = [].concat(...this.allStockList)
    // })
    //
    // getWatchList().then((data) => {
    //   this.watchList = data.sort((a, b) => {
    //     if (a.company > b.company) return 1
    //     else if (a.company < b.company) return -1
    //     return 0
    //   })
    //   this.visibleWatchList = [].concat(...this.watchList)
    // })
    //
    // this.applyFilterBy = this.applyFilterBy.bind(this)
    //
    // this.toggleWatching = this.toggleWatching.bind(this)
    // this.toggleExcluding = this.toggleExcluding.bind(this)
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

export default ProfileStore

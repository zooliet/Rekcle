
import { observable, computed, action, autorun } from 'mobx';
import { getAllSymbols, getWatchList } from 'trading_app/api/profileAPI'


class AccountStore {
  @observable userName = 'hl1sqi--'
  @observable userId = 'hl1sqi--'
  @observable accountNo = '8096696211--'

  constructor() {

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



}

export default AccountStore

// import { observable, computed, action, autorun } from 'mobx';
import * as stockAPI from 'trading_app/api/stockAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class BasicInfoService {
  constructor(kiwoomStore) {
    this.kiwoomStore = kiwoomStore

    this.checkBalance = this.checkBalance.bind(this)
    this.handleBasicInfo = this.handleBasicInfo.bind(this)
    this.handleBalanceInfo = this.handleBalanceInfo.bind(this)
  }

  checkBalance() {
    const url =  `http://${this.kiwoomStore.connectionInfo.address}:5000/check_balance/${this.kiwoomStore.basicInfo.accountNo}`
    return kiwoomAPI.checkBalance(url).then(
      (response) => response.data,
      (error) => { return {error: error.message}}
    )
  }

  handleBasicInfo(json) {
    this.kiwoomStore.basicInfo.userName = json['USER_NAME']
    this.kiwoomStore.basicInfo.userId = json['USER_ID']
    this.kiwoomStore.basicInfo.accountNo = json['ACCNO'].slice(0, -1).split(';').reverse()[0]

    // this.checkBalance()
    // this.kiwoomStore.sls.getAssets()
    this.kiwoomStore.sls.getAllSymbols().then(symbols => {
      if(symbols && symbols.error) { console.log(symbols.error) }
    })

    // this.kiwoomStore.sls.getWatchList().then(stocks => {
    //   if(stocks && stocks.error) { console.log(stocks.error) }
    // }

    this.kiwoomStore.cls.updateLogin()
  }

  handleBalanceInfo(json) {
    for(let key in json) {
      this.kiwoomStore.balanceInfo[key] = parseInt(json[key])
    }
  }
}

export default BasicInfoService

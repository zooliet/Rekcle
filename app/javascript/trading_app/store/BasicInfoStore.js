import { observable, computed, action, autorun } from 'mobx';
import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class BasicInfoStore {
  @observable basicInfo = {
    userName: "",
    userId: "",
    accountNo: ""
  }

  @observable balanceInfo = {
    예수금: 0,
    'D+2추정예수금': 0,
    유가잔고평가액: 0,
    예탁자산평가액: 0,
    추정예탁자산: 0,
    누적손익율: 0
  }


  constructor(rootStore) {
    this.rootStore = rootStore

    this.checkBalance = this.checkBalance.bind(this)
    this.handleBasicInfo = this.handleBasicInfo.bind(this)
    this.handleBalanceInfo = this.handleBalanceInfo.bind(this)
  }

  checkBalance() {
    const { agentAddress } = this.rootStore
    const { accountNo } = this.basicInfo

    return kiwoomAPI.checkBalance(agentAddress, accountNo).then(
      (response) => response.data,
      (error) => { return {error: error.message}}
    )
  }

  handleBasicInfo(json) {
    const { stockListStore, connectionStore } = this.rootStore.stores

    this.basicInfo.userName = json['USER_NAME']
    this.basicInfo.userId = json['USER_ID']
    this.basicInfo.accountNo = json['ACCNO'].slice(0, -1).split(';').reverse()[0]

    // this.checkBalance()

    // stockListStore.getAssets()

    // stockListStore.getAllSymbols().then(symbols => {
    //   if(symbols && symbols.error) { console.log(symbols.error) }
    // })

    // stockListStore.getWatchList().then(stocks => {
    //   if(stocks && stocks.error) { console.log(stocks.error) }
    // }

    connectionStore.updateLogin()
  }

  handleBalanceInfo(json) {
    for(let key in json) {
      this.balanceInfo[key] = parseInt(json[key])
    }
  }
}

export default BasicInfoStore

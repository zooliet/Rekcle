import { observable, computed, action, autorun } from 'mobx';
import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'


class StrategyStore {
  @observable kiwoomEquations = []

  constructor(rootStore) {
    this.rootStore = rootStore

  }



  getWatchList() {
    const { serverAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo

    return railsAPI.getWatchList(serverAddress, accountNo).then(
      (response) => {
        this.watchList = response.sort((a, b) => a.name > b.name ? 1 : -1)
      },
      (error) => { return {error: error.message}}
    )
  }

  getKiwoomEquations() {
    const { agentAddress } = this.rootStore

    return kiwoomAPI.getKiwoomEquations(agentAddress).then(
      (response) => response.data,
      (error) => { return {error: error.message}}
    )
  }

  handleKiwoomEquationsInfo(json) {
    // console.log(json)
    this.kiwoomEquations = json.sort((a, b) => a.인덱스 > b.인덱스 ? 1 : -1)
  }
}

export default StrategyStore

import { observable, computed, action, autorun } from 'mobx';
import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class StrategyStore {

  // UI에서는 kiwoomEquations을 사용
  // kiwoomEquationsServer는 서버에 저장된 정보로 초기화 시 한번만 호출
  // kiwoomEquationsLive는 해당 React 클래스 생성 시 마다 호출하며, 이 정보를 기준으로 kiwoomEquationsServer를 업데이트

  // @observable kiwoomEquationsServer = []
  @observable kiwoomEquationsLive = []
  @computed get kiwoomEquations() {
    return [...this.kiwoomEquationsLive]
  }

  constructor(rootStore) {
    this.rootStore = rootStore
    this.kiwoomEquationsServer = []

    this.getKiwoomEquations = this.getKiwoomEquations.bind(this)
    this.getKiwoomEquationsServer = this.getKiwoomEquationsServer.bind(this)
    this.getKiwoomEquationsLive = this.getKiwoomEquationsLive.bind(this)
    this.handleKiwoomEquationsInfo = this.handleKiwoomEquationsInfo.bind(this)

    // (1) 테스트 목적 (2) 궁극적으로는 BasicInfoStore#handleBasicInfo()에서 호출
    this.getKiwoomEquations()

    autorun(() => {
      console.log(this.kiwoomEquations)
    })
  }

  getKiwoomEquations() {
    this.getKiwoomEquationsServer()
    this.getKiwoomEquationsLive()
  }

  getKiwoomEquationsServer() {
    const { serverAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo

    return railsAPI.getKiwoomEquations(serverAddress, accountNo).then(
      (equations) => {
        console.log(equations)
        this.kiwoomEquationsServer = equations
      },
      (error) => { return {error: error.message}}
    )
  }

  getKiwoomEquationsLive() {
    const { agentAddress } = this.rootStore
    return kiwoomAPI.getKiwoomEquations(agentAddress).then(
      (response) => { console.log(response.status)},
      (error) => { return {error: error.message}}
    )
  }

  handleKiwoomEquationsInfo(json) {
    console.log(json)
    this.kiwoomEquationsLive = json.sort((a, b) => a.인덱스 > b.인덱스 ? 1 : a.인덱스 < b.인덱스 ? -1 : 0)
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


}

export default StrategyStore

import { observable, computed, action, autorun } from 'mobx';
import * as railsAPI from 'trading_app/api/railsAPI'
import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'

class StrategyStore {

  // @observable kiwoomEquationsServer = []
  @observable kiwoomEquations = []

  constructor(rootStore) {
    this.rootStore = rootStore
    this.kiwoomEquationsServer = []

    this.getKiwoomEquations = this.getKiwoomEquations.bind(this)
    this.getKiwoomEquationsServer = this.getKiwoomEquationsServer.bind(this)
    this.getKiwoomEquationsLive = this.getKiwoomEquationsLive.bind(this)
    this.handleKiwoomEquationsInfo = this.handleKiwoomEquationsInfo.bind(this)

    // (1) 테스트 목적 (2) 궁극적으로는 BasicInfoStore#handleBasicInfo()에서 호출
    this.getKiwoomEquations()

    // autorun(() => {
    //   this.kiwoomEquation = [...this.kiwoomEquations]
    //   console.log("autorun()", this.kiwoomEquation)
    // })
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
        // console.log(equations)
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
    // console.log(json)
    this.kiwoomEquations = json.sort((a, b) => a.인덱스 > b.인덱스 ? 1 : a.인덱스 < b.인덱스 ? -1 : 0)

    this.kiwoomEquations= this.kiwoomEquations.map(equation => {
      let saved = this.kiwoomEquationsServer.find(eq => eq.조건명 === equation.조건명)
      if(saved) {
        return Object.assign({}, saved, equation)
      } else {
        return equation
      }
    })

    this.kiwoomEquationsServer = [...this.kiwoomEquations]
    // then
    const { serverAddress } = this.rootStore
    const { accountNo } = this.rootStore.basicInfoStore.basicInfo
    railsAPI.updateKiwoomEquations(serverAddress, accountNo, this.kiwoomEquationsServer)
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

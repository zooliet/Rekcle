import { observable, computed, action, autorun } from 'mobx';
import { loadState, saveState } from 'trading_app/lib/utils/localStorage'

// import ConnectionLoginService from 'trading_app/store/ConnectionLoginService'
// import BasicInfoService from 'trading_app/store/BasicInfoService'
// import StockListService from 'trading_app/store/StockListService'

import * as kiwoomAPI from 'trading_app/api/kiwoomAPI'
import * as railsAPI from 'trading_app/api/railsAPI'

class MyStock {
  @observable name = ""
  @observable buyingRules = []

  constructor(code, name, buyingRules, sellingRules) {
    this.code = code
    this.name = name
    this.buyingRules = buyingRules
    this.sellingRules = sellingRules
  }
}

class BuyingRule {
  @observable name = ""
  @observable rule = ""
  constructor(id, name, rule) {
    this.id = id
    this.name = name
    this.rule = rule
  }
}


class KiwoomStore {
  // @observable testMap = new Map()
  // @observable testObject = {name: 'Junhyun', age: 40}
  // @observable testArray = {}





  // @observable buyingRules = {
  //   "000": {name: 'abc', rule: 'abc'},
  //   "001": {name: 'def', rule: 'def'},
  //   "002": {name: 'ghi', rule: 'ghi'},
  // }
  @observable buyingRules = new Map()
  @observable stocks = new Map()

  // @observable stocks = {}
  //   "012450": {
  //     code: "012450",
  //     name: '한화테크윈',
  //     buyingRules: ['000', '001'],
  //     sellingRules: []
  //   },
  //   "079550": {
  //     code: "079550",
  //     name: 'LIG넥스원',
  //     buyingRules: ['000', '002'],
  //     sellingRules: []
  //   },
  //   "099320 ": {
  //     code: "099320",
  //     name: '쎄트렉아이',
  //     buyingRules: ['001', '002'],
  //     sellingRules: []
  //   },
  // }

  constructor(rootStore) {
    this.rootStore = rootStore


    const r1 = new BuyingRule("001", "rule1", "rule1")
    const r2 = new BuyingRule("002", "rule2", "rule2")
    const r3 = new BuyingRule("003", "rule1", "rule3")
    this.buyingRules.set("001", r1)
    this.buyingRules.set("002", r2)
    this.buyingRules.set("003", r3)

    const s1 = new MyStock("012450", "한화테크윈", ['001', '002'], [])
    const s2 = new MyStock("079550", "LIG넥스원", ['001', '003'], [])
    const s3 = new MyStock("099320", "쎄트렉아이", ['002', '003'], [])

    this.stocks.set("012450", s1)
    this.stocks.set("079550", s2)
    this.stocks.set("099320", s3)

    // this.stocks.set("012450", {
    //   code: "012450",
    //   name: '한화테크윈',
    //   buyingRules: ['000', '001'],
    //   sellingRules: []
    // })
    //
    // this.stocks.set("079550", {
    //   code: "079550",
    //   name: 'LIG넥스원',
    //   buyingRules: ['000', '001'],
    //   sellingRules: []
    // })
    //
    //
    // this.stocks.set("099320", {
    //   code: "099320",
    //   name: '쎄트렉아이',
    //   buyingRules: ['001', '002'],
    //   sellingRules: []
    // })
  }
}

export default KiwoomStore

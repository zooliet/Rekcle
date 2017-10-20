// import TodoStore from './store/TodoStore'
// import StockListStore from './store/StockListStore'
// import BuyingRuleStore from './store/BuyingRuleStore'
import FakeStore from 'trading_app/store/FakeStore'
import ProfileStore from 'trading_app/store/ProfileStore'

import { observable, computed, action, autorun } from 'mobx';
import { generateData, makeOne } from 'trading_app/api/generate'

const configureStore = () => {

  // const stockListStore = new StockListStore()
  // const buyingRuleStore = new BuyingRuleStore()
  const fakeStore = new FakeStore()
  // console.log(fakeStore)

  const profileStore = new ProfileStore()

  return ({ fakeStore, profileStore })
}

export default configureStore

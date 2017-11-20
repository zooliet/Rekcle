// import FakeStore from 'trading_app/store/FakeStore'
import KiwoomStore from 'trading_app/store/KiwoomStore'
import StockListStore from './store/StockListStore'
// import BuyingRuleStore from './store/BuyingRuleStore'

import WebSocketService from 'trading_app/store/WebSocketService'

const configureStore = () => {

  const webSocketService = new WebSocketService();

  // const fakeStore = new FakeStore(webSocketService)
  const stockListStore = new StockListStore()
  const kiwoomStore = new KiwoomStore(webSocketService, stockListStore)
  // const buyingRuleStore = new BuyingRuleStore()

  return ({ kiwoomStore, stockListStore })
}

export default configureStore

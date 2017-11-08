import FakeStore from 'trading_app/store/FakeStore'
import KiwoomStore from 'trading_app/store/KiwoomStore'

// import StockListStore from './store/StockListStore'
// import BuyingRuleStore from './store/BuyingRuleStore'

import WebSocketService from 'trading_app/store/WebSocketService'

const configureStore = () => {

  const webSocketService = new WebSocketService();

  const fakeStore = new FakeStore(webSocketService)
  const kiwoomStore = new KiwoomStore(webSocketService)

  // const stockListStore = new StockListStore()
  // const buyingRuleStore = new BuyingRuleStore()

  return ({ fakeStore, kiwoomStore })
}

export default configureStore

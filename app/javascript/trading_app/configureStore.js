import FakeStore from 'trading_app/store/FakeStore'
import ConnectionStore from 'trading_app/store/ConnectionStore'
import AccountStore from 'trading_app/store/AccountStore'
// import StockListStore from './store/StockListStore'
// import BuyingRuleStore from './store/BuyingRuleStore'

import WebSocketService from 'trading_app/store/WebSocketService'

const configureStore = () => {

  const webSocketService = new WebSocketService();

  const fakeStore = new FakeStore(webSocketService)
  const connectionStore = new ConnectionStore(webSocketService)
  const accountStore = new AccountStore()
  // const stockListStore = new StockListStore()
  // const buyingRuleStore = new BuyingRuleStore()

  return ({ fakeStore, connectionStore, accountStore })
}

export default configureStore

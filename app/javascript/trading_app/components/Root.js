import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider, observer, inject } from 'mobx-react';

import ConnectAndLogin from 'trading_app/components/ConnectAndLogin'
import Nav from 'trading_app/components/common/Nav'
import TradingMain from './trading/TradingMain'
import StrategyMain from './strategy/StrategyMain'
import WatchListMain from './watchlist/WatchListMain'
import AccountMain from './account/AccountMain'
// import FormDemoMain from './form_demo/FormDemoMain'

const Root = ({store}) => {
  // console.log(store)
  return(
    <Provider {...store}>
      <Router basename='/tradings' className='my-5'>
        <div className='my-5'>
          <Nav />
          <Switch>
            <Route exact path="/" component={TradingMain} />
            <Route path="/strategy" component={StrategyMain} />
            <Route path="/watchlist" component={WatchListMain} />
            <Route path="/account" component={AccountMain} />
            {/* <Route path="/form_demo" component={FormDemoMain} /> */}
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default Root

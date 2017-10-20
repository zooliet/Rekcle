import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

import Nav from 'trading_app/components/common/Nav'
import TradingMain from './trading/TradingMain'
import StrategyMain from './strategy/StrategyMain'
import WatchListMain from './watchlist/WatchListMain'
import ProfileMain from './profile/ProfileMain'
// import FormDemoMain from './form_demo/FormDemoMain'


const Root = ({store}) => {
  // console.log(store)

  return(
    <Provider {...store}>
      <Router basename='/tradings'>
        <div className='my-5'>
          <Nav />
          <Switch>
            <Route exact path="/" component={TradingMain} />
            <Route path="/strategy" component={StrategyMain} />
            <Route path="/watchlist" component={WatchListMain} />
            <Route path="/profile" component={ProfileMain} />
            {/* <Route path="/form_demo" component={FormDemoMain} /> */}
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default Root

import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'

import ConnectAndLogin from 'trading_app/components/ConnectAndLogin'
import StockListNav from './StockListNav'
import AllStockList from './AllStockList'
import MyStockList from './MyStockList'
import WatchList from './WatchList'
import RecommendedStockList from './RecommendedStockList'

@inject('kiwoomStore') @observer
class StockListMain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { connectionInfo } = this.props.kiwoomStore
    return (
      // <div className="jumbotron my-5">
      //   <h1 className='text-center'>종목 관리 화면입니다.</h1>
      // </div>

      <div className="my-5">
        <ConnectAndLogin />
        { connectionInfo.connected === 'connected' &&
          connectionInfo.loggedIn &&
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <StockListNav />
            </div>

            <div className="col-md-9 col-lg-9 mt-5 mt-md-0">
              <Switch>
                <Route exact path='/stocks' component={AllStockList} />
                <Route path='/stocks/me' component={MyStockList} />
                <Route path='/stocks/watchlist' component={WatchList} />
                <Route path='/stocks/recommended' component={RecommendedStockList} />
                <Route render={() => <h1 className=''>잘못된 페이지입니다</h1>}  />
              </Switch>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default StockListMain

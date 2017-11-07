import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { observer, inject } from 'mobx-react';

// import {observable, action, computed} from 'mobx';
// import { observer, Observer, Provider, inject } from 'mobx-react';
// import PropTypes from 'prop-types'

import AccountListNav from './AccountListNav'
import AccountInfo from './AccountInfo'
import StockBalance from './StockBalance'
import ConnectionHistory from './ConnectionHistory'

@inject('accountStore') @observer
class AccountMain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <div className="jumbotron my-5">
      //   <h1 className='text-center'>접속 설정 화면입니다.</h1>
      // </div>

      <div className="my-5">
        <div className="row">
          <div className="col-md-3 col-lg-3">
            <AccountListNav />
          </div>

          <div className="col-md-9 col-lg-9 mt-5 mt-md-0">            
            <Switch>
              <Route exact path='/account' component={AccountInfo} />
              <Route path='/account/balance' component={StockBalance} />
              <Route path='/account/connections' component={ConnectionHistory} />
              <Route render={() => <h1 className='text-center text-muted'>잘못된 페이지입니다</h1>}  />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountMain

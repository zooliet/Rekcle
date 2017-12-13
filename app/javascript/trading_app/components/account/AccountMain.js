import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'

import ConnectAndLogin from 'trading_app/components/ConnectAndLogin'
import AccountListNav from './AccountListNav'
import AccountInfo from './AccountInfo'
import AccountBalance from './AccountBalance'
// import ConnectionHistory from './ConnectionHistory'

@inject('rootStore') @observer
class AccountMain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { connectionInfo } = this.props.rootStore.connectionStore
    return (
      // <div className="jumbotron my-5">
      //   <h1 className='text-center'>접속 설정 화면입니다.</h1>
      // </div>

      <div className="my-5">
        {/* <ConnectAndLogin />
        { connectionInfo.connected === 'connected' &&
          connectionInfo.loggedIn && */}
        {
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <AccountListNav />
            </div>

            <div className="col-md-9 col-lg-9 mt-5 mt-md-0">
              <Switch>
                <Route exact path='/account' component={AccountInfo} />
                <Route path='/account/balance' component={AccountBalance} />
                {/* <Route path='/account/connections' component={ConnectionHistory} /> */}
                <Route render={() => <h1 className='text-center text-muted'>잘못된 페이지입니다</h1>}  />
              </Switch>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default AccountMain

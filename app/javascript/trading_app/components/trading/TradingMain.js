import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'

import ConnectAndLogin from 'trading_app/components/ConnectAndLogin'

@inject('rootStore') @observer
class TradingMain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { connectionInfo } = this.props.rootStore.connectionStore

    return (
      <div className="my-5">
        <ConnectAndLogin />
        { connectionInfo.connected === 'connected' &&
          connectionInfo.loggedIn &&
          <div className="jumbotron my-5">
            <h1 className='text-center'>자동 매매 화면입니다.</h1>
          </div>
        }
      </div>
    )
  }
}

export default TradingMain

import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'

import ConnectAndLogin from 'trading_app/components/ConnectAndLogin'

import StrategyNav from './StrategyNav'
import KiwoomEquation from './KiwoomEquation'

@inject('kiwoomStore') @observer
class StrategyMain extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(this.props)
    this.props.history.push('/strategy/conditions')
  }

  render() {
    const { connectionInfo } = this.props.kiwoomStore

    return (
      // <div className="jumbotron my-5">
      //   <h1 className='text-center'>매매 전략 화면입니다.</h1>
      // </div>

      <div className="my-5">
        <ConnectAndLogin />
        { connectionInfo.connected === 'connected' &&
          connectionInfo.loggedIn &&
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <StrategyNav />
            </div>

            <div className="col-md-9 col-lg-9 mt-5 mt-md-0">
              <Switch>
                <Route exact path='/strategy/conditions' component={KiwoomEquation} />
                <Route render={() => <h1 className=''></h1>}  />
              </Switch>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default StrategyMain

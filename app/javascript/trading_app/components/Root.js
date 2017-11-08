import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider, observer, inject } from 'mobx-react';


import Nav from 'trading_app/components/common/Nav'
import TradingMain from './trading/TradingMain'
import StrategyMain from './strategy/StrategyMain'
import WatchListMain from './watchlist/WatchListMain'
import AccountMain from './account/AccountMain'
// import FormDemoMain from './form_demo/FormDemoMain'

const Root = observer(({store}) => {
  // console.log(store)
  const { connectionInfo, connect, disconnect, setAddress } = store.kiwoomStore

  const handleLogin = () => {
    store.kiwoomStore.login()
      // .then((result) => {
      //   if(result && result.error) console.log(result.error)
      // })
  }

  return(
    <Provider {...store}>
      <Router basename='/tradings'>
        <div className='my-5'>
          { connectionInfo.connected === 'connecting' &&
            <div className='d-flex flex-column align-items-center bg-light jumbotron'>
              <p className='lead text-dark'>에이전트 연결 중입니다.</p>
            </div>
          }
          { connectionInfo.connected === 'disconnected' &&
            <div className='d-flex flex-column align-items-center bg-light jumbotron'>
              <p className='lead text-dark'>에이전트를 실행한 후 연결 버튼을 클릭하세요</p>

              <div className="input-group connection-info">
                <span className="input-group-addon">에이전트 주소</span>
                <input type="url" className="form-control" placeholder="0.0.0.0" aria-label="agent address"
                  value={connectionInfo.address}
                  onChange={(event) => {setAddress(event.target.value)}}
                />
                <span className="input-group-btn">
                  <button className="btn btn-success" onClick={() => connect()}>연결</button>
                </span>
              </div>
            </div>
          }
          {
            connectionInfo.connected === 'connected' &&
            !connectionInfo.loggedIn &&
            <div className='d-flex flex-column align-items-center bg-light jumbotron'>
              {/* <div className="input-group connection-info">
                <span className="input-group-btn"> */}
                  <button className="btn btn-success btn-lg p-4" onClick={() => handleLogin()}>키움증권 로그인</button>
                {/* </span>
              </div> */}
            </div>
          }
          { connectionInfo.connected === 'connected' &&
            connectionInfo.loggedIn &&
            <div>
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
          }
        </div>
      </Router>
    </Provider>
  )
})

export default Root

import React from 'react'
import { observer, inject } from 'mobx-react';

@inject('rootStore') @observer
class ConnectAndLogin extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const connectionStore = this.props.rootStore.connectionStore

    return (
      <div>
        { connectionStore.connectionInfo.connected === 'connecting' &&
          <div className='d-flex flex-column align-items-center bg-light jumbotron'>
            <p className='lead text-dark'>에이전트 연결 중입니다.</p>
          </div>
        }
        { connectionStore.connectionInfo.connected === 'disconnected' &&
          <div className='d-flex flex-column align-items-center bg-light jumbotron'>
            <p className='lead text-dark'>에이전트를 실행한 후 연결 버튼을 클릭하세요</p>

            <div className="input-group connection-info">
              <span className="input-group-addon">에이전트 주소</span>
              <input type="url" className="form-control" placeholder="0.0.0.0" aria-label="agent address"
                value={connectionStore.connectionInfo.address}
                onChange={(event) => {connectionStore.setAddress(event.target.value)}}
              />
              <span className="input-group-btn">
                <button className="btn btn-success" onClick={() => connectionStore.connect()}>연결</button>
              </span>
            </div>
          </div>
        }
        {
          connectionStore.connectionInfo.connected === 'connected' &&
          !connectionStore.connectionInfo.loggedIn &&
          <div className='d-flex flex-column align-items-center bg-light jumbotron'>
            <button className="btn btn-success btn-lg p-4" onClick={() => connectionStore.login()}>키움증권 로그인</button>
          </div>
        }
      </div>
    )
  }
}

export default ConnectAndLogin

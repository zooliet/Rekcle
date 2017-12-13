import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

@inject('rootStore') @observer
class AccountInfo extends React.Component {
  constructor(props) {
    super(props)
    // console.log('AccountInfo()')
  }

  render() {
    // console.log('AccountInfo#render()')
    const { basicInfoStore, connectionStore } = this.props.rootStore.stores

    return (
      <div className='w-100'>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <th scope="row" className='w-25'>사용자명</th>
              <td className='w-75'>{basicInfoStore.basicInfo.userName}</td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>사용자 ID</th>
              <td className='w-75'>{basicInfoStore.basicInfo.userId}</td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>계정번호</th>
              <td className='w-75'>{basicInfoStore.basicInfo.accountNo}</td>
            </tr>
            <tr>
              <th scope="row" className='w-25'></th>
              <td className='w-75'>
                <button className='btn btn-success' onClick={() => connectionStore.disconnect()}>
                  접속 끊기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default AccountInfo

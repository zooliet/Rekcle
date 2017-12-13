import React from 'react'
import { observer, inject } from 'mobx-react';
import NumberFormat from 'react-number-format';

@inject('rootStore') @observer
class AccountBalance extends React.Component {
  constructor(props) {
    super(props)

    // this.handleCheckBalance = this.handleCheckBalance.bind(this)
  }

  componentDidMount() {
    this.props.rootStore.basicInfoStore.checkBalance().then(balance => {
      if(balance && balance.error) {console.log(balance.error)}
    })
  }


  handleCheckBalance() {
    this.props.rootStore.basicInfoStore.checkBalance().then(balance => {
      if(balance && balance.error) {console.log(balance.error)}
    })
  }

  render() {
    const { basicInfoStore } = this.props.rootStore.stores

    return(
      <div className='w-100'>

        <table className='table table-bordered'>
          <tbody>
            <tr>
              <th scope="row" className='w-25'>예수금</th>
              <td className='w-75'>
                <NumberFormat value={basicInfoStore.balanceInfo['예수금']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>D+2추정예수금</th>
              <td className='w-75'>
                <NumberFormat value={basicInfoStore.balanceInfo['D+2추정예수금']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>유가잔고평가액</th>
              <td className='w-75'>
                <NumberFormat value={basicInfoStore.balanceInfo['유가잔고평가액']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>예탁자산평가액</th>
              <td className='w-75'>
                <NumberFormat value={basicInfoStore.balanceInfo['예탁자산평가액']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>추정예탁자산</th>
              <td className='w-75'>
                <NumberFormat value={basicInfoStore.balanceInfo['추정예탁자산']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>누적손익율</th>
              <td className='w-75'>{basicInfoStore.balanceInfo['누적손익율']}</td>
            </tr>

            <tr>
              <th scope="row" className='w-25'></th>
              <td className='w-75'>
                <button className='btn btn-success' onClick={this.handleCheckBalance.bind(this)}>
                  업데이트
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default AccountBalance

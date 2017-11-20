import React from 'react'
import { observer, inject } from 'mobx-react';
import NumberFormat from 'react-number-format';

@inject('kiwoomStore') @observer
class AccountBalance extends React.Component {
  constructor(props) {
    super(props)

    this.handleCheckBalance = this.handleCheckBalance.bind(this)
  }

  componentDidMount() {
    // this.props.kiwoomStore.checkBalance()
  }


  handleCheckBalance() {
    this.props.kiwoomStore.checkBalance()
  }

  render() {
    const { balanceInfo } = this.props.kiwoomStore

    return(
      <div className='w-100'>

        <table className='table table-bordered'>
          <tbody>
            <tr>
              <th scope="row" className='w-25'>예수금</th>
              <td className='w-75'>
                <NumberFormat value={balanceInfo['예수금']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>D+2추정예수금</th>
              <td className='w-75'>
                <NumberFormat value={balanceInfo['D+2추정예수금']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>유가잔고평가액</th>
              <td className='w-75'>
                <NumberFormat value={balanceInfo['유가잔고평가액']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>예탁자산평가액</th>
              <td className='w-75'>
                <NumberFormat value={balanceInfo['예탁자산평가액']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>추정예탁자산</th>
              <td className='w-75'>
                <NumberFormat value={balanceInfo['추정예탁자산']} displayType={'text'} thousandSeparator={true} suffix={' 원'} />
              </td>
            </tr>
            <tr>
              <th scope="row" className='w-25'>누적손익율</th>
              <td className='w-75'>{balanceInfo['누적손익율']}</td>
            </tr>

            <tr>
              <th scope="row" className='w-25'></th>
              <td className='w-75'>
                <button className='btn btn-success' onClick={this.handleCheckBalance}>
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

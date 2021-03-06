import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

@inject('kiwoomStore') @observer
class KiwoomEquation extends React.Component {
  constructor(props) {
    super(props)
    // console.log('KiwoomEquation()')
  }

  componentDidMount() {
    this.props.kiwoomStore.sls.getKiwoomEquations().then(equations => {
      if(equations && equations.error) {console.log(equations.error)}
    })
  }

  render() {
    // console.log('KiwoomEquation#render()')
    const { kiwoomEquations, cls } = this.props.kiwoomStore

    return (
      <div className='w-100'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope="row" className='w-10'>#</th>
              <th scope="row" className='w-50'>검색식 명</th>
              <th scope="row" className='w-40'>매수 방식</th>
            </tr>
          </thead>
          <tbody>
            {
              kiwoomEquations.map(eq => {
                return(
                  <tr key={eq.인덱스}>
                    <td>{eq.인덱스}</td>
                    <td>{eq.조건명}</td>
                    <td></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default KiwoomEquation

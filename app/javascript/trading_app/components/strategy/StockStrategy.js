import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

@inject('rootStore') @observer
class StockStrategy extends React.Component {
  constructor(props) {
    super(props)
    // console.log('StockStrategy()')
  }

  componentDidMount() {
    // this.props.rootStore.stockListStore.getKiwoomEquations().then(equations => {
    //   if(equations && equations.error) {console.log(equations.error)}
    // })
  }

  render() {
    // console.log('KiwoomEquation#render()')
    const { stocks, buyingRules } = this.props.rootStore.kiwoomStore

    // const sorted = stocks.values().sort((a, b) => {
    //   if(a.name > b.name) return 1
    //   else if (a.name < b.name) return -1
    //   return 0
    // })

    // const sorted = Object.values(stocks).sort((a, b) => {
    //   if(a.name > b.name) return 1
    //   else if (a.name < b.name) return -1
    //   return 0
    // })

    const sorted = new Map([...stocks.entries()].sort((a,b) => a[1].name > b[1].name))


    return (
      <div className='w-100'>
        {
          [...sorted.values()].map(stock => {
            return(
              <div key={stock.code}>
                <span>[{stock.code}]{stock.name}</span>
                <ul>
                {
                  stock.buyingRules.map(id => {
                    return(
                      // <li key={id}>{buyingRules[id].name}</li>
                      <li key={id}>{buyingRules.get(id).name}</li>
                    )
                  })
                }
                </ul>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default StockStrategy

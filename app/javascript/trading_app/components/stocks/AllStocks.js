import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import StockList from './StockList'

@inject('rootStore') @observer
class AllStocks extends React.Component {
  constructor(props) {
    super(props)
  }

  search(e) {
    e.preventDefault()
    this.props.rootStore.stockListStore.searchTerm = e.target.value
  }

  render() {
    const { stockListStore } = this.props.rootStore.stores

    return(
      <div>
        <div className="form-group mb-4">
          <input type='text'
            className="form-control w-100"
            placeholder='회사명이나 코드를 입력하세요'
            value={stockListStore.searchTerm}
            onChange={this.search.bind(this)}
          />
        </div>

        <StockList
          stockList={stockListStore.filteredList}
          toggleWatching={stockListStore.toggleWatching}
        />
      </div>
    );
  }
}

export default AllStocks

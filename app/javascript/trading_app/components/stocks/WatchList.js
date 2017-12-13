import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import StockList from './StockList'

@inject('rootStore') @observer
class WatchList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.rootStore.stockListStore.getAssets().then(assets => {
    //   if(assets && assets.error) {console.log(assets.error)}
    // })
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate() {}

  componentWillReact() {}

  render() {
    const { stockListStore } = this.props.rootStore.stores
    return(
      <StockList
        stockList={stockListStore.watchedSymbolList}
        toggleWatching={stockListStore.toggleWatching}
      />
    );
  }
}

export default WatchList

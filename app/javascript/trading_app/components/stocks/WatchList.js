import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import StockList from './StockList'

@inject('kiwoomStore') @observer
class WatchList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.kiwoomStore.sls.getAssets().then(assets => {
      if(assets && assets.error) {console.log(assets.error)}
    })
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate() {}

  componentWillReact() {}

  render() {
    const { watchList, sls, serverAddress } = this.props.kiwoomStore

    return(
      <StockList
        stockList={watchList}
        toggleWatching={sls.toggleWatching}
      />
    );
  }
}

export default WatchList

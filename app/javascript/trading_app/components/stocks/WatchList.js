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
    // const { accountNo } = this.props.kiwoomStore.basicInfo
    //
    // this.props.kiwoomStore.getWatchList(accountNo).then(list => {
    //   if(list && list.error)  { console.log(list.error) }
    // })
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate() {}

  componentWillReact() {}

  render() {
    const { watchList, toggleWatching } = this.props.kiwoomStore

    return(
      <StockList
        stockList={watchList}
        watchList={watchList}
        toggleWatching={toggleWatching}
      />
    );
  }
}

export default WatchList

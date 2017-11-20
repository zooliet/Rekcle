import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

@inject('stockListStore', 'kiwoomStore') @observer
class MyStockList extends React.Component {
  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 50
    })

    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    // const { accountNo } = this.props.kiwoomStore.basicInfo
    //
    // this.props.stockListStore.getWatchList(accountNo).then(list => {
    //   if(list && list.error)  { console.log(list.error) }
    // })
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate() {}

  componentWillReact() {}

  renderRow = ({index, parent, key, style}) => {

    const { visibleList, watchList, toggleWatching } = this.props.stockListStore

    const company = visibleList[index].company
    const symbol = visibleList[index].symbol

    // const watched = watchList.map(stock => stock.symbol).includes(symbol)
    const watched = watchList.filter(stock => stock.watching).map(stock => stock.symbol).includes(symbol)
    const owned = watchList.find(stock => (stock.symbol === symbol && stock.shares) > 0)

    return(
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
        >
        <div style={style}>
          <div className='mb-2' style={{borderBottom: '1px solid #ddd'}}>
            <span className=''>{`${company} (${symbol})`}</span>
            <div>
              {
                owned &&
                <small>{`${owned.shares}주 보유`}</small>
              }
            </div>
          </div>
        </div>
      </CellMeasurer>
    )
  }

  render() {
    const { visibleList, watchList, applyFilterBy } = this.props.stockListStore

    return(
      <div>
        {
          visibleList.length > 0 &&

          <div style={{height: '70vh'}}>
            <AutoSizer>
              {
                ({width, height}) => (
                  <List
                    ref={node => this.list = node}
                    width={width}
                    height={height}
                    rowCount={watchList.length}
                    deferredMeasurementCache={this.cache}
                    rowHeight={this.cache.rowHeight}
                    rowRenderer={this.renderRow}
                    style={{outline: 'none'}}
                  />
                )
              }
            </AutoSizer>
          </div>
        }
      </div>
    );
  }
}

export default MyStockList

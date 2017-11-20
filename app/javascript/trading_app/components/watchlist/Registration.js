import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

@inject('stockListStore', 'kiwoomStore') @observer
class Registration extends React.Component {
  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 20
    })

    this.renderRow = this.renderRow.bind(this)
  }

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
                <small>{`${owned.shares}주 보유 · `}</small>
              }
              <small>
                <label htmlFor={`watch-${symbol}`}>관심 종목 등록</label>
                <input
                  type='checkbox'
                  className='ml-1'
                  id={`watch-${symbol}`}
                  ref={node => this.watched = node}
                  checked={watched}
                  onChange={(e) => {
                    toggleWatching(watched, {symbol, company})
                    this.list.forceUpdateGrid()
                  }}
                />
              </small>
            </div>
          </div>
        </div>
      </CellMeasurer>
    )
  }


  render() {
    const { visibleList, applyFilterBy } = this.props.stockListStore

    return(
      <div>
        <div className="form-group mb-4">
          <input type='text'
            className="form-control w-100"
            placeholder='회사명이나 코드를 입력하세요'
            ref={node => this.searchInput = node}
            onInput={() => applyFilterBy({type: 'SEARCH', filter: this.searchInput.value})}
          />

        </div>

        <div style={{height: '70vh'}}>
          <AutoSizer>
            {
              ({width, height}) => (
                <List
                  ref={node => this.list = node}
                  width={width}
                  height={height}
                  // rowCount={data.length}
                  rowCount={visibleList.length}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow}
                  style={{outline: 'none'}}
                />
              )
            }
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default Registration

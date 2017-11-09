import React from 'react';
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

@inject('stockListStore') @observer
class WatchList extends React.Component {
  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 20
    })

    this.renderRow = this.renderRow.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log('in componentWillReceiveProps()')
  }

  componentWillUpdate() {}

  componentWillReact() {}

  renderRow = ({index, parent, key, style}) => {

    const { visibleWatchList, excludedList, toggleWatching, toggleExcluding} = this.props.stockListStore

    const company = visibleWatchList[index].company
    const symbol = visibleWatchList[index].symbol

    const watched = visibleWatchList.map(stock => stock.symbol).includes(symbol)
    const excluded = excludedList.map(stock => stock.symbol).includes(symbol)

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
              <small className='ml-3'>
                <label htmlFor={`disable-${symbol}`}>자동 추천 금지</label>
                <input
                  type='checkbox'
                  className='ml-1'
                  id={`disable-${symbol}`}
                  ref={node => this.notRecommended = node}
                  checked={excluded}
                  onChange={(e) => {
                    toggleExcluding(excluded, {symbol, company})
                    this.list.forceUpdateGrid()
                  }}
                />
              </small>
            </div>
          </div>
          {/* <hr/> */}

        </div>
      </CellMeasurer>
    )
  }


  render() {
    const { visibleWatchList, applyFilterBy } = this.props.stockListStore

    return(
      <div>
        <div className="form-group mb-4">
          <input type='text'
            className="form-control w-100"
            placeholder='회사명이나 코드를 입력하세요'
            ref={node => this.searchInput = node}
            onInput={() => applyFilterBy({type: 'SEARCH_IN_WATCHLIST', filter: this.searchInput.value})}
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
                  rowCount={visibleWatchList.length}
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

export default WatchList

import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react';

import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

class StockList extends React.Component {
  constructor(props) {
    super(props)

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 20
    })
  }

  handleToggleWatching({watched, symbol, company}) {
    const { toggleWatching } = this.props

    toggleWatching({watched, symbol, company}).then(() => {
      this.list.forceUpdateGrid()
    })
  }

  renderRow = ({index, parent, key, style}) => {
    const { stockList } = this.props

    const { company, symbol, watching, shares } = stockList[index]
    const watched = watching

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
                shares > 0 &&
                <small>{`${shares}주 보유 · `}</small>
              }
              <small>
                <label htmlFor={`watch-${symbol}`}>관심 종목</label>
                <input
                  type='checkbox'
                  className='ml-1'
                  id={`watch-${symbol}`}
                  ref={node => this.watched = node}
                  checked={watched}
                  // onChange={this.handleToggleWatching.bind(this, list, {watched, symbol, company})}
                  onChange={this.handleToggleWatching.bind(this, {watched, symbol, company})}
                  // onChange={(e) => {
                  //   e.preventDefault()
                  //   toggleWatching(watched, {symbol, company}).then(() => {
                  //     this.list.forceUpdateGrid()
                  //   })
                  // }}
                />
              </small>
            </div>
          </div>
        </div>
      </CellMeasurer>
    )
  }

  render() {
    const { stockList } = this.props

    return(
      <div style={{height: '100vh'}}>
        {
          stockList.length > 0 &&
          <AutoSizer>
            {
              ({width, height}) => (
                <List
                  ref={node => this.list = node}
                  width={width}
                  height={height}
                  // rowCount={data.length}
                  rowCount={stockList.length}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowRenderer={this.renderRow.bind(this)}
                  style={{outline: 'none'}}
                />
              )
            }
          </AutoSizer>
        }
        {
          stockList.length === 0 &&
          <table className="table">
            <tbody>
              <tr>
                <td className='text-muted'><i>등록된 종목이 없습니다</i></td>
              </tr>
            </tbody>
          </table>
        }

      </div>
    );
  }
}

export default StockList

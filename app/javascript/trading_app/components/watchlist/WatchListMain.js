import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import PropTypes from 'prop-types'

import WatchListNav from './WatchListNav'
import WatchList from './WatchList'
// import ListRegistration from './ListRegistration'
// import RecommendedSetting from './RecommendedSetting'

class WatchListMain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      // <div className="jumbotron my-5">
      //   <h1 className='text-center'>종목 관리 화면입니다.</h1>
      // </div>
      <div className="my-5">
        <div className="row">
          <div className="col-md-3 col-lg-3">
            <WatchListNav />
          </div>

          <div className="col-md-9 col-lg-9 mt-5 mt-md-0">
            <Switch>
              <Route exact path='/watchlist' component={WatchList} />
              {/* <Route path='/watchlist/recommended' component={RecommendedSetting} />
              <Route path='/watchlist/registration' component={ListRegistration} /> */}
              <Route render={() => <h1 className='text-center'>잘못된 페이지입니다</h1>}  />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default WatchListMain

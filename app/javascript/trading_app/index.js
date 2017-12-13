import React from 'react';
import ReactDOM from 'react-dom';

import 'react-virtualized/styles.css'
// import 'react-switch-button/dist/react-switch-button.css';
// import 'react-select/dist/react-select.css';

import './style.css'
// import configureStore from './configureStore'
import RootStore from 'trading_app/store/RootStore'
import Root from './components/Root'

// const store = window.store = configureStore()
const store = window.store = new RootStore()

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('trading_app')
)

// ReactDOM.render(
//   <h1 className='text-center mt-5'>주식 자동 매매 데모</h1>,
//   document.getElementById('trading_app')
// );

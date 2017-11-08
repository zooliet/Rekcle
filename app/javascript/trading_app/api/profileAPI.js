import axios from 'axios'
import { v4 } from 'node-uuid'

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getAllSymbols = () => {
  // return delay(300).then(() => {
  //   return symbolDatabase.symbols.map( symbod => symbod )
  // })

  return axios.get('http://localhost:3000/api/v1/symbols')
    .then( response => response.data )
}

const getWatchList = () => {
  return axios.get('http://localhost:3000/api/v1/watchlist')
    .then( response => response.data )
}

export { getAllSymbols, getWatchList }

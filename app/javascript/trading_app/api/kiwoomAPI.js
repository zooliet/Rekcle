import axios from 'axios'
// import fakePromise from 'trading_app/lib/utils/fakePromise'
// import checkStatus from 'trading_app/lib/utils/checkStatus'
import handleAxiosError from 'trading_app/lib/utils/handleAxiosError'

const login = (url) => {
  // console.log(url)
  const data = {
    format: 'json'
  }
  return(
    axios.post(url, data)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const poweroff = (url) => {
  // console.log(url)
  const data = {
    format: 'json'
  }
  return(
    axios.post(url, data)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const checkBalance = (url) => {
  // console.log(url)
  return(
    axios.get(url)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const getAssets = (url) => {
  return(
    axios.get(url)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

export { login, poweroff, checkBalance, getAssets }

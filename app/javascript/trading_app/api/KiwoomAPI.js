import axios from 'axios'
import fakePromise from 'trading_app/lib/utils/fakePromise'
import checkStatus from 'trading_app/lib/utils/checkStatus'
import handleAxiosError from 'trading_app/lib/utils/handleAxiosError'

const login = (address) => {
  const url =  `http://${address}:5000/login`
  const data = {
    format: 'json'
  }
  // console.log(url)
  return(
    axios.post(url, data)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const poweroff = (address) => {
  const url =  `http://${address}:5000/poweroff`
  const data = {
    format: 'json'
  }
  // console.log(url)
  return(
    axios.post(url, data)
      .then(response => null)
      .catch(handleAxiosError)
  )
}

export { login, poweroff }

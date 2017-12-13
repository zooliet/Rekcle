import axios from 'axios'
// import fakePromise from 'trading_app/lib/utils/fakePromise'
// import checkStatus from 'trading_app/lib/utils/checkStatus'
import handleAxiosError from 'trading_app/lib/utils/handleAxiosError'

const login = (agentAddress) => {
  const url =  `http://${agentAddress}:5000/login`
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

const poweroff = (agentAddress) => {
  const url =  `http://${agentAddress}:5000/poweroff`
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

const checkBalance = (agentAddress, accountNo) => {
  const url =  `http://${agentAddress}:5000/check_balance/${accountNo}`
  // console.log(url)

  return(
    axios.get(url)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const getAssets = (agentAddress, accountNo) => {
  const url =  `http://${agentAddress}:5000/assets/${accountNo}`
  // console.log(url)

  return(
    axios.get(url)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

const getKiwoomEquations = (agentAddress) => {
  const url =  `http://${agentAddress}:5000/equations`
  // console.log(url)

  return(
    axios.get(url)
      .then(response => response.data)
      .catch(handleAxiosError)
  )
}

export { login, poweroff, checkBalance, getAssets, getKiwoomEquations }


const checkStatus = (response) => {
  // console.log(response.status)
  if ( response.status < 400) {
    return response.data //.json()
  } else {
    throw new Error(response.statusText)
  }
}

export default checkStatus

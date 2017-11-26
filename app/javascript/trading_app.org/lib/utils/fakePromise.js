
const fakePromise = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default fakePromise

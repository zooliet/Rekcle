
import faker from 'faker'

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const fakeCheckUserAPI = ( query = {} ) => {
  const fakeUsers = [
    { user: 'Claudio' },
    { user: 'FoxHound' },
    { user: 'SteveJobs' },
  ]

  return delay(1000).then(() => {
    // if(Math.random() > 0.99) {
    //   throw new Error('Boom')
    // }
    return fakeUsers.find(u => u.user === query.user)
  })
}

export {
  fakeCheckUserAPI,
}

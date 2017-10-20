
import faker from 'faker'

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}


const generateData = (count = 10) => {
  let data = []
  for (let i = 1; i < count; i++) {
    data.push({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      task: faker.name.jobArea(),
      randomHeight: getRandomIntInclusive(10, 100)
    })
  }

  return data
}

const makeOne = () => {
  return({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    task: faker.name.jobArea()
  })
}

export { generateData, makeOne }

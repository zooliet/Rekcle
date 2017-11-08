import { observable, computed, action, autorun } from 'mobx';
import { fakeCheckUserAPI } from 'trading_app/api/fakeAPI'
import faker from 'faker'

class FakeStore {
  @observable fakeList = {}
  constructor(webSocketService) {
    this.fakeList = {
      title: 'Fake Title'
    }
  }

  @action justTestAction(name) {
    console.log('Test Action fired')
    this.fakeList.title = name // faker.name.findName()
  }
}

export default FakeStore

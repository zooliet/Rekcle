const loadState = (item) => {
  try {
    const serializedState = localStorage.getItem(item)
    if(serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

const saveState = (item, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(item, serializedState)
  } catch (e) {}
}

export { loadState, saveState }

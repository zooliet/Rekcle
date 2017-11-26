
// import { fakeCheckUserAPI } from '../../../api/fakeAPI'
//
// const asyncRules = {
//   checkUser: (value, attr, key, passes) => {
//     fakeCheckUserAPI({user: value})
//       .then(items => (items && items.user === field.value) ? passes(false, msg) : passes())
//   }
// }

const rules = {
  telephone: {
    function: (value) => value.match(/^\d{3}-\d{3}-\d{4}$/),
    message: 'The :attribute phone number is not in the format XXX-XXX-XXXX.'
  }
}

const extendDvr = (validator) => {
  // Object.keys(asyncRules).forEach( key =>
  //   validator.registerAsyncRule(key, asyncRules[key])
  // )
  //
  Object.keys(rules).forEach( key => {
    validator.register(key, rules[key].function, rules[key].message)
  })
}

export default extendDvr

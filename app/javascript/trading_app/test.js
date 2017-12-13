rules = new Map()
stocks = new Map()

rules_jsons = [
  {id: 11, name: '룰11', expr: '방식11'},
  {id: 12, name: '룰12', expr: '방식12'},
  {id: 21, name: '룰22', expr: '방식21'},
  {id: 22, name: '룰21', expr: '방식22'},
  {id: 31, name: '룰31', expr: '방식31'},
  {id: 32, name: '룰32', expr: '방식32'},
  {id: 41, name: '룰41', expr: '방식41'},
  {id: 42, name: '룰42', expr: '방식42'},
  {id: 51, name: '룰51', expr: '방식51'},
  {id: 52, name: '룰52', expr: '방식52'},
]

stocks_jsons = [
  {id: 1, code: '001', name: '삼성', rules: [11, 12]},
  {id: 2, code: '002', name: '현대', rules: [21, 22]},
  {id: 3, code: '003', name: 'LG', rules: [31, 32]},
  {id: 4, code: '004', name: 'SK', rules: [41, 42]},
  {id: 5, code: '005', name: '한화', rules: [51, 52]}
]

rules_jsons.forEach(json => {
  const {id, name, expr} = json
  rules.set(id, {id, name, expr})
})

stocks_jsons.forEach(json => {
  const {id, code, name, rules} = json
  stocks.set(code, {code, name, rules})
})

[...stocks.values()].map(stock => {
  return {code: stock.code, name: stock.name, rule: rules.get(stock.rules[0]).name}
})



// class Rule {
//   constructor(id, name, expr) {
//     this.id = id
//     this.name = name
//     this.expr = expr
//   }
// }
//
// class Stock {
//   constructor(id, code, name, rules) {
//     this.id = id
//     this.code = code
//     this.name = name
//     // this.rules = rules
//     // this.rules = []
//     this.rules = rules
//     // rules.forEach(rule => {
//     //   const {id, name, expr} = rule
//     //   const r = new Rule(id, name, expr)
//     //   this.rules.push(r)
//     // })
//   }
// }
//
// const stocks = []
// const rules = []
//
// rules_jsons = [
//   {id: 11, name: '룰11', expr: '방식11'},
//   {id: 12, name: '룰12', expr: '방식12'},
//   {id: 21, name: '룰22', expr: '방식21'},
//   {id: 22, name: '룰21', expr: '방식22'},
//   {id: 31, name: '룰31', expr: '방식31'},
//   {id: 32, name: '룰32', expr: '방식32'},
//   {id: 41, name: '룰41', expr: '방식41'},
//   {id: 42, name: '룰42', expr: '방식42'},
//   {id: 51, name: '룰51', expr: '방식51'},
//   {id: 52, name: '룰52', expr: '방식52'},
// ]
//
// rules_jsons.forEach(json => {
//   const {id, name, expr} = json
//   const r = new Rule(id, name, expr)
//   rules.push(r)
// })
//
//
// stocks_jsons = [
//   {id: 1, code: '001', name: '삼성', rules: [11, 12]},
//   {id: 2, code: '002', name: '현대', rules: [21, 22]},
//   {id: 3, code: '003', name: 'LG', rules: [31, 32]},
//   {id: 4, code: '004', name: 'SK', rules: [41, 42]},
//   {id: 5, code: '005', name: '한화', rules: [51, 52]}
// ]
//
// stocks_jsons.forEach(json => {
//   const {id, code, name, rules} = json
//   const s = new Stock(id, code, name, rules )
//   stocks.push(s)
// })

/////////////////////////////////////////////////////////////////////////////

// r13 = new Rule(id= 31, name= '룰13', expr= '룰13')
// stocks[0].rules.push(r13)


// class Rule {
//   constructor(id, name, expr) {
//     this.id = id
//     this.name = name
//     this.expr = expr
//   }
// }
//
// class Stock {
//   constructor(id, code, name, rules) {
//     this.id = id
//     this.code = code
//     this.name = name
//     // this.rules = rules
//     this.rules = []
//     rules.forEach(rule => {
//       const {id, name, expr} = rule
//       const r = new Rule(id, name, expr)
//       this.rules.push(r)
//     })
//   }
// }
//
// const stocks = []
//
//
// jsons = [
//   {id: 1, code: '001', name: '삼성', rules: [
//     {id: 11, name: '룰11', expr: '방식11'},
//     {id: 12, name: '룰11', expr: '방식12'}
//   ]},
//   {id: 2, code: '002', name: '현대', rules: [
//     {id: 21, name: '룰22', expr: '방식21'},
//     {id: 22, name: '룰21', expr: '방식22'}
//   ]},
//   {id: 3, code: '003', name: 'LG', rules: [
//     {id: 31, name: '룰31', expr: '방식31'},
//     {id: 32, name: '룰32', expr: '방식32'}
//   ]},
//   {id: 4, code: '004', name: 'SK', rules: [
//     {id: 41, name: '룰41', expr: '방식41'},
//     {id: 42, name: '룰42', expr: '방식42'}
//   ]},
//   {id: 5, code: '005', name: '한화', rules: [
//     {id: 51, name: '룰51', expr: '방식51'},
//     {id: 52, name: '룰52', expr: '방식52'}
//   ]}
// ]
//
// jsons.forEach(json => {
//   const {id, code, name, rules} = json
//   const s = new Stock(id, code, name, rules )
//   stocks.push(s)
// })
//
//
// r13 = new Rule(id= 31, name= '룰13', expr= '룰13')
// stocks[0].rules.push(r13)

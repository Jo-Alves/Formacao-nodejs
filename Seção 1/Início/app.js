// let calculator = require('./calculator')
let {sum, sub, div, mult} = require('./calculator')

// console.log(`${calculator.sum(3, 33)}`)
// console.log(`${calculator.sub(36, 33)}`)
// console.log(`${calculator.mult(36, 33)}`)
// console.log(`${calculator.div(3, 36)}`)

console.log(`Soma: ${sum(3, 33)}`)
console.log(`Subtração: ${sub(36, 33)}`)
console.log(`Multiplicação: ${mult(36, 33)}`)
console.log(`Divisão: ${div(3, 36)}`)
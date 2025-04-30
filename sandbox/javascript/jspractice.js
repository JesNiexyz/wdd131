const Pi = 3.14;

let Radius = 3;



let Area = Radius * Radius * Pi;

console.log(Area)

const One = 1;
const Two = '2';

let result = One * Two;
console.log(result)

result = One + Number(Two)
console.log(result)

let globalVariable = 'I\'m a global variable';
function myFunction (){
    let blockVariable = 'I\'m a block variable';
    console.log(blockVariable);
}

console.log(globalVariable)

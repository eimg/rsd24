// Array destructure
const arr = [1, 2];
const [n1, n2] = arr;           
console.log(n1);

// Object destructure
const user = { name: 'Alice', age: 22 };
const { name, age } = user;     
console.log(name);

const num1 = [1, 2];
const num2 = [8, 9];
const num3 = [num1, num2];      
console.log(num3);
const num4 = [...num1, ...num2];   
console.log(num4);

const add = function(a, b) {
    console.log( a + b );
}
add(1, 2);

// Arrow Function
const sum = (a, b) => a + b;
console.log( sum(2, 3) );

// Parameter Destructuring
function hello({ name }) {
    console.log(`Hello ${name}`);
}
hello({ name: 'Bob' });

// IIFE
((a, b) => {
    console.log(a - b);
})(4, 1);

// Higher-order function
const fn = () => () => {
	console.log("Done");
};
fn()();

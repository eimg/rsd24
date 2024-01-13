const users = [
    { id: 1, name: 'Alice', age: 23 },
    { id: 2, name: 'Bob', age: 20 },
    { id: 3, name: 'Chris', age: 24 },
    { id: 4, name: 'Dave', age: 19 },
];


// Add item to array
const result = [
    ...users, 
    { id: 5, name: 'Eve', age: 22 }
];

// map, filter
console.log( result.map(user => user.name) );
console.log( result.filter(user => user.age >=20 ) );
console.log( result.filter(user => user.age >=20 ).map(user => user.name) );

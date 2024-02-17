const jwt = require("jsonwebtoken");

const token = jwt.sign({ name: 'Tom', role: 'admin' }, 'secret');
console.log(token);

const data = jwt.verify(token, 'secret');
console.log(data);

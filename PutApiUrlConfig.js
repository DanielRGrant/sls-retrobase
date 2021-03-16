const fs = require('fs');
const fileName = './src/jsconfig.json';
const file = require(fileName);

console.log(process.argv)
file.apiUrl = process.argv[2];
    
fs.writeFileSync(fileName, JSON.stringify(file));
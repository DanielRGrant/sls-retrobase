const fs = require('fs');
const fileName = './src/jsconfig.json';
const file = require(fileName);

file.queryApiUrl = process.argv[2];
    
fs.writeFileSync(fileName, JSON.stringify(file));
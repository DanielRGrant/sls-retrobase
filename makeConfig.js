const fs = require('fs');
const fileName = './src/config.json';

var file = {
    queryApiUrl: process.argv[2],
    auth0Audience: process.argv[3],
    auth0Domain: process.argv[4],
    auth0ClientId: process.argv[5],
}

    
fs.writeFileSync(fileName, JSON.stringify(file));
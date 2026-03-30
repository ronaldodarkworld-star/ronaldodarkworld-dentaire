const fs = require('fs');
let c = fs.readFileSync('js/chatbot.js', 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$/g, '$');
fs.writeFileSync('js/chatbot.js', c);
console.log('Fixed js/chatbot.js');

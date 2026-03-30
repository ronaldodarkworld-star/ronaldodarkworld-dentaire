const fs = require('fs');
fs.readdirSync('.').forEach(f => {
    if (f.endsWith('.html')) {
        let c = fs.readFileSync(f, 'utf8');
        if (!c.includes('js/chatbot.js')) {
            c = c.replace(/<\/body>/, '<script src="js/chatbot.js"></script>\n</body>');
            fs.writeFileSync(f, c);
            console.log('Injected into ' + f);
        }
    }
});

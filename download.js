const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const baseUrl = 'https://html.awaikenthemes.com/dentaire/';
const targetDir = 'C:\\Users\\ronal\\.gemini\\antigravity\\scratch\\dentaire';

const htmlContent = fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8');

// Regex to find all href="", src=""
const regexUrl = /(?:href|src)=["']([^"']+)["']/gi;
let match;
const urlsToDownload = new Set();

while ((match = regexUrl.exec(htmlContent)) !== null) {
    const url = match[1];
    // Filter to relative urls only
    if (!url.startsWith('http') && !url.startsWith('//') && !url.startsWith('javascript:')) {
        urlsToDownload.add(url);
    }
}

urlsToDownload.delete('./');
urlsToDownload.delete('#');
urlsToDownload.delete('index-2.html');
urlsToDownload.delete('index.html');
urlsToDownload.delete('index-3.html');
urlsToDownload.delete('index-4.html');
urlsToDownload.delete('index-5.html');
urlsToDownload.delete('about.html');
urlsToDownload.delete('service.html');
urlsToDownload.delete('service-single.html');
urlsToDownload.delete('blog.html');
urlsToDownload.delete('blog-single.html');
urlsToDownload.delete('team.html');
urlsToDownload.delete('team-single.html');
urlsToDownload.delete('gallery.html');
urlsToDownload.delete('technology.html');
urlsToDownload.delete('testimonials.html');
urlsToDownload.delete('faqs.html');
urlsToDownload.delete('404.html');
urlsToDownload.delete('contact.html');
urlsToDownload.delete('appointment.html');

// Add index.html as download? No, we have it.
console.log('URLs to download:', urlsToDownload);

function downloadFile(urlPath) {
    const fullUrl = baseUrl + urlPath;
    const destPath = path.join(targetDir, urlPath);
    const dir = path.dirname(destPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);
    https.get(fullUrl, function(response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();  // close() is async, call cb after close completes.
                console.log(`Downloaded ${urlPath}`);
            });
        } else {
            console.log(`Failed to download ${urlPath}: ${response.statusCode}`);
            file.close();
            fs.unlink(destPath, () => {});
        }
    }).on('error', function(err) { // Handle errors
        fs.unlink(destPath, () => {}); // Delete the file async. (But we don't check the result)
        console.error(`Error downloading ${urlPath}: ${err.message}`);
    });
}

for(let url of urlsToDownload) {
    downloadFile(url);
}

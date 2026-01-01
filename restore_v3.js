const fs = require('fs');
const path = require('path');

const REGEX_CORRUPT = /[ðâÃ][Ÿ…†Žï¿½]/g;

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory && !f.includes('node_modules') && !f.includes('.git')) {
            walk(dirPath, callback);
        } else if (!isDirectory) {
            callback(dirPath);
        }
    });
}

const fixFile = (filePath) => {
    if (!filePath.match(/\.(html|js|json|md)$/)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove leading junk (like ï¿½ or whitespace)
    if (content.startsWith('ï¿½') || content.charCodeAt(0) > 65000) {
        console.log(`Cleaning leading junk: ${filePath}`);
        content = content.replace(/^[^<]+(?=<!DOCTYPE)/i, '');
    }

    // 2. Detect Mojibake
    if (!REGEX_CORRUPT.test(content)) return;

    console.log(`Fixing encoding: ${filePath}`);

    try {
        // Map common Mojibake directly if possible, or use the latin1-to-utf8 trick
        // We'll use the buffer manipulation which is more robust for general emojis
        const buf = Buffer.from(content, 'latin1');
        const fixed = buf.toString('utf8');

        if (fixed !== content && fixed.includes('<!DOCTYPE')) {
            fs.writeFileSync(filePath, fixed, 'utf8');
            return true;
        }
    } catch (e) {
        console.error(`Error fixing ${filePath}: ${e.message}`);
    }
    return false;
};

walk('.', fixFile);
console.log('Restoration complete.');

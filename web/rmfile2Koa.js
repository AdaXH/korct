const path = require('path');
const mv = require('mv');
const fs = require('fs');

// fs.cop;

fs.rmdirSync('../dist/public/web-dist', { recursive: true });

mv(path.join(__dirname, 'web-dist'), '../dist/public/web-dist', { mkdirp: true }, (e) => {
  if (e) console.log(e);
});

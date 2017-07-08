const fs = require('fs');

rmDir = function(dirPath) { // https://gist.github.com/liangzan/807712/8fb16263cb39e8472d17aea760b6b1492c465af2#gistcomment-337828
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
        else
        rmDir(filePath);
    }
    //fs.rmdirSync(dirPath); // no reason to delete dir
};

rmDir(process.cwd() + '/lib/');
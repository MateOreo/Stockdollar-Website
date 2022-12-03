const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        startmenu: './src/stockdollar.js',
        sendenMenu: './src/senden.js',
        mining: './src/mining.js'
      },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]bundle.js',
  },
};

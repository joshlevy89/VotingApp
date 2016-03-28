var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const PORT = 3000;

const server = new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
});

server.listen(PORT, 'localhost', function (err, result) {
if (err) {
    return console.log(err);
}
console.log('Front end server listening at http://localhost:' + PORT);
});


var http = require('http');
var httpProxy = require('http-proxy');
var globalLog = require('global-request-logger');

var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

  proxy.web(req, res, {
    target: process.env.PROXY_CORS_URL,
    prependPath: false,
    xfwd: false
  });
}).listen(8000);



//debug

globalLog.initialize();

globalLog.on('success', function(request, response) {
  console.log('SUCCESS');
  console.log('Request', request);
  console.log('Response', response);
});

globalLog.on('error', function(request, response) {
  console.log('ERROR');
  console.log('Request', request);
  console.log('Response', response);
});

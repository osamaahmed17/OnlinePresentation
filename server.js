/*
	 Licensed Materials - Property of IBM
	 (C) Copyright IBM Corp. 2016. All Rights Reserved.
	 US Government Users Restricted Rights - Use, duplication or
	 disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
	 */

/**
 * Webservice API for Nostro-Vostro App
 *
 * It uses restify node module to support the REST API. It also uses several other
 * node modules to perform various other functionalities.
 *
 * Note: List of supported API endopints are at the bottom of this file that
 * can give a good starting point to understand the code and the flow.
 *
 *
 * Run Options:
 *  -c config file
 *  -s static file directory (run ./setup.sh to copy the UI dist folder into ui directory)
 *  -p port for the service. Default port is 8080
 *
 * Run command example: node server.js -c config/server.json -p 8081 -s ui
 */

var restify = require('restify');
var fs = require('fs');
var log4js = require('log4js');
var uuid = require('node-uuid');
var argv = require('minimist')(process.argv.slice(2));
var logger = log4js.getLogger();


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var config = JSON.parse(fs.readFileSync('config/server.json', 'utf8'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


logger.debug(JSON.stringify(config, null, ' '));

/*************************** COMMAND LINE FLAGS **************************/
var CONFIG_FLAG = 'c';
var PORT_FLAG = 'p';
var STATIC_CONTENT_FLAG = 's';

/*************************** Initialize and Start Service **********************/
var app = {
	config: {},

	server: null,

	// Maximum number of records in response
	PAGE_SIZE: 10,

	slotSize: 60, // graph slot size in minutes

	virtualTimeIncrement: 120, // in seconds

	initilize: function(config) {
		//appEnv.port
		//this.config = config;
		config.server.port=appEnv.port;
		this.config=config;

		// override the port if specified on command line
		if (argv[PORT_FLAG]) {
			this.config.server.port = argv[PORT_FLAG];
		}

		this.createServer();
	},

	createServer: function() {
		// create the server
		var server = restify.createServer({
			name: this.config.server.name
		});

		// setup CORS
		server.use(restify.CORS());

		// throttle config
		server.use(restify.throttle({
			burst: 100,
			rate: 50,
			ip: true,
			overrides: {
				'127.0.0.1': {
					rate: 0,        // unlimited
					burst: 0
				}
			}
		}));

		// body parser
		server.use(restify.bodyParser());

		this.server = server;
	},

};

// Initialize the app
app.initilize(config);

// start the server
var server = app.server;

if (server && server.listen(app.config.server.port)) {
	logger.debug(app.config.server.name + ' is running at: localhost:' + app.config.server.port);
} else {
	logger.debug('Could not start server');
	process.exit(1);
}


/******************** STATIC FILES **********************/

function setHeaders(res, path) {
	res.setHeader('Cache-Control', 'no-cache');
	 
}

server.get('/.*', restify.serveStatic({
	directory: argv[STATIC_CONTENT_FLAG] ? argv[STATIC_CONTENT_FLAG] : __dirname + config.staticContentDir,
	default: 'index.html',
	charSet: 'utf-8',
	maxAge: 0,
	setHeaders: setHeaders
}));

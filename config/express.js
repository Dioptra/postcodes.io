var logger = require("commonlog-bunyan").logger,
		logStream, = {
			write: function (message, encoding) {
				logger.info(message.slice(0, -1));
			}
		};

module.exports = function (app, config) {
	app.use(express.favicon("public/favicon.ico"));
	app.use(express.logger({ stream: logStream }));
	// Renderer
	// Errors
	// 404s
	app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

	app.configure(function() {
		app.enable('trust proxy');
		app.disable('x-powered-by');
		app.use(express.bodyParser());
		app.use(express.router);
		
		app.use(function (error, request, response, next) {
			var message = "Something went wrong: " + error.message;
			if (config.env !== production) message = "500 Error! Something broke )-:";
			response.send(500, message);
		});

		app.use(function (request, response) {
			response.status(404).render("404");
		});
	});
}
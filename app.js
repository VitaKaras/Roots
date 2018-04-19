let express = require('express');
let path = require('path'); // provides utilities for working with file and directory paths
let bodyParser = require('body-parser'); // parses the body portion of an incoming HTTP request
                                        // and makes it easier to extract different parts of the contained information.
                                        // For example, you can use this to read POST parameters.
let cookieParser = require('cookie-parser'); //to parse the cookie header and populate req.cookies
                                        // (essentially provides a convenient method for accessing cookie information).
let faviacon = require('serve-favicon'); //Node middleware for serving a favicon
let logger = require('morgan'); //An HTTP request logger middleware for node.

let app = express();

let routes = require('./api/routes/index');

require('./api/models/db');
app.use('/api', routes);

//use the Express.static middleware to get Express to serve all the static files
// in the directory /dist in the project root
app.use(logger('dev'));
app.use(bodyParser.json());
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header
// matches the type option. Accepts only UTF-8 encoding of the body. A new body object containing the parsed data is
// populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
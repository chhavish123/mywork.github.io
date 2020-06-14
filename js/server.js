var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
@@ -21,7 +22,7 @@ mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(express.static(__dirname + '/public'));

app.use(multer({dest: './uploads/'}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true,
				 store: new MongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60 })}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.set('view engine', 'ejs');
var public_router = express.Router();
require('./app/routes/public.js')(public_router);
app.use('/public', public_router);
var api = express.Router();
require('./app/routes/api.js')(api, passport);
app.use('/api', api);

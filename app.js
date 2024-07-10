var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')
var app = express();


require('dotenv').config()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function setupRoutes() {
  // Setup the routes
  const routes = require('./routes');
  routes.setup(app);
}

setupRoutes();



// Port to listen
const port = process.env.PORT
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Event listeners for connection events
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = app;

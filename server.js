const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const foods = require('./routes/foods');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middleware
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet({ contentSecurityPolicy: false}));

//Prevent XSS attacks
app.use(xss());

//Limited requests to 100 per 10 mins
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Prevent cors errors
app.use(cors());

//Mount routers
app.use('/api/v1/foods', foods);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//404 not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'pagenotfound.html'));
})


app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server and exit process
    server.close(() => process.exit(1));
});
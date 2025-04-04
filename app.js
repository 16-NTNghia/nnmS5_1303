var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var roleRouter = require('./routes/role');
var productRouter = require('./routes/product');
var productAttributeRouter = require('./routes/productAttribute');
var categoryRouter = require('./routes/category');
var supplierRouter = require('./routes/supplier');
var menuRouter = require('./routes/menu');
var authRouter = require('./routes/auth');
const { CreateErrorResponse } = require('./utils/responseHandler');

var app = express();

mongoose.connect('mongodb://localhost:27017/QLSP')
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/role', roleRouter);
app.use('/product', productRouter);
app.use('/product_attribute', productAttributeRouter);
app.use('/category', categoryRouter);
app.use('/supplier', supplierRouter);
app.use('/menu', menuRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    CreateErrorResponse(res,err.message,err.status||500);
});


module.exports = app;

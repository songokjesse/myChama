const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const routes = require('./routes')
const Users = require('./routes/users')
const PORT = process.env.PORT || 3000

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(logger('combined'))
app.use(cors())

app.use('/', routes)
app.use('/api/v1/users', Users)

//catch 404 and forward to error handler
app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') == 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`Listening on post :${PORT}`)
})




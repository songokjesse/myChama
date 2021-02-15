const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(logger('combined'))
app.use(cors())

app.use('/', routes)
app.listen(PORT, () => {
    console.log(`Listening on post :${PORT}`)
})




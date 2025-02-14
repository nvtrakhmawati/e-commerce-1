if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === "test") {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan   = require('morgan')
const port = process.env.PORT || 3000
const route = require('./routes')
const mongoose = require('mongoose')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true}, (err) => {
    if(err) console.log('mongoose connection failed');
    else console.log('mongoose connection success');
});

app.use('/', route)

module.exports = app

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
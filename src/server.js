var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()
var mongoose = require('mongoose')
var dbURL = "mongodb+srv://sivapreethi:1234qwe@cluster0.6eduu.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('Mongodb database connection', err)
})
const cors = require('cors')

app.use(cors())

var PRODUCTS = mongoose.model('product', {
    id: Number,
    product: {
        productid: Number,
        category: String,
        price: Number,
        name: String,
        instock: Boolean
    }
})

app.use(express.static(__dirname))

app.get('/product/get', (req, res) => {
    console.log("hello")

    PRODUCTS.find({}, (err, product) => {
        console.log("Got all products")
        res.json(product)
    })
    // res.send('hi')
})

app.post('/product/create', jsonParser, (req, res) => {
    // console.log(req)
    console.log(req.body)
    console.log('entered')
    let newproduct = new PRODUCTS(req.body)
    newproduct.save((err) => {
        if (err) {
            console.log("is is an error")
        } else {
            console.log("no error")
        }
    })
    console.log("SAVED")
    res.send("YOYOYOYOYOYOYOYOYO")
})

app.delete('/product/delete/:deleteid', (req, res) => {
    // console.log(req)
    console.log(req.body)
    console.log(req.params.deleteid)
    console.log('entered')
    PRODUCTS.deleteOne({id: req.params.deleteid}, (err) => {
        if (err) {
            console.log("There is an error")
        } else {
            console.log("no error")
        }
    })
    console.log("deleted da macha")
    res.send("YOYOYOYOYOYOYOYOYO")
})
var server = app.listen(3001, () => {
    console.log('server', server.address().port)
})
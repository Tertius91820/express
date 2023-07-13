const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const connectionString = 'mongodb+srv://Jubber:jgvbjZU65pBzvCgC@cluster0.bnpuo64.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes')

    //tell express we are using ejs as the template engine
    app.set('view engine','ejs')

    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    // R -Read => Get
    app.get('/',(req,res) => {
      quotesCollection.find().toArray()
      .then(results =>{
        console.log(results);
        //res.sendFile('/Users/Tertius/Desktop/100Devs/express/index.html')<=Moving away from .html to .ejs below
        res.render('index.ejs', {quotes: results})
      })
      .catch(error => console.error(error))
      
    })

    // C -Create => Post 
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
      .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
    })

    app.put('/quotes', (req,res) =>{
      console.log(req.body);
    })

   app.listen(3000, function () {
    console.log('listening on 3000');
   })

  })
  .catch(error => console.error(error))




 
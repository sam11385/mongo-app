const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}))


const uri = "mongodb+srv://user1:Password1@cluster0-dbqft.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    client.db('test').collection('quotes').insertOne(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
    });
    console.log(req.body)
  })
})

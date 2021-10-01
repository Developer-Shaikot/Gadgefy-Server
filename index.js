const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5055

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ifp7e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection error: ', err)
  const cameraCollection = client.db("gadgefy").collection("camera");
  // perform actions on the collection object

  app.get('/addCameras', (req, res) => {
    cameraCollection.find()
      .toArray((error, items) => {
        res.send(items)
      })
  })



  app.post('/addCameras', (req, res) => {
    newCameras = req.body;
    console.log(newCameras);
    cameraCollection.insertOne(newCameras)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/addCamera/:id', (req, res) => {
    cameraCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((error, items) => {
        res.send(items)
      })
  })


  app.post('/addCamera',(req,res)=>{
    newCameras = req.body;
    console.log(newCameras);
    cameraCollection.insertOne(newCameras)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })


  //   client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()
const ObjectId = require('mongodb').ObjectId;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const port = 27017


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.muahx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("authenticITService").collection("services");
    const testimonialCollection = client.db("authenticITService").collection("testimonials");
    const bookingCollection = client.db("authenticITService").collection("booking");
    const adminCollection = client.db("authenticITService").collection("admin");
        if (err) {
            console.log("database not connected", err);
        } else {  

            app.post('/add-service', (req, res) => {
                const service = req.body;
                servicesCollection.insertOne(service)
                  .then(result => {
                    res.send(result.insertedCount > 0)
                  })
              })

            app.get('/manage-service', (req, res) => {
                servicesCollection.find({})
                .toArray((err, document) => {
                res.send(document)
                })
            })

            app.delete('/delete/:id', (req, res) => {
                servicesCollection.deleteOne({ _id: ObjectId(req.params.id) })
                  .then(result => {
                    res.send(result.deletedCount > 0)
                  })
              })

            app.get('/services', (req, res) => {
                servicesCollection.find({})
                .toArray((err, document) => {
                res.send(document)
                })
            })

            app.post('/add-testimonial', (req, res) => {
                const testimonial = req.body;
                testimonialCollection.insertOne(testimonial)
                  .then(result => {
                    res.send(result.insertedCount > 0)
                  })
              })

            app.get('/testimonial', (req, res) => {
              testimonialCollection.find({})
                .toArray((err, document) => {
                res.send(document)
                })
            })
          
            app.post('/add-booking', (req, res) => {
              const booking = req.body;
              bookingCollection.insertOne(booking)
                .then(result => {
                  res.send(result.insertedCount > 0)
                })
            })

            app.get('/booking', (req, res) => {
              bookingCollection.find({email: req.query.email})
                .toArray((err, document) => {
                res.send(document)
                })
            })
            app.get('/all-booking', (req, res) => {
              bookingCollection.find({})
                .toArray((err, document) => {
                res.send(document)
                })
            })

            app.post('/make-admin', (req, res) => {
              const admin = req.body;
              adminCollection.insertOne(admin)
                .then(result => {
                  res.send(result.insertedCount > 0)
                })
            })

            app.get('/admin', (req, res) => {
              adminCollection.find({})
              .toArray((err, document) => {
              res.send(document)
              })
          })

            app.get('/', (req, res) => {
                res.send('Hello World')
            })

        }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
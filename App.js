const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const dotenv = require('dotenv');
dotenv.config();
var cors = require("cors");
app.use(cors());
app.use(express.json());
var bodyParser = require("body-parser");


const port = 3002;

const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true });

app.get("/api/get/:id", async (req, res) => {
  try {
    await client.connect();
    const id = req.params.id;
    const filter = {
        'word': id
      };
    const coll = client.db("db1").collection("worddb");
    const cursor = coll.find(filter);
    const result = await cursor.toArray();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/api/get/", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("db1");
    const items = await db.collection("worddb").find().toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put("/api/put/", async (req, res) => {
  try {
    // get the item ID from the URL parameter

    // get the updated item data from the request body

    // connect to the database
    await client.connect();
    const db = client.db("db1");
    // update the item in the collection

    const result = await db.collection("worddb").insertOne(req.body);
    // return the result of the update operation
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

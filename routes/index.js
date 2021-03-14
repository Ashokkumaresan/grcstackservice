var express = require("express");
var cors = require("cors");
var app=express();
const path = require("path");
var router = express.Router();
var mongo = require("mongodb");
var ObjectID = require("mongodb").ObjectID;
router.use(cors());

path.basename("/");

var url =
  "mongodb+srv://hotshotsolutions:Hotshot@321@cluster0-5if9n.mongodb.net/grcstack?retryWrites=true&w=majority";
router.get("/api/login", function (req, res) {
  var query = req.body;
  console.log("input", req.body);
  MongoClient = mongo.MongoClient;  

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log("Error in connecting database");
    } else {
      console.log("connected");
      var db = client.db("grcstack");      
      db.collection("login").findOne(
        { username: query.username, password: query.password },
        function (findErr, result) {
          if (findErr) throw findErr;
          console.log(result);
          if (result) res.json(result);
          else res.json({ error: "Invalid User name or password" });
          client.close();
        }
      );
    }
  });
});

router.post("/api/voting", function (req, res) {
  console.log("In Post");
  var query = req.body;
  console.log("input", req.body);
  MongoClient = mongo.MongoClient;
  //var url='mongodb://localhost/SA';
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log("Error in connecting database");
    } else {
      console.log("connected");
      var db = client.db("grcstack");    
      db.collection("votingresponse").insert(query, function (findErr, result) {
        if (findErr) throw findErr;
        console.log(result);
        if (result) res.json("Success");
        else res.json({ error: "Invalid Request" });
        client.close();
      });
    }
  });
});
module.exports = router;
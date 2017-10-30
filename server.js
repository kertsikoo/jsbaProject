var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var IMAGES_COLLECTION = "images";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://kertsikoo:imagedb@ds111535.mlab.com:11535/imagedb', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// IMAGES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

//To find all images and to add a new image:

app.get("/api/images", function(req, res){
    db.collection(IMAGES_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to find images.");
        } else {
          res.status(200).json(docs);
        }
      });

});

app.post("/api/images", function(req,res){
    var newImage = req.body;
    newImage.createDate = new Date();

      if (!req.body.description) {
        handleError(res, "Invalid user input", "Must provide a description.", 400);
      }
    
      db.collection(IMAGES_COLLECTION).insertOne(newImage, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to add a new image.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
});
 
// To get a specific image, to update a specific image and to delete a specific image

app.get("/api/images/:id", function(req, res) {
    db.collection(IMAGES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to get image");
        } else {
          res.status(200).json(doc);
        }
      });
});

app.put("/api/images/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(IMAGES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update image");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
});

app.delete("/api/images/:id", function(req, res) {
    db.collection(IMAGES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete image");
        } else {
          res.status(200).json(req.params.id);
        }
      });
});
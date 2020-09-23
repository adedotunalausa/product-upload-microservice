const express = require("express");
var router = express.Router();
var ObjectID = require("mongoose").Types.ObjectId

var { Product, Variety } = require("../models/products");

router.get("/", (req, res) => {
  Product.find((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Error while retrieving records: " + JSON.stringify(err, undefined, 2));
    }
  });
});

router.post("/", (req, res) => {

  const newVarieties = new Variety({
    size: req.body.product_varieties.size,
    color: req.body.product_varieties.color,
    quantity: req.body.product_varieties.quantity,
    price: req.body.product_varieties.price
  })

  const newRecord = new Product({
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_varieties: [newVarieties],
    date_uploaded: req.body.date_uploaded,
    date_edited: req.body.date_edited
  });

  newRecord.save((err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Error while creating new record: " + JSON.stringify(err, undefined, 2));
    }
  });

});

router.post("/", (req, res) => {
  if (req.file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/products-client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filename: file.name, filePath: `/uploads/${file.name}` })
  })
})

router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record with given id: " + req.params.id)
  }

  const updatedVarieties = {
    size: req.body.size,
    color: req.body.color,
    quantity: req.body.quantity,
    price: req.body.price
  }

  var updatedRecord = {
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_varieties: [updatedVarieties],
    date_uploaded: req.body.date_uploaded,
    date_edited: req.body.date_edited
  }

  Product.findByIdAndUpdate(req.params.id,
    { $set: updatedRecord }, { new: true }, (err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log("Error while updating a record: " + JSON.stringify(err, undefined, 2));
      }
    });

});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record with given id: " + req.params.id)
  }

  Product.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      console.log("Error while deleting a record: " + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router
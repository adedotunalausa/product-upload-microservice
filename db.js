const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/productsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("Mongodb connection succeded");
    } else {
      console.log("Error while connecting mongodb: " + JSON.stringify(err, undefined, 2));
    }
  });
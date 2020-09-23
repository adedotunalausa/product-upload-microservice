const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const varietySchema = new Schema(
  {
    size: { type: Number },
    color: { type: String },
    quantity: { type: Number },
    price: { type: Number }
  }
)

const productSchema = new Schema(
  {
    product_name: { type: String },
    product_description: { type: String },
    product_varieties: [varietySchema],
    date_uploaded: { type: Date },
    date_edited: { type: Date }
  }
);

const Product = mongoose.model("Product", productSchema);
const Variety = mongoose.model("Variety", varietySchema);

module.exports = { Product, Variety }
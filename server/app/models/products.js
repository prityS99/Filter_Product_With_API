const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    size: {
      type: [String],
    },

    color: {
      type: [String],
    },

    image: {
      type: String,
      default:
        "default.png",
    },

    brand: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;

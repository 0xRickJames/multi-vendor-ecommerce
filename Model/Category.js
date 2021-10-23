const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model("category", categoriesSchema);

module.exports = Category;


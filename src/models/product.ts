import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  description: String,
  imgUrl: String,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
  },
});

export const product = mongoose.model("product", productSchema);

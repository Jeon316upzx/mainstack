import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const store = mongoose.model("store", storeSchema);

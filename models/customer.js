const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip_code: { type: String, required: false },
  user_img: { type: String, required: false },
  plants: { type: Array, required: false },
});

module.exports = mongoose.model("Customer", customerSchema)
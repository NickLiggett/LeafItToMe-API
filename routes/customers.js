const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

// Getting All
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getCustomer, (req, res) => {
  res.send(res.customer);
});

// Creating One
router.post("/", async (req, res) => {
  const customer = new Customer({
    first_name: req.body.first_name,
    username: req.body.username,
    password: req.body.password,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    user_img: req.body.user_img,
    plants: req.body.plants,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getCustomer, async (req, res) => {
  if (req.body.first_name != null) {
    res.customer.first_name = req.body.first_name;
  }
  if (req.body.username != null) {
    res.customer.username = req.body.username;
  }
  if (req.body.password != null) {
    res.customer.password = req.body.password;
  }
  if (req.body.city != null) {
    res.customer.city = req.body.city;
  }
  if (req.body.state != null) {
    res.customer.state = req.body.state;
  }
  if (req.body.zip_code != null) {
    res.customer.zip_code = req.body.zip_code;
  }
  if (req.body.user_img != null) {
    res.customer.user_img = req.body.user_img;
  }
  if (req.body.plants != null) {
    res.customer.plants = req.body.plants;
  }
  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getCustomer, async (req, res) => {
  try {
    await res.customer.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.customer = customer;
  next();
}

module.exports = router;

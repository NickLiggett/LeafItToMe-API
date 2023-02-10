const express = require("express");
const customers = require("./customers");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.get("/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found.");
  res.send(customer);
});

app.post("/customers/:id/plants", (req, res) => {
  const id = req.params.id;
  const customerIndex = customers.findIndex(
    (customer) => customer.id === parseInt(id)
  );

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  const newPlant = {
    id: customers[customerIndex].plants.length + 1,
    species: req.body.species,
    img: req.body.img,
    instructions: req.body.instructions,
  };

  customers[customerIndex].plants.push(newPlant);
  res.json(customers[customerIndex].plants);
});

app.patch("/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer)
    res.status(404).send("The customer with the given ID was not found.");

  const property = req.body.property;
  const value = req.body.value;
  customer[property] = value;

  res.send(customer);
});

app.delete("/customers/:customerId/plants/:plantId", (req, res) => {
  const customerId = req.params.customerId;
  const plantId = req.params.plantId;
  let customerIndex = customers.findIndex(
    (customer) => customer.id == customerId
  );
  if (customerIndex === -1) {
    return res.status(404).send({ message: "Customer not found" });
  }
  let plantIndex = customers[customerIndex].plants.findIndex(
    (plant) => plant.id == plantId
  );
  if (plantIndex === -1) {
    return res.status(404).send({ message: "Plant not found" });
  }
  customers[customerIndex].plants.splice(plantIndex, 1);
  res.send({ message: "Plant removed successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

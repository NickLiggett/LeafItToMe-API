const express = require("express");
const customers = require("./customers");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/customers", (request, response) => {
  response.status(200).json({ customers: customers });
});

app.get("/customers/:id", (request, response) => {
  const singleUser = customers.find(
    (customer) => customer.id === parseInt(request.params.id)
  );
  response.status(200).json({ customer: singleUser });
});

app.post("/customers/add", (request, response) => {
  const newCustomer = {
    id: request.body.id,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    username: request.body.username,
    password: request.body.password,
    city: request.body.city,
    state: request.body.state,
    zip_code: request.body.zip_code,
    user_img: request.body.user_img,
    plants: [],
  };
  customers.push(newCustomer);
  response.status(200).json({ customers: customers });
});

app.post("/customer/addPlant/:id", (request, response) => {
  const newPlant = {
    plant_id: request.body.plant_id,
    species: request.body.species,
    img: request.body.img,
    instructions: request.body.instructions,
  };
  const theCustomer = customers.find(
    (customer) => customer.id === parseInt(request.params.id)
  );
  theCustomer.plants.push(newPlant);
  response.status(200).json({ plants: theCustomer.plants });
});

app.delete("/:id", (request, response) => {
  const filteredCustomers = customers.filter(
    (customer) => customer.id !== parseInt(request.params.id)
  );
  response.status(200).json({ customers: filteredCustomers });
});

app.delete("/customer/:id/plant/:plantID", (request, response) => {
  const theCustomer = customers.find(
    (customer) => customer.id === parseInt(request.params.id)
  );
  const index = theCustomer.plants.findIndex(
    (plant) => plant.id === request.params.plantID
  );
  theCustomer.plants.splice(index, 1);
  response.status(200).json({ plants: theCustomer.plants });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

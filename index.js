require("dotenv").config()
const express = require("express");
// const customers = require("./customers.json");
const mongoose = require("mongoose")
const app = express();
const db = mongoose.connection
const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.DATABASE_URL)
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to Database"))

app.use(express.json());

const customersRouter = require("./routes/customers")
app.use("/customers", customersRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

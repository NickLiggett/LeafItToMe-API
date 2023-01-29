const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (request, response) => {
    response.status(200).json({ message: "Hello from the Leaf Server!" })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

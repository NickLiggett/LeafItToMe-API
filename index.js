const express = require("express");
const members = require("./members");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (request, response) => {
  response.status(200).json({ members: members });
});

app.post("/", (request, response) => {
  const newMember = {
    id: request.body.id,
    name: request.body.name,
    age: request.body.age,
  };
  members.push(newMember);
  response.status(200).json({ members: members });
});

app.delete("/:id", (request, response) => {
  const filteredMembers = members.filter(
    (member) => member.id !== parseInt(request.params.id)
  );
  response.status(200).json({ members: filteredMembers });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

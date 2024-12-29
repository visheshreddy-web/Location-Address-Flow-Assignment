const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let addresses = [];

app.post("/api/addresses", (req, res) => {
  const newAddress = {
    id: addresses.length + 1,
    ...req.body,
  };
  addresses.push(newAddress);
  res.status(201).json(newAddress);
});

app.get("/api/addresses", (req, res) => {
  res.json(addresses);
});

app.put("/api/addresses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = addresses.findIndex((addr) => addr.id === id);
  if (index !== -1) {
    addresses[index] = { ...addresses[index], ...req.body };
    res.json(addresses[index]);
  } else {
    res.status(404).json({ error: "Address not found" });
  }
});

app.delete("/api/addresses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  addresses = addresses.filter((addr) => addr.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API opérationnelle pour PCA/PRA !");
});

app.listen(3000, () => {
  console.log("Serveur API démarré sur le port 3000");
});

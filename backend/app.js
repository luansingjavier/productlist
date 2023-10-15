const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  setTimeout(() => {
    const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
    const searchTerm = req.query.name;
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      res.send(filteredProducts);
    } else {
      res.send(products);
    }
  }, 1000);
});

app.post("/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newProduct = req.body;
  const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
  products.push(newProduct);
  fs.writeFileSync("products.json", JSON.stringify(products));
  res.send(products);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

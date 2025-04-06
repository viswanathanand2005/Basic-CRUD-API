import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
const app = express();
const port = 3000;

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://chviswanath2:m37KTZ9gMpOI0KJr@api-create.4dkwv7f.mongodb.net/?retryWrites=true&w=majority&appName=API-Create"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch(() => {
    console.log("Connection successfully");
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Create
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Read
app.get("/api/view", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.send(500).json({ message: error.message });
  }
});

app.get("/api/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update
app.put("/api/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Automatically return the updated document if it exists.

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id.trim(); // Trim any whitespace or newline
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let products = [
  { id: 1, name: "MacBook Pro M4 ", price: 3000 },
  { id: 2, name: "iPhone 17", price: 1000 },
  { id: 3, name: "Apple Watch Series 11", price: 500 },
];

exports.getAllProducts = (req, res) => {
  try {
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.getSingleProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

exports.createProduct = (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      name,
      price,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

exports.updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;

  try {
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex] = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price || products[productIndex].price,
    };

    res.status(200).json(products[productIndex]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

exports.deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const initialLength = products.length;
    products = products.filter((p) => p.id !== productId);

    if (products.length === initialLength) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

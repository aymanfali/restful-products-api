const products = [
  { id: 1, name: "MacBook Pro M4 ", price: 3000 },
  { id: 2, name: "iPhone 17", price: 1000 },
  { id: 2, name: "Apple Watch Series 11", price: 500 },
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

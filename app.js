const express = require("express");
const path = require("path");
const { products } = require("./data");
const { headers } = require("./middleware");
const app = express();

const port = 3000 || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(headers);

app.get("/", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "./pages/welcome.html"));
});

app.get("/products", (req, res) => {
	return res.status(200).json(products);
});

app.get("/products/:productId", (req, res) => {
	const searchedProduct = products.find(
		(product) => product.id === parseInt(req.params.productId)
	);
	if (!searchedProduct) {
		return res
			.status(404)
			.json({ message: "Product not found", success: false });
	}
	return res.status(200).json(searchedProduct);
});

app.post("/products", (req, res) => {
	// Accessing the request data in product variable.
	const product = req.body;
	products.push(product);
	return res.status(200).json(products);
});

app.put("/products/:productId", (req, res) => {
	const updatedProduct = req.body;
	const productToUpdate = products.find(
		(product) => product.id === parseInt(req.params.productId)
	);
	// Type till here.
	productToUpdate.id = updatedProduct.id;
	productToUpdate.name = updatedProduct.name;
	productToUpdate.image = updatedProduct.image;
	productToUpdate.price = updatedProduct.price;
	productToUpdate.desc = updatedProduct.desc;

	return res.status(200).json(productToUpdate);
});

app.delete("/products/:productId", (req, res) => {
	const newProducts = products.filter((product) => {
		return product.id !== parseInt(req.params.productId);
	});
	res.setHeader("Access-Control-Allow-Origin", "[*]");

	return res.status(200).json(newProducts);
});

app.all("*", (req, res) => {
	res.status(200).sendFile(path.resolve(__dirname, "./pages/404.html"));
});

app.listen(port, () => {
	console.log(`App is running at http://localhost:${port}`);
});

import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GGClient from "../../../api/GGClient";
import { uploadsUrl } from "../../../api/utils";

function NurseryProducts() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/nursery/products/list");
			if (data.success) {
				const products = data.data;
				setProducts(products);
			}
		})();
	}, []);

	const deleteProduct = async (id) => {
		if (window.confirm("Are you sure?")) {
			const { data } = await GGClient.post(
				`/nursery/products/delete/${id}`
			);
			if (data.success) {
				setProducts((products) => {
					const ps = products.filter((p) => p._id !== id);
					return [...ps];
				});
			}
		}
	};

	return (
		<>
			<div className="text-center mb-5">
				<h1>Products</h1>
				<div>
					<Button as={Link} to="/nursery/products/create">
						Create
					</Button>
				</div>
			</div>
			<Table className="bg-white" striped bordered hover>
				<thead>
					<tr>
						<th>Picture</th>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{products.length < 1 && (
						<td colSpan={3} className="text-center">
							No products yet.
						</td>
					)}
					{products.map((product) => (
						<tr>
							<td>
								<img
									src={uploadsUrl(product.picture)}
									height={80}
									alt=""
								/>
							</td>
							<td>{product.name}</td>
							<td>
								<Button
									variant="danger"
									size="sm"
									onClick={deleteProduct.bind(
										null,
										product._id
									)}
								>
									Delete
								</Button>
								&nbsp;
								<Button
									as={Link}
									to={`/nursery/products/edit/${product._id}`}
									variant="secondary"
									size="sm"
								>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}

export default NurseryProducts;

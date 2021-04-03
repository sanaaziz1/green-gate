import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router";
import GGClient from "../../api/GGClient";
import ProductCard from "../productCard";

function Search() {
	const { query } = useParams();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(
				`/products/search?query=${query}`
			);
			if (data.success) {
				setProducts(data.data);
			}
		})();
	}, [query]);

	return (
		<div>
			<h1 className="display-5 mb-3">Search for "{query}"</h1>
			{products.length ? (
				<Row>
					{products.map((product) => (
						<ProductCard product={product} />
					))}
				</Row>
			) : (
				"No result was found."
			)}
		</div>
	);
}

export default Search;

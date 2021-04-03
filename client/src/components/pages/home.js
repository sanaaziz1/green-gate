import React, { useEffect, useState } from "react";
import { Button, Carousel, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import GGClient from "../../api/GGClient";
import { settingsState } from "../../atoms/settings";
import Loading from "../loading";
import ProductCard from "../productCard";

function Home() {
	const [products, setProducts] = useState();
	const settings = useRecoilValue(settingsState);

	useEffect(() => {
		(async () => {
			const productsRes = await GGClient.get("/products/list/?limit=3");
			if (productsRes.data.success) {
				setProducts(productsRes.data.data);
			}
		})();
	}, []);

	return (
		<>
			<Carousel>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="media/freddie-marriage-UcfKYTan-LU-unsplash.jpg"
						alt="1st slide"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="media/brina-blum-s5-NmxNA-7c-unsplash.jpg"
						alt="2nd slide"
					/>
				</Carousel.Item>
			</Carousel>

			<Jumbotron className="my-5 rounded-0">
				<h1 className="display-3">{settings.title}</h1>
				<p className="lead">{settings.description}</p>
				<p>
					<Button as={Link} to="/nursery/sign-up" variant="primary">
						Sign-up as Nursery
					</Button>
				</p>
			</Jumbotron>
			<section>
				<h1 className="display-5">Latest</h1>
				<Row>
					{products ? (
						products.map((product, i) => (
							<ProductCard product={product} key={i} />
						))
					) : (
						<Loading />
					)}
				</Row>
				<div className="d-flex justify-content-center py-3">
					<Button as={Link} to="/products" variant="primary">
						See more
					</Button>
				</div>
			</section>
		</>
	);
}

export default Home;

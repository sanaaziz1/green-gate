import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
	Form,
	Button,
	Container,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";
import {
	isAdminAuthenticated,
	isNurseryAuthenticated,
	isUserAuthenticated,
} from "../atoms/auth";

const RLink = (props) => {
	return (
		<NavLink
			activeStyle={{
				borderBottom: "2px solid #f6f6f6",
			}}
			{...props}
		/>
	);
};

function MainMenu() {
	const _isNurseryAuthenticated = useRecoilValue(isNurseryAuthenticated);
	const _isUserAuthenticated = useRecoilValue(isUserAuthenticated);
	const _isAdminAuthenticated = useRecoilValue(isAdminAuthenticated);
	const history = useHistory();

	const doSearch = (e) => {
		e.preventDefault();
		const query = e.target.query.value;
		if (query) {
			history.push(`/search/${query}`);
		}
	};

	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<NavLink to="/" component={Navbar.Brand}>
					Green Gate
				</NavLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<RLink to="/products" component={Nav.Link}>
							Products
						</RLink>
						<RLink to="/about" component={Nav.Link}>
							About Us
						</RLink>
						{_isNurseryAuthenticated ? (
							<RLink to="/nursery/dashboard" component={Nav.Link}>
								Dashboard
							</RLink>
						) : (
							<NavDropdown
								title="Nursery"
								id="basic-nav-dropdown"
							>
								<RLink
									to="/nursery/sign-up"
									component={NavDropdown.Item}
								>
									Sign-up
								</RLink>
								<RLink
									to="/nursery/sign-in"
									component={NavDropdown.Item}
								>
									Sign-in
								</RLink>
							</NavDropdown>
						)}
						{_isUserAuthenticated ? (
							<RLink to="/user/dashboard" component={Nav.Link}>
								Dashboard
							</RLink>
						) : (
							<NavDropdown title="User" id="basic-nav-dropdown">
								<RLink
									to="/user/sign-up"
									component={NavDropdown.Item}
								>
									Sign-up
								</RLink>
								<RLink
									to="/user/sign-in"
									component={NavDropdown.Item}
								>
									Sign-in
								</RLink>
							</NavDropdown>
						)}
						{_isAdminAuthenticated && (
							<RLink to="/admin/dashboard" component={Nav.Link}>
								Admin
							</RLink>
						)}
					</Nav>
					<Form
						inline
						onSubmit={doSearch}
						style={{
							flexBasis: 290,
							justifyContent: "flex-end",
							flexShrink: 0,
						}}
					>
						<FormControl
							type="search"
							name="query"
							id="query"
							placeholder="Search"
							className="mr-sm-2"
							style={{ maxWidth: 200 }}
						/>
						<Button
							type="submit"
							variant="secondary"
							style={{ width: 75 }}
						>
							Search
						</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default MainMenu;

import React from 'react';
import { Navbar, NavbarBrand, Container } from 'reactstrap';
import PropTypes from 'prop-types';

const AppNavbar = ({ title }) => {
	return (
		<Navbar color='dark' dark>
			<Container>
				<NavbarBrand href='/' className='mr-auto'>
					{title}
				</NavbarBrand>
			</Container>
		</Navbar>
	);
};

AppNavbar.defaultProps = {
	title: 'CRUD Person'
};

AppNavbar.propTypes = {
	title: PropTypes.string.isRequired
};

export default AppNavbar;

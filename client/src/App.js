import React, { Fragment } from 'react';
import AppNavbar from './components/layout/AppNavbar';
import Person from './components/persons/Person';
import Alert from './components/layout/AppAlert';
import { Container } from 'reactstrap';
import './App.css';
// redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<Fragment>
				<AppNavbar />
				<Container className='py-4'>
					<Alert />
					<Person />
				</Container>
			</Fragment>
		</Provider>
	);
};

export default App;

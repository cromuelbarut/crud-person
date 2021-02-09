import React, { useEffect } from 'react';
import PersonItem from '../persons/PersonItem';
import Spinner from '../layout/Spinner';
import AddPersonModal from '../layout/AddPersonModal';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { getPeople } from '../../_actions/personActions';
import PropTypes from 'prop-types';

const Person = ({ people, fetchLoading, getPeople }) => {
	useEffect(() => {
		getPeople();
		// eslint-disable-next-line
	}, []);

	if (fetchLoading) {
		return <Spinner />;
	}

	return (
		<div className='py-3'>
			<AddPersonModal />
			<h4 className='mb-3'>Persons list</h4>
			{!fetchLoading && people.length > 0 ? (
				<Table striped borderless hover>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Firstname</th>
							<th scope='col'>Lastname</th>
							<th scope='col'>Age</th>
							<th scope='col'>Address</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{people.length !== 0 &&
							!fetchLoading &&
							people.map((person, idx) => (
								<PersonItem
									key={person._id}
									number={idx + 1}
									person={person}
								/>
							))}
					</tbody>
				</Table>
			) : (
				<p className='text-muted'>No person to show, Add some now.</p>
			)}
		</div>
	);
};

Person.propTypes = {
	getPeople: PropTypes.func.isRequired,
	people: PropTypes.array.isRequired,
	fetchLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	people: state.person.people,
	fetchLoading: state.person.fetchLoading
});

export default connect(mapStateToProps, { getPeople })(Person);

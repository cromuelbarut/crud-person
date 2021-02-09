import React from 'react';
import { connect } from 'react-redux';
import { deletePerson } from '../../_actions/personActions';
import UpdatePersonModal from '../../components/layout/UpdatePersonModal';
import PropTypes from 'prop-types';

const PersonItem = ({ number, person, deletePerson }) => {
	const { _id, firstname, lastname, age, address } = person;
	return (
		<tr>
			<th scope='row'>{number}</th>
			<td>{firstname}</td>
			<td>{lastname}</td>
			<td>{age}</td>
			<td>{address}</td>
			<td>
				<i
					className='fas fa-trash text-danger btn-delete'
					onClick={() => deletePerson(_id)}
				></i>
				<UpdatePersonModal person={person} />
			</td>
		</tr>
	);
};

PersonItem.propTypes = {
	number: PropTypes.number.isRequired,
	person: PropTypes.object.isRequired,
	deletePerson: PropTypes.func.isRequired
};

export default connect(null, { deletePerson })(PersonItem);

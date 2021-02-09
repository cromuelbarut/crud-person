import React, { Fragment, useState } from 'react';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPerson } from '../../_actions/personActions';
import PropTypes from 'prop-types';

const AddPersonModal = ({ loading, addPerson }) => {
	const [modal, setModal] = useState(false);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		age: '',
		address: ''
	});
	const { firstname, lastname, age, address } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		if (firstname !== '' && lastname !== '' && age !== '' && address !== '') {
			addPerson(formData);

			setFormData({
				firstname: '',
				lastname: '',
				age: '',
				address: ''
			});

			toggle();
		}

		e.preventDefault();
	};

	const toggle = () => setModal(!modal);

	return (
		<Fragment>
			<Button
				color='primary'
				onClick={toggle}
				className='btn-sm mb-4'
				disabled={loading}
			>
				{!loading ? (
					<Fragment>Add Person</Fragment>
				) : (
					<Fragment>
						<i className='fas fa-fan fa-spin'></i> Loading ...
					</Fragment>
				)}
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					<span className='text-primary'>Add</span> Person
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={onSubmit}>
						<Row form>
							<Col md='6'>
								<FormGroup>
									<Label htmlFor='firstname'>Firstname</Label>
									<Input
										type='text'
										id='firstname'
										name='firstname'
										className='form-control'
										placeholder='Enter firstname...'
										value={firstname}
										onChange={onChange}
									/>
								</FormGroup>
							</Col>
							<Col md='6'>
								<FormGroup>
									<Label htmlFor='lastname'>Lastname</Label>
									<Input
										type='text'
										id='lastname'
										name='lastname'
										className='form-control'
										placeholder='Enter lastname...'
										value={lastname}
										onChange={onChange}
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row form>
							<Col md='6'>
								<FormGroup>
									<Label htmlFor='age'>Age</Label>
									<Input
										type='number'
										id='age'
										name='age'
										className='form-control'
										placeholder='Enter age...'
										value={age}
										onChange={onChange}
									/>
								</FormGroup>
							</Col>
							<Col md='6'>
								<FormGroup>
									<Label htmlFor='address'>Address</Label>
									<Input
										type='text'
										id='address'
										name='address'
										className='form-control'
										placeholder='Enter address...'
										value={address}
										onChange={onChange}
									/>
								</FormGroup>
							</Col>
							<Button type='submit' color='primary' size='sm' block>
								Add person
							</Button>
						</Row>
					</Form>
				</ModalBody>
			</Modal>
		</Fragment>
	);
};

AddPersonModal.propTypes = {
	addPerson: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	loading: state.person.loading
});

export default connect(mapStateToProps, { addPerson })(AddPersonModal);

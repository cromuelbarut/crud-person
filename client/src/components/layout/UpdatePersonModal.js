import React, { useEffect, useState } from 'react';
import {
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { updatePerson, setCurrent } from '../../_actions/personActions';
import PropTypes from 'prop-types';

const UpdatePersonModal = ({ current, person, updatePerson, setCurrent }) => {
	const [modal, setModal] = useState(false);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		age: '',
		address: ''
	});
	const { firstname, lastname, age, address } = formData;

	useEffect(() => {
		if (current) {
			setFormData(current);
		}

		// eslint-disable-next-line
	}, [current]);

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		if (firstname !== '' && lastname !== '' && age !== '' && address !== '') {
			updatePerson({ id: current._id, ...formData });

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
		<div className='d-inline'>
			<i
				className='fas fa-edit text-warning ml-2 btn-edit'
				onClick={() => {
					setCurrent(person);
					toggle();
				}}
			></i>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					<span className='text-warning'>Update</span> Person
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
							<Button type='submit' color='warning' size='sm' block>
								Update person
							</Button>
						</Row>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

UpdatePersonModal.propTypes = {
	updatePerson: PropTypes.func.isRequired,
	setCurrent: PropTypes.func.isRequired,
	current: PropTypes.object
};

const mapStateToProps = state => ({
	current: state.person.current
});

export default connect(mapStateToProps, { updatePerson, setCurrent })(
	UpdatePersonModal
);

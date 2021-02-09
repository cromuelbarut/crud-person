import axios from 'axios';
import { setAlert } from './alertActions';
import {
	GET_PEOPLE,
	// GET_PERSON,
	ADD_PERSON,
	DELETE_PERSON,
	UPDATE_PERSON,
	SET_CURRENT,
	FETCH_LOADING,
	SET_LOADING,
	PERSON_ERROR
} from './types';

export const getPeople = () => async dispatch => {
	dispatch({ type: FETCH_LOADING });

	try {
		const res = await axios.get('/api/person');

		dispatch({
			type: GET_PEOPLE,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
		dispatch({
			type: PERSON_ERROR,
			payload: err
		});
	}
};

export const addPerson = formData => async dispatch => {
	dispatch({ type: SET_LOADING });

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/person', formData, config);

		dispatch({
			type: ADD_PERSON,
			payload: res.data.data
		});

		dispatch(setAlert('success', 'Person added'));
	} catch (err) {
		dispatch({
			type: PERSON_ERROR,
			payload: err
		});
	}
};

export const deletePerson = id => async dispatch => {
	dispatch({ type: SET_LOADING });

	try {
		await axios.delete(`/api/person/${id}`);

		dispatch({
			type: DELETE_PERSON,
			payload: id
		});

		dispatch(setAlert('success', 'Person deleted'));
	} catch (err) {
		dispatch({
			type: PERSON_ERROR,
			payload: err
		});
	}
};

export const updatePerson = formData => async dispatch => {
	dispatch({ type: SET_LOADING });

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put(
			`/api/person/${formData._id}`,
			formData,
			config
		);

		dispatch({
			type: UPDATE_PERSON,
			payload: res.data.data
		});

		dispatch(setAlert('success', 'Person updated'));
	} catch (err) {
		dispatch({
			type: PERSON_ERROR,
			payload: err
		});
	}
};

export const setCurrent = person => dispatch => {
	dispatch({
		type: SET_CURRENT,
		payload: person
	});
};

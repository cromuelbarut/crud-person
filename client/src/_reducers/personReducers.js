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
} from '../_actions/types';

const initialState = {
	person: null,
	people: [],
	current: null,
	fetchLoading: false,
	loading: false,
	error: null
};

const personReducers = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_PEOPLE:
			return {
				...state,
				people: payload,
				fetchLoading: false
			};
		// case GET_PERSON:
		// 	return {
		// 		...state,
		// 		person: payload,
		// 		loading: false
		// 	};
		case ADD_PERSON:
			return {
				...state,
				people: [payload, ...state.people],
				loading: false
			};
		case DELETE_PERSON:
			return {
				...state,
				people: state.people.filter(person => person._id !== payload),
				loading: false
			};
		case UPDATE_PERSON:
			return {
				...state,
				people: state.people.map(person =>
					person._id === payload._id ? payload : person
				),
				current: null,
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: payload
			};
		case FETCH_LOADING:
			return {
				...state,
				fetchLoading: true
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case PERSON_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
};

export default personReducers;

import { combineReducers } from 'redux';
import personReducer from './personReducers';
import alertReducers from './alertReducers';

export default combineReducers({
	person: personReducer,
	alert: alertReducers
});

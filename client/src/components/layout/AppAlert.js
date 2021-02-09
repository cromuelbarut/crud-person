import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AppAlert = ({ alerts }) => {
	return (
		alerts.length > 0 &&
		alerts.map(alert => (
			<Alert key={alert.id} color={alert.type}>
				<i className='fas fa-info-circle'></i> {alert.msg}
			</Alert>
		))
	);
};

const mapStateToProps = state => ({
	alerts: state.alert
});

AppAlert.propTypes = {
	alerts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AppAlert);

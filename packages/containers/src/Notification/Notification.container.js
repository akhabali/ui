import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { Notification as Component } from 'react-talend-components';
import { componentState } from 'react-cmf';

export const DEFAULT_STATE = new Map({
	notifications: new List(),
});

function Notification(props) {
	const state = (props.state || DEFAULT_STATE).toJS();
	return (
		<Component
			leaveFn={i => props.deleteNotification(i)}
			notifications={state.notifications}
		/>
	);
}

Notification.displayName = 'Container(Notification)';
Notification.propTypes = {
	deleteNotification: PropTypes.func,
	...componentState.propTypes,
};

export default Notification;

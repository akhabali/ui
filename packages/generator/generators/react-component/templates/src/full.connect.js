import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './<%= props.name %>.container';

export function mapStateToProps(state, ownProps, cmfProps) {
	// cmfProps.state
	const props = {};
	return props;
}

export default cmfConnect({
	componentId: '<%= props.name %>',  // can be a function
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(Container);

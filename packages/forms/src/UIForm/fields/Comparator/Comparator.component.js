import PropTypes from 'prop-types';
import React from 'react';
import last from 'lodash/last';

import ActionDropdown from '@talend/react-components/lib/Actions/ActionDropdown';
import Text from '../Text';
import Widget from '../../Widget';

import theme from './Comparator.scss';

/**
 * Adapt part (operator or value) schema
 * @param schema The Comparator schema
 * @param part 'operator' or 'value'
 */
function getPartSchema(schema, part) {
	const childKey = schema.key.concat(part);
	const childrenSchemas = schema.items || [];
	let childSchema = childrenSchemas.find(item => last(item.key) === part);
	if (!childSchema) {
		childSchema = {};
	}
	return {
		...childSchema,
		key: childKey,
		autoFocus: schema.autoFocus || childSchema.autoFocus,
		disabled: schema.disabled || childSchema.disabled,
		readOnly: schema.readOnly || childSchema.readOnly,
	};
}

class Comparator extends React.Component {
	constructor(props) {
		super(props);

		const { name: label, value } = this.getOperatorSchema().titleMap[0];
		this.state = {
			selected: { label, value },
		};

		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(_, selected) {
		this.setState({ selected });
	}

	getOperatorSchema = getPartSchema.bind(this, this.props.schema, 'operator');
	getValueSchema = getPartSchema.bind(this, this.props.schema, 'value');

	render() {
		const operators = this.getOperatorSchema();

		return (
			<div>
				<ActionDropdown
					id="context-dropdown-related-items"
					label={this.state.selected.label}
					onSelect={this.onSelect}
					disabled={operators.disabled}
					items={operators.titleMap.map((option, index) => ({
						id: `comparison-operator-${index}`,
						label: option.value,
						value: option.value,
					}))}
				/>
				<Widget {...this.props} schema={this.getValueSchema()} />
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	Comparator.propTypes = {
		...Text.propsTypes,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			key: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			items: PropTypes.array,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}

export default Comparator;

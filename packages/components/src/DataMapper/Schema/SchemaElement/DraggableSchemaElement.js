import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import { ItemTypes, SchemaType } from '../../Constants';
import SchemaElement from './SchemaElement.js';

const elementSource = {
	beginDrag(props) {
		return {
			elementId: props.name,
			schemaType: props.schemaType,
		};
	},
};

const elementTarget = {
	drop(props, monitor) {
		const sourceElem = monitor.getItem();
		props.performMapping(sourceElem.elementId, props.name);
	},
	canDrop(props, monitor) {
		const sourceElem = monitor.getItem();
		return props.schemaType !== sourceElem.schemaType && sourceElem.schemaType === SchemaType.INPUT;
	},
};

function collectForDragSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectForDropTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		dragOver: monitor.isOver(),
	};
}

class DraggableSchemaElement extends Component {
	render() {
		const {
			name,
			schemaType,
			mapped,
			connectDragSource,
			connectDropTarget,
			onSelect,
			selected,
		} = this.props;
		const highlighted = this.props.dragOver;
		return connectDragSource(
			connectDropTarget(
				<div>
					<SchemaElement
						highlighted={highlighted}
						mapped={mapped}
						name={name}
						schemaType={schemaType}
						selected={selected}
						onSelect={onSelect}
					/>
				</div>,
			),
		);
	}
}

DraggableSchemaElement.propTypes = {
	name: PropTypes.string,
	schemaType: PropTypes.string,
	mapped: PropTypes.bool,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	onSelect: PropTypes.func,
	dragOver: PropTypes.func,
	selected: PropTypes.bool,
};

export default flow(
	DragSource(ItemTypes.ELEMENT, elementSource, collectForDragSource),
	DropTarget(ItemTypes.ELEMENT, elementTarget, collectForDropTarget),
)(DraggableSchemaElement);

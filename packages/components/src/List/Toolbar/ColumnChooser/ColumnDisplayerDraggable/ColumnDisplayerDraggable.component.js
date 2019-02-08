import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ColumnDisplayer from '../ColumnDisplayer';

const COLUMN_CHOOSER_ROW = 'COLUMN_CHOOSER_ROW';

const columnDisplaySource = {
	beginDrag(props) {
		return props;
	},
};

const columnDisplayTarget = {
	canDrop(props, monitor) {
		const item = monitor.getItem();
		return !item.locked;
	},
	drop(props, monitor) {
		props.onChangeOrder(props.order + 1);
		const item = monitor.getItem();
		item.onChangeOrder(props.order);
		props.onDragAndDrop();
	},
};

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

function collectTarget(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		canDrop: monitor.canDrop(),
	};
}

const ColumnDisplayerDraggable = ({ connectDropTarget, connectDragSource, ...rest }) => {
	return connectDropTarget(
		connectDragSource(
			<div>
				<ColumnDisplayer {...rest} />
			</div>,
		),
	);
};

export default new DropTarget(COLUMN_CHOOSER_ROW, columnDisplayTarget, collectTarget)(
	new DragSource(COLUMN_CHOOSER_ROW, columnDisplaySource, collectSource)(ColumnDisplayerDraggable),
);

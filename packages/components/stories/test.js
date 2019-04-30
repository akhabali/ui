/* eslint-disable react/prop-types */
import React from 'react';

import Draggable from 'react-draggable';

import VirtualizedList from '../src/VirtualizedList';
import CellTitle from '../src/VirtualizedList/CellTitle';
import CellBadge from '../src/VirtualizedList/CellBadge';

import test from './test.scss';

const TOTAL_WIDTH = 500;

// eslint-disable-next-line react/prop-types
export default class Hello extends React.Component {
	state = {
		widths: {
			name: 0.5,
			tag: 0.5,
			description: 0.5,
		},
	};

	header = ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) => {
		return (
			<React.Fragment key={dataKey}>
				<div
					className={test['ReactVirtualized__Table__headerTruncatedText']}
					style={{ flex: 'auto' }}
				>
					{label}
				</div>
				<Draggable
					axis="x"
					defaultClassName={test['DragHandle']}
					defaultClassNameDragging={test['DragHandleActive']}
					onDrag={(event, { deltaX }) =>
						this.resizeRow({
							dataKey,
							deltaX,
						})
					}
					position={{ x: 0 }}
					zIndex={999}
				>
					<span className={test['DragHandleIcon']}>⋮</span>
				</Draggable>
			</React.Fragment>
		);
	};

	resizeRow = ({ dataKey, deltaX }) =>
		this.setState(prevState => {
			const prevWidths = prevState.widths;
			const percentDelta = deltaX / TOTAL_WIDTH;

			// This is me being lazy :)
			const nextDataKey = dataKey === 'name' ? 'tag' : 'description';

			return {
				widths: {
					...prevWidths,
					[dataKey]: prevWidths[dataKey] + percentDelta,
					[nextDataKey]: prevWidths[nextDataKey] - percentDelta,
				},
			};
		});

	render() {
		const { collection, titleProps } = this.props;
		const { widths } = this.state;
		return (
			<VirtualizedList
				collection={collection}
				id={'my-list'}
				height={300}
				headerHeight={20}
				rowHeight={30}
				rowCount={collection.length}
				rowGetter={({ index }) => collection[index]}
			>
				<VirtualizedList.Content
					headerRenderer={this.header}
					label="Name"
					dataKey="name"
					columnData={titleProps}
					width={widths.name * TOTAL_WIDTH}
					{...CellTitle}
				/>
				<VirtualizedList.Content
					headerRenderer={this.header}
					label="Tag"
					dataKey="tag"
					columnData={{ selected: true }}
					{...CellBadge}
					width={widths.tag * TOTAL_WIDTH}
				/>
				<VirtualizedList.Content
					label="Description (non sortable)"
					dataKey="description"
					width={widths.description * TOTAL_WIDTH}
				/>
			</VirtualizedList>
		);
	}
}

/*
<VirtualizedList.Content label="Author" dataKey="author" width={-1} />
<VirtualizedList.Content label="Created" dataKey="created" width={-1} />
<VirtualizedList.Content label="Modified" dataKey="modified" width={-1} />
*/

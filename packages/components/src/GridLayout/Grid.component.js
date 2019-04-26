import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import theme from './Grid.scss';
import Tile from './Tile/Tile.component';
const ResponsiveGridLayout = WidthProvider(Responsive);
const MARGIN = 20;

const cols= {
	md: 6,
	m: 8,
	lg: 12,
};

const breakpoints = {
	lg: 1365, m: 1000, md: 758,
};

function onLayoutChange(layoutChangeCallback) {
	return (layout) => {
		layoutChangeCallback(layout)
	}
}

// We're using the cols coming back from this to calculate where to add new items.
function onBreakpointChange(onBreakpointChangeCallback) {
	return (breakpoint, cols) => {
		console.log('on breakpoint change');
		onBreakpointChangeCallback(breakpoint, cols);
	}
}

function Grid({ children, layoutChangeCallback, onBreakpointChangeCallback }) {
	return (
		<ResponsiveGridLayout
			className="layout"
			onLayoutChange={onLayoutChange(layoutChangeCallback)}
			onBreakpointChange={onBreakpointChange(onBreakpointChangeCallback)}
			breakpoints={breakpoints}
			cols={cols}
			measureBeforeMount={false}
			margin={[MARGIN, MARGIN]}
			compactType="vertical"
			verticalCompact={false}
			preventCollision={true}>
			{ children }
		</ResponsiveGridLayout>
	);
}

Grid.propTypes = {
	tiles: PropTypes.arrayOf(PropTypes.shape(Tile.propTypes)).required,
	layoutChangeCallback: PropTypes.func,
	onBreakpointChangeCallback: PropTypes.func,
};

export default Grid;

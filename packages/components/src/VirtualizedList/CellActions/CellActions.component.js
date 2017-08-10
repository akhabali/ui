import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Actions } from '../../Actions';

import largeTheme from './RowLargeCellActions.scss';
import tableTheme from './RowTableCellActions.scss';

const LIST_ACTION_CLASS_NAME = 'tc-list-actions';

/**
 * Cell that renders actions
 */
function CellActions({ cellData }) {
	return (
		<div
			className={classNames(
				LIST_ACTION_CLASS_NAME,
				tableTheme[LIST_ACTION_CLASS_NAME],
				largeTheme[LIST_ACTION_CLASS_NAME],
			)}
		>
			<Actions
				actions={cellData}
				hideLabel
				link
			/>
		</div>
	);
}

CellActions.displayName = 'VirtualizedList(CellActions)';
CellActions.propTypes = {
	cellData: PropTypes.arrayOf(PropTypes.shape(Actions.propTypes)),
};

export default CellActions;

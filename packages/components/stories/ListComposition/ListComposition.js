import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';

import { simpleCollection } from './collection';
import { IconsProvider } from '../../src/index';
import List from '../../src/List/ListComposition';
import CellTitle from '../../src/VirtualizedList/CellTitle';
import CellBadge from '../../src/VirtualizedList/CellBadge';

const titleProps = {
	onClick: action('onTitleClick'),
	'data-feature': 'list.item.title',
	actionsKey: 'titleActions',
	persistentActionsKey: 'persistentActions',
	displayModeKey: 'display',
	iconKey: 'icon',
	onEditCancel: action('cancel-edit'),
	onEditSubmit: action('submit-edit'),
};

function CustomList(props) {
	return (
		<List.VList id="my-vlist" {...props}>
			<List.VList.Content label="Id" dataKey="id" width={-1} />
			<List.VList.Content
				label="Name"
				dataKey="name"
				columnData={titleProps}
				width={-1}
				{...CellTitle}
			/>
			<List.VList.Content
				label="Tag"
				dataKey="tag"
				columnData={{ selected: true }}
				width={-1}
				disableSort
				{...CellBadge}
			/>
			<List.VList.Content label="Description" dataKey="description" width={-1} disableSort />
			<List.VList.Content label="Author" dataKey="author" width={-1} />
			<List.VList.Content label="Created" dataKey="created" width={-1} />
			<List.VList.Content label="Modified" dataKey="modified" width={-1} />
		</List.VList>
	);
}

storiesOf('List Composition', module)
	.add('Default', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>Default list</h1>
			<p>By default List doesn't come with any feature</p>
			<pre>{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.VList id="my-vlist">
		<List.VList.Content label="Id" dataKey="id" />
		<List.VList.Content
			label="Name"
			dataKey="name"
			columnData={titleProps}
			{...CellTitle}
		/>
		...
		<List.VList.Content label="Modified" dataKey="modified" />
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>List with display mode change</h1>
			<p>You can change display mode by adding the selector in toolbar</p>
			<pre>{`
<List.Manager id="my-list" collection={collection} initialDisplayMode="table">
	<List.Toolbar>
		<List.DisplayMode id="my-list-displayMode" />
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.DisplayMode id="my-list-displayMode" />
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Display mode: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>List with display mode change</h1>
			<p>
				You can control the display mode by<br />
				- passing the display mode to List.DisplayMode and List.VList<br />
				- handling the display mode change via List.DisplayMode onChange prop
			</p>
			<pre>{`
<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.DisplayMode
		 	id="my-list-displayMode"
		 	selectedDisplayMode="table"
		 	onChange={(event, displayMode) => changeDisplayMode(displayMode)}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.DisplayMode
							id="my-list-displayMode"
							onChange={action('onDisplayModeChange')}
							selectedDisplayMode="table"
						/>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Text Filter: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>Text Filter</h1>
			<p>
				You can filter the dataset with the text by adding the component and let it work itself
			</p>
			<pre>{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.TextFilter id="my-list-textFilter" />
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.TextFilter id="my-list-textFilter" />
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Text Filter: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>Text Filter</h1>
			<p>
				You can control the filter feature by providing callbacks to<br />
				- handle the text filter value change and filter data<br />
				- handle the text filter's docked status
			</p>
			<pre>{`<List.Manager
 	id="my-list"
 	collection={collection}
>
	<List.Toolbar>
		<List.TextFilter id="my-list-textFilter" docked={false} onChange={action('onChange')} onToggle={action('onToggle')} />
	</List.Toolbar>
	<List.VList id="my-vlist" type="TABLE">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.TextFilter
							id="my-list-textFilter"
							docked={false}
							onChange={action('onChange')}
							onToggle={action('onToggle')}
						/>
					</List.Toolbar>
					<CustomList type="TABLE" />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by: uncontrolled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>List with sorting feature</h1>
			<p>You can change the sorting criteria by adding the component in the toolbar</p>
			<pre>{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.Toolbar>
		<List.SortBy
		id="my-list-sortBy"
		options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
		initialValue={{ sortBy: 'id', isDescending: true }}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.SortBy
							id="my-list-sortBy"
							options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
							initialValue={{ sortBy: 'id', isDescending: true }}
						/>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	))
	.add('Sort by: controlled', () => (
		<div className="virtualized-list">
			<IconsProvider />
			<h1>List with sorting feature</h1>
			<p>
				You can control the sorting feature by providing both onChange and onOrderChange props
				(functions) to the SortBy component.
			</p>
			<pre>{`
<List.Manager id="my-list" collection={simpleCollection}>
	<List.Toolbar>
		<List.SortBy
			id="my-list-sortBy"
			options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
			onChange={action('onSortChange')}
			value={{ sortBy: 'name', isDescending: false }}
		/>
	</List.Toolbar>
	<List.VList id="my-vlist">
		...
	</List.VList>
</List.Manager>
`}</pre>
			<section style={{ height: '50vh' }}>
				<List.Manager id="my-list" collection={simpleCollection}>
					<List.Toolbar>
						<List.SortBy
							id="my-list-sortBy"
							options={[{ key: 'name', label: 'Name' }, { key: 'id', label: 'Id' }]}
							value={{ sortBy: 'name', isDescending: false }}
							onChange={action('onSortChange')}
						/>
					</List.Toolbar>
					<CustomList />
				</List.Manager>
			</section>
		</div>
	));

import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Action from '@talend/react-components/lib/Actions/Action';
import Dialog from '@talend/react-components/lib/Dialog';

import Form from '../src/Form';
import DatalistWidget from '../src/widgets/DatalistWidget';
import createCollapsibleFieldset from '../src/fields/CollapsibleFieldset';
import ArrayFieldTemplate from '../src/templates/ArrayFieldTemplate';

const decoratedStories = storiesOf('Form', module);
const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
const sampleFilenames = require.context('./json', true, /.(js|json)$/);
const sampleFilenameRegex = /^.\/(.*).js/;

sampleFilenames.keys().forEach(filename => {
	const sampleNameMatches = filename.match(sampleFilenameRegex);
	const sampleName = sampleNameMatches[sampleNameMatches.length - 1];
	const capitalizedSampleName = capitalizeFirstLetter(sampleName);
	decoratedStories.add(capitalizedSampleName, () => (
		<Form
			autocomplete="off"
			data={sampleFilenames(filename)}
			onChange={action('Change')}
			onBlur={action('Blur')}
			onSubmit={action('Submit')}
		/>
	));
});

decoratedStories.add('Multiple actions', () => {
	const actions = [
		{
			name: 'cancel',
			style: 'link',
			onClick: action('CANCEL'),
			type: 'button',
			label: 'CANCEL',
		},
		{
			name: 'other',
			type: 'button',
			label: 'Other Button',
			onClick: action('OTHER'),
			tooltip: true,
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'VALIDATE',
			inProgress: true,
			onClick: action('INPROGRESS'),
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'VALIDATE',
			onClick: action('VALIDATE'),
		},
		{
			style: 'primary',
			type: 'submit',
			label: 'SUBMIT',
			disabled: true,
			'data-feature': 'form.feature',
			onClick: action('SUBMIT'),
		},
	];
	const schema = {
		jsonSchema: {
			title: 'Please select a datastore',
			type: 'object',
			properties: {
				num: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					enumNames: ['One', 'Two', 'Three'],
				},
			},
		},
	};
	return <Form data={schema} onSubmit={action('SUBMIT')} actions={actions} />;
});

function CustomDatalist(...args) {
	function RenderItemsContainer({ children, containerProps }) {
		return (
			<div {...containerProps}>
				{children}
				{children && (
					<div style={{ padding: '0 1em 1em 1em', width: '100%' }}>
						<span
							style={{
								fontSize: '0.9em',
								padding: '0.5em 0',
								color: 'gray',
								width: '100%',
								display: 'inline-block',
							}}
						>
							Other Actions
						</span>
						<Action
							onMouseDown={action('clicked')}
							bsStyle="primary"
							id="default"
							label="do some stuff"
						/>
					</div>
				)}
			</div>
		);
	}

	RenderItemsContainer.propTypes = {
		children: PropTypes.element,
		containerProps: PropTypes.object,
	};

	function RenderNoMatch({ containerProps }) {
		return (
			<div
				{...containerProps}
				className={`${DatalistWidget.itemContainerStyle} ${DatalistWidget.noResultStyle}`}
			>
				<div className={{ padding: '0 1em 1em 1em', width: '100%' }}>
					<span>No match.</span>
					<span
						style={{
							fontSize: '0.9em',
							padding: '0.5em 0',
							color: 'gray',
							width: '100%',
							display: 'inline-block',
						}}
					>
						Other Actions
					</span>
					<Action
						onMouseDown={action('clicked')}
						bsStyle="primary"
						id="default"
						label="do some stuff"
					/>
				</div>
			</div>
		);
	}
	RenderNoMatch.propTypes = {
		containerProps: PropTypes.object,
	};

	function RenderEmptyList({ containerProps }) {
		return (
			<div
				{...containerProps}
				className={`${DatalistWidget.itemContainerStyle} ${DatalistWidget.emptyStyle}`}
			>
				<div className={{ padding: '0 1em 1em 1em', width: '100%' }}>
					<span>Empty list.</span>
					<span
						style={{
							fontSize: '0.9em',
							padding: '0.5em 0',
							color: 'gray',
							width: '100%',
							display: 'inline-block',
						}}
					>
						Other Actions
					</span>
					<Action
						onMouseDown={action('clicked')}
						bsStyle="primary"
						id="default"
						label="do some stuff"
					/>
				</div>
			</div>
		);
	}
	RenderEmptyList.propTypes = {
		containerProps: PropTypes.object,
	};

	return (
		<DatalistWidget
			{...args[0]}
			renderItemsContainer={RenderItemsContainer}
			renderNoMatch={RenderNoMatch}
			renderEmptyList={RenderEmptyList}
		/>
	);
}

function getEmptyDatalist() {
	function fetchItems() {
		return [];
	}
	const schema = {
		jsonSchema: {
			title: 'A simple typeahead',
			description: 'A simple typeahead widget example.',
			type: 'object',
			definitions: {
				emptyDatalist: {
					type: 'string',
					enum: [],
				},
			},
			properties: {
				emptyDatalist: {
					$ref: '#/definitions/emptyDatalist',
				},
			},
		},
		uiSchema: {
			emptyDatalist: {
				'ui:widget': 'customDatalist',
			},
			'ui:order': ['emptyDatalist'],
		},
		properties: {
			emptyDataList: undefined,
		},
	};

	return (
		<Form
			data={schema}
			formContext={{ fetchItems }}
			onChange={action('CHANGE')}
			onSubmit={action('SUBMIT')}
			widgets={{ customDatalist: CustomDatalist }}
		/>
	);
}

function getDatalist() {
	function fetchItems() {
		return [
			'Auklet',
			'Cormorant',
			'Falcon',
			'Goldfinch',
			'Magpie',
			'Pewee',
			{
				value: 'testkey1',
				label: 'Test Value 1',
			},
			{
				value: 'testkey2',
				label: 'Test Value 2',
			},
			{
				value: 'testkey3',
				label: 'Test Value 3',
			},
		];
	}
	const schema = {
		jsonSchema: {
			title: 'A simple typeahead',
			description: 'A simple typeahead widget example.',
			type: 'object',
			required: ['fullDatalist', 'select1'],
			definitions: {
				datalist: {
					type: 'string',
					enum: ['Apple', 'Pine[apple]', 'Banana', 'Cher[ry', 'Lemo}n', 'Grapefruit'],
				},
			},
			properties: {
				select1: {
					$ref: '#/definitions/datalist',
				},
				fullDatalist: {
					$ref: '#/definitions/datalist',
				},
				withCustomElement: {
					$ref: '#/definitions/datalist',
				},
				remoteDataList: {
					type: 'string',
				},
			},
		},
		uiSchema: {
			remoteDataList: {
				'ui:widget': 'datalist',
				'ui:placeholder': 'Please select',
			},
			fullDatalist: {
				'ui:widget': 'datalist',
				'ui:options': {
					restricted: true,
				},
			},
			withCustomElement: {
				'ui:widget': 'customDatalist',
			},
			'ui:order': ['select1', 'fullDatalist', 'remoteDataList', 'withCustomElement'],
		},
		properties: {
			fullDatalist: 'Apple',
		},
	};

	return (
		<Form
			data={schema}
			formContext={{ fetchItems }}
			onChange={action('CHANGE')}
			onSubmit={action('SUBMIT')}
			widgets={{ customDatalist: CustomDatalist }}
		/>
	);
}

decoratedStories.add('Datalist', getDatalist);
decoratedStories.add('Datalist empty', getEmptyDatalist);
decoratedStories.add('Datalist in modal', () => {
	const props = {
		header: 'Datalist in modal',
		show: true,
		size: 'small',
		keyboard: true,
	};

	// Need to override style for this demo (items-container must be scrollable)
	return (
		<div>
			<style>{'[class*="DatalistWidget__items-container"] {max-height: 100px;}'}</style>
			<Dialog {...props}>{getDatalist()}</Dialog>
		</div>
	);
});

const UnknownWidget = props => {
	const { value } = props;

	return (
		<div className="panel panel-info">
			<div className="panel-heading">
				<h3 className="panel-title">Custom widget</h3>
			</div>
			<div className="panel-body">
				Form was instantiated with a custom widget to display its selected value{' '}
				<code>{value}</code>.
			</div>
		</div>
	);
};

UnknownWidget.propTypes = {
	value: PropTypes.string,
};

decoratedStories.add('Custom widget', () => {
	const widgets = {
		unknown: UnknownWidget,
	};
	const schema = {
		jsonSchema: {
			title: 'Unknown widget',
			type: 'object',
			properties: {
				list: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					enumNames: ['One', 'Two', 'Three'],
				},
			},
		},
		properties: {
			list: 'two',
		},
		uiSchema: {
			list: {
				'ui:widget': 'unknown',
			},
		},
	};

	return <Form data={schema} widgets={widgets} onSubmit={action('SUBMIT')} />;
});

class FormDemo extends React.Component {
	static fields = {
		CollapsibleFieldset: createCollapsibleFieldset(formData => {
			if (formData.function) {
				return (
					<span>
						{Object.keys(formData).reduce((acc, item) => {
							if (item !== 'isClosed') {
								return `${acc}${formData[item]} `;
							}
							return acc;
						}, '')}
					</span>
				);
			}
			return (
				<span>
					<em>Create a new whatever</em>
				</span>
			);
		}),
	};

	constructor(props) {
		super(props);
		this.state = { formData: this.props.schema.properties };
	}

	onChange(formData) {
		this.setState({ formData });
	}

	render() {
		const schema = this.props.schema;
		schema.properties = this.state.formData || this.props.schema.properties;
		return (
			<Form
				ArrayFieldTemplate={ArrayFieldTemplate}
				fields={FormDemo.fields}
				data={schema}
				onSubmit={action('SUBMIT')}
			>
				<h1>Child</h1>
				<p>This is an inner child in the form</p>
			</Form>
		);
	}
}

decoratedStories.add('Custom array', () => {
	const schema = {
		jsonSchema: {
			title: 'A filter form',
			description: '',
			type: 'object',
			properties: {
				filters: {
					type: 'array',
					title: 'A list of strings',
					minItems: 1,
					maxItems: 5,
					items: {
						type: 'object',
						properties: {
							isClosed: {
								type: 'boolean',
							},
							function: {
								type: 'string',
								enum: ['upperCase', 'lowerCase'],
							},
							fieldName: {
								type: 'string',
							},
							operator: {
								type: 'string',
								enum: ['==', '!='],
							},
							operand: {
								type: 'string',
							},
						},
					},
				},
			},
		},
		uiSchema: {
			filters: {
				'ui:trigger': ['after'],
				items: {
					'ui:field': 'CollapsibleFieldset',
					operator: {
						'ui:widget': 'select',
					},
				},
			},
		},
		properties: {
			filters: [
				{
					function: 'upperCase',
					fieldName: 'First',
					operator: '==',
					operand: 'test',
				},
				{
					isClosed: true,
					function: 'upperCase',
					fieldName: 'Second',
				},
				{
					function: 'lowerCase',
					fieldName: 'Third',
				},
			],
		},
	};
	return <FormDemo schema={schema} onTrigger={() => console.log(arguments)} />;
});

decoratedStories.add('Custom double array', () => {
	const schema = {
		jsonSchema: {
			title: '',
			type: 'object',
			required: ['label'],
			properties: {
				label: {
					type: 'string',
					title: 'Label',
				},
				description: {
					type: 'string',
					title: 'Description',
				},
				properties: {
					title: '',
					type: 'object',
					properties: {
						main: {
							title: '',
							type: 'object',
							properties: {
								schema: {
									title: 'Schema',
									type: 'string',
								},
							},
						},
						schemaFlow: {
							title: '',
							type: 'object',
							properties: {
								schema: {
									title: 'Schema',
									type: 'string',
								},
							},
						},
						groupBy: {
							title: 'Group By',
							minItems: '0',
							maxItems: '10',
							type: 'array',
							items: {
								title: '',
								type: 'object',
								properties: {
									fieldPath: {
										title: 'Field',
										type: 'string',
									},
								},
								required: ['fieldPath'],
								default: {
									fieldPath: '',
								},
							},
						},
						operations: {
							title: 'Operations',
							minItems: '1',
							maxItems: '10',
							type: 'array',
							items: {
								title: '',
								type: 'object',
								properties: {
									fieldPath: {
										title: 'Field',
										type: 'string',
									},
									operation: {
										title: 'Operation',
										type: 'string',
										enumNames: ['List', 'Count', 'Sum', 'Avg', 'Min', 'Max'],
										enum: ['LIST', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
									},
									outputFieldPath: {
										title: 'Generated field (optional)',
										type: 'string',
									},
								},
								required: ['fieldPath'],
								default: {
									fieldPath: '',
									operation: 'LIST',
									outputFieldPath: '',
								},
							},
						},
					},
				},
			},
		},
		uiSchema: {
			'ui:order': ['label', 'description', 'properties'],
			properties: {
				groupBy: {
					items: {
						'ui:field': '',
						fieldPath: {
							'ui:widget': 'datalist',
						},
						'ui:order': ['fieldPath'],
						'ui:options': {
							type: 'filter',
						},
					},
				},
				operations: {
					items: {
						'ui:widget': 'columns',
						fieldPath: {
							'ui:widget': 'datalist',
						},
						operation: {
							'ui:widget': 'datalist',
						},
						'ui:order': ['fieldPath', 'operation', 'outputFieldPath'],
						'ui:options': {
							type: 'filter',
						},
					},
				},
				'ui:order': ['groupBy', 'operations', 'main', 'schemaFlow'],
				main: {
					'ui:widget': 'hidden',
				},
				schemaFlow: {
					'ui:widget': 'hidden',
				},
			},
		},
		properties: {
			properties: {
				main: {
					schema: '{"type":"record","name":"EmptyRecord","fields":[]}',
				},
				schemaFlow: {
					schema: '{"type":"record","name":"EmptyRecord","fields":[]}',
				},
				groupBy: [],
				operations: [
					{
						fieldPath: '',
						operation: 'LIST',
						outputFieldPath: '',
					},
				],
				'@definitionName': 'Aggregate',
			},
			label: 'Aggregate 1',
			description: '',
		},
	};
	return <FormDemo schema={schema} onTrigger={() => console.log(arguments)} />;
});

decoratedStories.add('Form Children', () => {
	const schema = {
		jsonSchema: {
			title: 'Form with children',
			type: 'object',
			properties: {
				test: {
					title: 'Test title',
					type: 'string',
				},
			},
		},
		uiSchema: {},
		properties: {
			test: 'test',
		},
	};
	return (
		<Form data={schema} onSubmit={action('SUBMIT')}>
			<h1>Child</h1>
			<p>This is an inner child in the form</p>
		</Form>
	);
});

decoratedStories.add('Form with live validation', () => {
	const schema = {
		jsonSchema: {
			title: 'Form with live validation',
			type: 'object',
			required: ['name', 'email'],
			properties: {
				name: {
					title: 'Name',
					type: 'string',
					minLength: 3,
				},
				email: {
					title: 'Email',
					type: 'string',
					pattern: '^\\S+@\\S+$',
					minLength: 5,
				},
			},
		},
		uiSchema: {
			email: {
				'ui:help': 'Please enter a valid email address, e.g. user@email.com',
			},
		},
		properties: {
			name: 'Rey',
			email: 'lastJedi@sw.com',
		},
	};
	return <Form liveValidate data={schema} showErrorList={false} onSubmit={action('SUBMIT')} />;
});

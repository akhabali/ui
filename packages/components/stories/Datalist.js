import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Datalist, IconsProvider } from '../src/index';

const propsMultiSection = {
	disabled: false,
	multiSection: true,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{
			title: 'cat 1',
			suggestions: [
				{ name: 'My foo', value: 'foo', description: 'foo description' },
				{ name: 'My faa', value: 'faa' },
			],
		},
		{ title: 'cat 2', suggestions: [{ name: 'My bar', value: 'bar' }] },
		{
			title: 'cat 3',
			suggestions: [{ name: 'My foobar', value: 'foobar', description: 'foobar description' }],
		},
		{ title: 'cat 4', suggestions: [{ name: 'My lol', value: 'lol' }] },
	],
	onFinish: action('onFinish'),
	onChange: action('onChange'),
	onLiveChange: action('onLiveChange'),
};

const singleSectionProps = {
	disabled: false,
	multiSection: false,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{ name: 'My foo', value: 'foo', description: 'foo description' },
		{ name: 'My bar', value: 'bar' },
		{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
		{ name: 'My lol', value: 'lol' },
	],
	onFinish: action('onFinish'),
	onChange: action('onChange'),
	onLiveChange: action('onLiveChange'),
};

const titleMapWithDisabledItems = [
	{ name: 'My foo', value: 'foo', description: 'foo description', disabled: true },
	{ name: 'My bar', value: 'bar' },
	{ name: 'My lol', value: 'lol', disabled: true },
	{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
];

storiesOf('Datalist', module)
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('default multiSection', () => {
		const restrictedValues = { ...propsMultiSection, restricted: true };
		const defaultValue = { ...propsMultiSection, value: 'lol' };
		return (
			<form className="form">
				<IconsProvider />
				<h3>By default :</h3>
				<Datalist {...propsMultiSection} />
				<h3>default value :</h3>
				<Datalist {...defaultValue} />
				<h3>Restricted values :</h3>
				<Datalist {...restrictedValues} />
				<h3>Auto focused :</h3>
				<Datalist {...propsMultiSection} autoFocus />
			</form>
		);
	})
	.add('default single section', () => {
		const restrictedValues = { ...singleSectionProps, restricted: true };
		const defaultValue = { ...singleSectionProps, value: 'lol' };
		const disabledItems = { ...singleSectionProps, titleMap: titleMapWithDisabledItems };
		return (
			<form className="form">
				<IconsProvider />
				<h3>By default :</h3>
				<Datalist {...singleSectionProps} />
				<h3>default value :</h3>
				<Datalist {...defaultValue} />
				<h3>Restricted values :</h3>
				<Datalist {...restrictedValues} />
				<h3>Loading :</h3>
				<Datalist {...singleSectionProps} titleMap={[]} isLoading />
				<h3>Auto focused :</h3>
				<Datalist {...singleSectionProps} autoFocus />
				<h3>With disabled Items :</h3>
				<Datalist {...disabledItems} autoFocus />
				<h3>Insert custom elements via render props :</h3>
				<Datalist {...singleSectionProps}>
					{(content, { isShown }) => (
						<div>
							{isShown && (
								<button
									onClick={action('onBeforeClick')}
									onMouseDown={e => e.preventDefault()}
									type="button"
								>
									before
								</button>
							)}
							{content}
							{isShown && (
								<button
									onClick={action('onAfterClick')}
									onMouseDown={e => e.preventDefault()}
									type="button"
								>
									after
								</button>
							)}
						</div>
					)}
				</Datalist>
			</form>
		);
	});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import talendIcons from '@talend/icons/dist/react';
import { Breadcrumbs, IconsProvider } from '../src/index';

const icons = {
	'talend-chevron-left': talendIcons['talend-chevron-left'],
};

storiesOf('Breadcrumbs', module)
	.add('default', () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: action('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'text c in lower case', title: 'Text title C', onClick: action('Text C clicked') },
		];
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				<Breadcrumbs items={items} />
			</div>
		);
	})
	.add('with max items reached', () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: action('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: action('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: action('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: action('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: action('Text E clicked') },
		];
		return (
			<div>
				<IconsProvider defaultIcons={icons} />
				<Breadcrumbs items={items} maxItems={2} />
			</div>
		);
	});

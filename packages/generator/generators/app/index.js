const Generator = require('yeoman-generator');
const yosay = require('yosay');
const slug = require('slugg');

module.exports = class AppGenerator extends Generator {
	initializing() {
		this.composeWith('talend:dotfiles', {
			name: () => this.props.name,
			babelrc: false,
			eslint: false,
			sasslint: true,
			travis: false,
		});
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay('Welcome to the react app generator!'));

		const prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'name',
				default: this.appname,
			},
			{
				type: 'input',
				name: 'description',
				message: 'description',
			},
		];

		return this.prompt(prompts).then(props => {
			if (props.name !== slug(this.appname)) {
				this.destinationRoot(props.name);
			}

			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		const fileToCopy = ['src', '.eslintrc', 'i18next-scanner.config.js', 'talend-i18n.json'];
		const tplToCopy = ['package.json'];
		fileToCopy.forEach(name => {
			this.fs.copy(this.templatePath(name), this.destinationPath(name));
		});
		tplToCopy.forEach(name => {
			this.fs.copyTpl(this.templatePath(name), this.destinationPath(name), this);
		});
	}
	install() {
		this.yarnInstall();
	}
};

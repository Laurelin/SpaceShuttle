
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.click = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.click = this.add.audio('click');
		this.music = this.add.audio('titleMusic');
		this.guy = this.add.audio('dude');
		this.music.play();
		this.guy.play();
		

		this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.add.button(728, 386, 'playButton', this.startGame, this, 'play_buttonhover.png', 'play_button1.png', 'play_buttonhover.png', 'play_button1.png');

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.click.play();
		this.music.stop();
		this.guy.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
	this.cursors;
	var music;
	var rotation;
	var accel;
	var drag;
	var vMax
	var gravity;
	var player;
	var crane;
	var ground;
	var engines;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var sbr = 0;
var rocketEmitter;

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		
		rotation = 90;
		accel = 87;
		vMax = 450;
		drag = 25;
		gravity = 50;
		
		this.world.setBounds(0, 0, 1024, 10240);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = gravity;
		
		this.camera.setPosition(1024, 10240);

		music = this.add.audio('launchMusic');
		
		this.add.sprite(0,0, 'launch');
		player = this.add.sprite(504, 9899, 'shuttle', 'shuttle.png');
		ground = this.add.sprite(0, 9216, 'launchPad');
		crane = this.add.sprite(369, 9892, 'crane');
		this.camera.follow(player);

		this.physics.arcade.enable(player);
		
		
		player.body.maxVelocity.setTo(vMax, vMax);
		player.body.drag.setTo(drag);
		player.body.collideWorldBounds = true;
		player.allowGravity = false;
		player.immovable = true;
		
		this.physics.arcade.enable(crane);
		crane.body.immovable = true;
		crane.body.allowGravity = false;
		
		this.physics.arcade.enable(ground);
		ground.body.immovable = true;
		ground.body.allowGravity = false;
		
		
		rocketEmitter = this.add.emitter(0, 0, 1000);
		rocketEmitter.makeParticles('smoke')
		
		
		music.play();
		this.cursors = this.input.keyboard.createCursorKeys();
		this.input.keyboard.addKeyCapture([
			Phaser.Keyboard.LEFT,
			Phaser.Keyboard.RIGHT,
			Phaser.Keyboard.UP,
			Phaser.Keyboard.DOWN
		]);
	
		engines = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		engines.onDown.add(rocketManager, this);
		
    },

    update: function () {
	
	this.physics.arcade.collide(player, ground);

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		 if (this.cursors.up.isDown /*&& sbr > 1*/)
		{
			
			player.allowGravity = true;
			player.immovable = false;
			player.body.acceleration.y = -accel;
		}
		else if (this.cursors.down.isDown)
		{
        this.camera.y += 10;
		}
		else
		{
			player.body.acceleration.y = 0;
		}
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

	
function rocketManager(){

	sbr++;
	
	switch(sbr){
		case 1:
			//create and add smoke emitter to shuttle sprite
			player.addChild(rocketEmitter);
			player.frameName = 'shuttlethrust.png';
			player.x = 486;
			break;
			}

};
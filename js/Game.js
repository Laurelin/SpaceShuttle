
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
	var angle;
	var accel;
	var drag;
	var vMax
	var gravity;
	var player;
	var crane;
	var ground;
	var start = false;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var sbr = 0;
var rocketEmitter;
var rocketEmitter1;
var timer;

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
		
		angle = 40;
		accel = (87 - 50)*-1; //total acceleration 
		vMax = 1000;
		drag = 25;
		gravity = 50;
		
		this.world.setBounds(0, 0, 1024, 10240);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = gravity;
		
		this.camera.setPosition(1024, 10240);

		music = this.add.audio('launchMusic');
		
		this.add.sprite(0,0, 'launch');
		
		
		player = this.add.sprite(525, 9948, 'shuttle', 'shuttle.png');
		ground = this.add.sprite(0, 9216, 'launchPad');
		rocketEmitter = this.add.emitter(0, 0, 1000);
		rocketEmitter.makeParticles('holyshit');
		rocketEmitter1 = this.add.emitter(0, 0, 1000);
		rocketEmitter1.makeParticles('cloud');
		crane = this.add.sprite(369, 9892, 'crane');
		
		this.camera.follow(player);
		this.physics.arcade.enable(player);
		
		
		player.body.maxVelocity.setTo(vMax, vMax);
		player.body.drag.setTo(drag);
		player.body.angularDrag = 35;
		player.body.collideWorldBounds = true;
		player.body.bounce.setTo(0.10, 0.10);
		player.anchor.setTo(0.5, 0.5);
		
		player.body.immovable = true;
		player.body.allowGravity = false;
		
		this.physics.arcade.enable(crane);
		crane.body.immovable = true;
		crane.body.allowGravity = false;
		
		this.physics.arcade.enable(ground);
		ground.body.immovable = true;
		ground.body.allowGravity = false;
		
		rocketEmitter.setAlpha(0.5, 1, 3000);
		rocketEmitter.gravity = gravity + accel;
		rocketEmitter1.setAlpha(0.5, 1, 3000);
		rocketEmitter1.gravity = gravity + accel;
		
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
	
		rocketEmitter.x = player.x - 20;
		rocketEmitter.y = player.y + 100;
		
		rocketEmitter1.x = player.x + 20;
		rocketEmitter1.y = player.y + 100;

        if(this.cursors.left.isDown && sbr >= 2)
		{
			while(timer.seconds < 1)
			{
			}
			
			player.body.angularVelocity = -angle;
		}
		else if(this.cursors.right.isDown && sbr >= 2)
		{
			while(timer.seconds < 1)
			{
			}
			player.body.angularVelocity = angle;
		}
		
		
		 if (this.cursors.up.isDown && sbr >= 2)
		{
			while(timer.seconds < 1)
			{
			}
			start = true;
			player.immovable = false;
			player.allowGravity = true;
			player.body.acceleration.x = Math.sin(-player.rotation) * accel;
			player.body.acceleration.y = Math.cos(-player.rotation) * accel;
		}
		else if (!this.cursors.up.isDown && sbr >= 2)
		{
			while(timer.seconds < 1)
			{
			}
			player.body.acceleration.x = Math.sin(-player.rotation) * gravity;
			player.body.acceleration.y = Math.cos(-player.rotation) * gravity;
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
			rocketEmitter.start(false, 4000, 20) 
			player.frameName = 'shuttlethrust.png';
			player.x = 527;
			player.anchor.setTo(0.5, 0.25);
			break;
		case 2:
			rocketEmitter1.start(false, 4000.20)
			player.frameName = 'shuttlethrust.png';
			player.x = 527;
			player.anchor.setTo(0.5, 0.25);
			timer = new Phaser.Timer(this, false);
			break;
			}

};
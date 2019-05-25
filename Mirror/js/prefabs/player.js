// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE*11+GRID_SIZE/2, GRID_SIZE*9+GRID_SIZE/2, 'player_atlas');
	this.anchor.set(0.5);
	this.currentHP = 100;
	this.maxHP = 100;
	this.currentMP = 100;
	this.maxMP = 100;

	// player sounds:
	footstep = game.add.audio('footstep');
	// game.camera.follow(this);
	// player physics:
	// game.physics.arcade.enable(this);
	game.camera.follow(this, 0, 1, 1);
	// game.physics.enable(this, Phaser.Physics.ARCADE);
	// this.body.setSize(32, 32, -6, -1);
	// this.body.drag.set(200);
	// this.body.maxVelocity = 50;
	// this.body.immovable = true;	
	// this.body.collideWorldBounds = true;
	// this.gridPosition = new Phaser.Point(this.body.x/GRID_SIZE, this.body.y/GRID_SIZE);

	//Add player animation
	this.animations.add('walkUp', [4, 7], 6, true);
	this.animations.add('walkDown', [0, 3], 6, true);
	this.animations.add('walkLeft', [8, 11], 6, true);
	this.animations.add('walkRight', [12, 15], 6, true);
	timer = game.time.create(false);
	timer.loop(Phaser.Timer.SECOND, function(){
		player.currentHP -= 1;
		player.currentMP -= 1;
	}, this);
	timer.start();
}

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Player.prototype.constructor = Player;  

Player.prototype.update = function() {


	// this.body.velocity.x = 0;
	// this.body.velocity.y = 0;

	// game.physics.arcade.collide(this, terrainLayer);
		// game.physics.arcade.collide(this, terrainLayer, blockMoving, null, this);

	// Player Controls:
	if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
		playerWalkingDuration = 250;
	else
		playerWalkingDuration = 500;
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && playerTweenCompleted) {
		player.animations.play("walkUp");
		playerOrientation = { up: true, down: false, left: false, right: false }
		if(game.input.keyboard.downDuration(Phaser.Keyboard.UP, CONTROL_RESPONSE_DELAY)) {
		} else {
			this.checkCollision(this.centerX, this.centerY-32, playerOrientation);
		}
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && playerTweenCompleted) {
		player.animations.play("walkDown");
		playerOrientation = { up: false, down: true, left: false, right: false }
		if(game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, CONTROL_RESPONSE_DELAY)) {
		} else {
			this.checkCollision(this.centerX, this.centerY+32, playerOrientation);
		}
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && playerTweenCompleted) {
		player.animations.play("walkLeft");
		playerOrientation = { up: false, down: false, left: true, right: false }
		if(game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, CONTROL_RESPONSE_DELAY)) {
		} else {
			this.checkCollision(this.centerX-32, this.centerY, playerOrientation);
		}
	} else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && playerTweenCompleted) {
		player.animations.play("walkRight");
		playerOrientation = { up: false, down: false, left: false, right: true }
		if(game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, CONTROL_RESPONSE_DELAY)) {
		} else {
			this.checkCollision(this.centerX+32, this.centerY, playerOrientation);
		}
	}
	if ((frontObject !== null) && (game.input.keyboard.justPressed(Phaser.Keyboard.E))) {
		if(frontObject.index === DOOR_CLOSED_INDEX)
			map.replace(DOOR_CLOSED_INDEX, DOOR_OPEN_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
		else if(frontObject.index === DOOR_OPEN_INDEX)
			map.replace(DOOR_OPEN_INDEX, DOOR_CLOSED_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
		if((frontObject.index === MIRROR_BREAK_INDEX) && (touch_counter === 4)) {
			game.state.start('End');
		}
		if(frontObject.index === MIRROR_GOOD_INDEX)	{
			touch_counter++;
			if(touch_counter === 4) {
				map.replace(MIRROR_GOOD_INDEX, MIRROR_BREAK_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
				map.replace(CASE_GOOD_INDEX, CASE_BREAK_INDEX, 22, 17, 1, 1, objectLayer);	
			} else if(touch_counter === 3) {
				map.replace(RING_GOOD_INDEX, RING_BREAK_INDEX, 19, 12, 1, 1, objectLayer);
			} else if(touch_counter === 2) {
				map.replace(CLOTH_GOOD_INDEX, CLOTH_BREAK_INDEX, 13, 16, 1, 1, objectLayer);
			} if(touch_counter === 1) {
				map.replace(BALL_GOOD_INDEX, BALL_BREAK_INDEX, 9, 13, 1, 1, objectLayer);
				map.removeTile(10, 9, objectLayer);
			}		
			MIRROR_TOUCHED = true;
		} 
	}
	this.updateFrontObject(playerOrientation);
	// this.updateLight();
	// Play footsetps while moving:
	if(playerTweenCompleted === true) {
		footstep.stop();
		this.animations.stop();
	}
}

// move player:
Player.prototype.movePlayer = function(directions) {
// function movePlayer(directions) {
	footstep.play('', 0, 1, false, true);
	if(directions.up === true) {
		playerTween = game.add.tween(player).to({x: player.centerX, y: player.centerY-32}, playerWalkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.down === true) {
		playerTween = game.add.tween(player).to({x: player.centerX, y: player.centerY+32}, playerWalkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.left === true) {
		playerTween = game.add.tween(player).to({x: player.centerX-32, y: player.centerY}, playerWalkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.right === true) {
		playerTween = game.add.tween(player).to({x: player.centerX+32, y: player.centerY}, playerWalkingDuration, Phaser.Easing.Linear.None, true);
	}
	// player.gridPosition.x += x;  
	// player.gridPosition.y += y; 
	// playerTween = game.add.tween(player).to({x: player.gridPosition.x * GRID_SIZE, y: player.gridPosition.y * GRID_SIZE}, playerWalkingDuration, Phaser.Easing.Quadratic.InOut, true);
	playerTweenCompleted = false;
	playerTween.onComplete.add(this.playerTweenComplete, this);
}

// // mark when player stop moving:
Player.prototype.checkCollision = function(x, y, directions) {
// function checkCollision(x, y, directions) {
	// frontObject = null;
    var terrainTileX = terrainLayer.getTileX(x);
    var terrainTileY = terrainLayer.getTileY(y);
    var tile = map.getTile(terrainTileX, terrainTileY, terrainLayer, true);

    // currentDataString = tile;
    // console.log(currentDataString);
    // if([1].includes(tile.index))
    // Check if next tile is terrain
    if(tile.index === -1) {
    	var objectTileX = objectLayer.getTileX(x);
	    var objectTileY = objectLayer.getTileY(y);
	    var tile = map.getTile(objectTileX, objectTileY, objectLayer, true);
	    // Check if next tile is objects
    	if(tile.index === -1) {
			this.movePlayer(directions);
    	} else {
    		frontObject = tile;
    		// console.log(tile.index);
    		if (tile.index === DOOR_CLOSED_INDEX) {
				// console.log('Press E to interact the door');
    		} else if (tile.index === DOOR_OPEN_INDEX) {
    			this.movePlayer(directions);
    		}
    	}
	}
}
Player.prototype.playerTweenComplete = function() {
// function playerTweenComplete() {
	playerTweenCompleted = true;
}
Player.prototype.updateFrontObject = function(directions) {
// function updateFrontObject(directions) {
	if(directions.up === true) {
		frontObject = map.getTile(objectLayer.getTileX(player.centerX), objectLayer.getTileY(player.centerY-32), objectLayer, true);
		directionAngle = 90*Math.PI/180;
	} else if (directions.down === true) {
		frontObject = map.getTile(objectLayer.getTileX(player.centerX), objectLayer.getTileY(player.centerY+32), objectLayer, true);
		directionAngle = 270*Math.PI/180;
	} else if (directions.left === true) {
		frontObject = map.getTile(objectLayer.getTileX(player.centerX-32), objectLayer.getTileY(player.centerY), objectLayer, true);
		directionAngle = 0*Math.PI/180;
	} else if (directions.right === true) {
		frontObject = map.getTile(objectLayer.getTileX(player.centerX+32), objectLayer.getTileY(player.centerY), objectLayer, true);
		directionAngle = 180*Math.PI/180;
	}
	if(frontObject !== null)
		frontObjectIndex = frontObject.index;
	else
		frontObjectIndex = -1;
}
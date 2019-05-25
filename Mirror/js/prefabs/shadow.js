// Shadow prefab

function Shadow(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, player.x+500, player.y+500, 'player_atlas');
	this.anchor.set(0.5);
	// this.alpha = 0.5;
}

// inherit prototype from Phaser.Sprite and set constructor to Shadow
// the Object.create method creates a new object w/ the specified prototype object and properties
Shadow.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Shadow.prototype.constructor = Shadow;  

Shadow.prototype.update = function() {
	this.moveShadow();
}
Shadow.prototype.moveShadow = function() {
	if(player.x > this.x)
		this.x += game.rnd.integerInRange(-1, 30)/30;
	else
		this.x -= game.rnd.integerInRange(-1, 30)/30;
	if(player.y > this.y)
		this.y += game.rnd.integerInRange(-1, 30)/30;
	else
		this.y -= game.rnd.integerInRange(-1, 30)/30;
}
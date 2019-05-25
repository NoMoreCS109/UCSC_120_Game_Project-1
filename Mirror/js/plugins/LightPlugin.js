// Debug Plugin:
// Light Algorithm inspired from: https://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

LightPlugin.prototype.addLight = function() {
	maskGraphics = this.game.add.graphics(0, 0);
	floorLayer.mask = maskGraphics;
	terrainLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	// shadow.mask = maskGraphics;
	// terrainLayer.mask = null; // disable mask
	// terrainLayer.alpha = 0.02;
	player.alpha = 0.5;
};
LightPlugin.prototype.updateLight = function() {
	maskGraphics.clear();
	maskGraphics.lineStyle(2, 0xffffff, 1);
	maskGraphics.beginFill(0xff0000);
	var playerX = player.x;
	var playerY = player.y+6;
	maskGraphics.moveTo(playerX, playerY);	
	for(var i = 0; i < NUMBER_OF_RAYS; i++){	
		var rayAngle = directionAngle-(LIGHT_ANGLE/2)+(LIGHT_ANGLE/NUMBER_OF_RAYS)*i;
		var lastX = playerX;
		var lastY = playerY;
		var lightThrough = false;
		var k = 0;
		for(var j = 1; j <= RAY_LENGTH; j++){
	  		var terrainTile = map.getTile(terrainLayer.getTileX(lastX), terrainLayer.getTileY(lastY), terrainLayer, true);
	  		var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
	  		if(shadow.x === lastX && shadow.y === lastY) {
	  			var x;
	  			var y;
	  			if(game.rnd.integerInRange(0, 1) === 1) {
	  				x = game.rnd.integerInRange(100, 200);
	  				y = game.rnd.integerInRange(100, 200);
	  			} else {
	  				x = game.rnd.integerInRange(-100, -200);
	  				y = game.rnd.integerInRange(-100, -200);
	  			}

	  			shadow.x += x;
	  			shadow.y += y;

	  		}
	  		if(lightThrough && (k >= GRID_SIZE/2 || (terrainTile.index === -1 && objectTile.index !== DOOR_CLOSED_INDEX))){
				maskGraphics.lineTo(lastX, lastY);
				break;
	  		} else {
	  			if(terrainTile.index !== -1 || objectTile.index === DOOR_CLOSED_INDEX) {
	  				lightThrough = true;
	  			}
	  			if(lightThrough)
	  				k++;
		  		var landingX = Math.round(playerX-(2*j)*Math.cos(rayAngle));
		  		var landingY = Math.round(playerY-(2*j)*Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
	  		}
		}
		maskGraphics.lineTo(lastX, lastY);
	}
	maskGraphics.lineTo(playerX,playerY);
	maskGraphics.endFill();
	floorLayer.alpha = 0.5+Math.random()*0.5;
};
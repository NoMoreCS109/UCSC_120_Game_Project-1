// Debug Plugin:
// Light Algorithm inspired from: https://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

LightPlugin.prototype.addLight = function() {
	// maskGraphic = this.game.add.graphics(0, 0);
	// floorLayer.mask = maskGraphic;
	// terrainLayer.mask = maskGraphic;
	// objectLayer.mask = maskGraphic;
	// terrainLayer.mask = null; // disable mask
	// terrainLayer.alpha = 0.02;
	// player.alpha = 0.5;

};
LightPlugin.prototype.updateLight = function(maskGraphic, source, sourceX, sourceY) {
	maskGraphic.clear();
	maskGraphic.lineStyle(2, 0xffffff, 1);
	maskGraphic.beginFill(0xffffff);
	// var sourceX = source.x;
	// var sourceY = source.y+6;
	maskGraphic.moveTo(sourceX, sourceY);	
	for(var i = 0; i < NUMBER_OF_RAYS; i++){	
		var rayAngle = directionAngle-(LIGHT_ANGLE/2)+(LIGHT_ANGLE/NUMBER_OF_RAYS)*i;
		var lastX = sourceX;
		var lastY = sourceY;
		var lightThrough = false;
		var k = 0;
		for(var j = 1; j <= RAY_LENGTH; j++){
	  		var terrainTile = map.getTile(terrainLayer.getTileX(lastX), terrainLayer.getTileY(lastY), terrainLayer, true);
	  		var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
	  		if(lightThrough && (k >= GRID_SIZE/2 || (terrainTile.index === -1 && objectTile.index !== DOOR_CLOSED_INDEX))){
				maskGraphic.lineTo(lastX, lastY);
				break;
	  		} else {
	  			if(terrainTile.index !== -1 || objectTile.index === DOOR_CLOSED_INDEX) {
	  				lightThrough = true;
	  			}
	  			if(lightThrough)
	  				k++;
		  		var landingX = Math.round(sourceX-(2*j)*Math.cos(rayAngle));
		  		var landingY = Math.round(sourceY-(2*j)*Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
	  		}
		}
		maskGraphic.lineTo(lastX, lastY);
	}
	maskGraphic.lineTo(sourceX,sourceY);
	maskGraphic.worldAlpha = 0;
	maskGraphic.endFill();
	floorLayer.alpha = 0.5+Math.random()*0.5;
};
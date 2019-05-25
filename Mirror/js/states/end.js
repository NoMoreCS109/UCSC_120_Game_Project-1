// End state

var End = function(game) {};
End.prototype = {
	create: function() {
		// add End screen text
		var endText = game.add.text(game.width/2, game.height/2, 'Mirror', {font: 'Helvetica', fontSize: '48px', fill: '#0000FF'});
		endText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*0.6, 'You escaped the room', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press W to go back to title', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);


	},
	update: function() {
		// input to continue
		if(game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
			game.state.start('Title');
		}
	}
};
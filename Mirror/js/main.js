// GitHub link:
// https://github.com/tulubin/UCSC_120_Game_Project

// Group Member:
// Lubin Tu
// Ang Li
// Xueer Zhu

"use strict";

// ----------------Globals-----------------
// Objects:
var game;
var player;
var shadow;
var playerTween;
var footstep;
var hud;
var debug;
var light;
var map;
var floorLayer;
var terrainLayer;
var objectLayer;
var marker;
var cursors;
var interactText;
var shadowTexture;
var gradient;
var timer;
// Variable:
var playerTweenCompleted = true;
var playerOrientation = { up: false, down: true, left: false, right: false };
var frontObject = null;
var frontObjectIndex = -1;
var touch_counter = 0;
var directionAngle = 270*Math.PI/180;
var playerWalkingDuration = 500;
// Tile-Map Constants:
var DOOR_CLOSED_INDEX = 17;
var DOOR_OPEN_INDEX = 18;
var CLOTH_GOOD_INDEX = 25;
var CLOTH_BREAK_INDEX = 28;
var BALL_GOOD_INDEX = 29;
var BALL_BREAK_INDEX = 30;
var CASE_GOOD_INDEX = 31;
var CASE_BREAK_INDEX = 32;
var RING_GOOD_INDEX = 33;
var RING_BREAK_INDEX = 34;
var MIRROR_GOOD_INDEX = 26;
var MIRROR_BREAK_INDEX = 27;
var MIRROR_TOUCHED = false;
// Light Constants:
var LIGHT_ANGLE = Math.PI/3;
var NUMBER_OF_RAYS = 20;
var RAY_LENGTH = 80;
// Other Constants:
var GRID_SIZE = 32;
var CONTROL_RESPONSE_DELAY = 100;


window.onload = function() {	
	// define game
	game = new Phaser.Game(640, 360, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('End', End);
	game.state.start('Title');
}
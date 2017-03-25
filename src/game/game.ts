/// <reference path="../lib/phaser/typescript/phaser.d.ts" />
/// <reference path="./assetsloaderstate.ts" />
/// <reference path="./gameplaystate.ts" />

module MyModule {

	export class Game {
		game: Phaser.Game;
		constructor() {
			var canvas_width 	= 480,
					canvas_height = 720;
			this.game = new Phaser.Game(canvas_width, canvas_height, Phaser.CANVAS, 'content');
			this.game.state.add("AssetsLoaderState", AssetsLoaderState, false);
			this.game.state.add("GameState", GameState, false);
			this.game.state.start("AssetsLoaderState", true, true);
		}

		preload() {
		}

	}
}

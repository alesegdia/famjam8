/// <reference path="../lib/phaser/typescript/phaser.d.ts" />

module MyModule {

	export class Game {
		game: Phaser.Game;
		constructor() {
			this.game = new Phaser.Game(400, 400, Phaser.CANVAS, 'content');
			this.game.state.add("GameState", GameState, false);
			this.game.state.start("GameState", true, true);
		}
	}

	export class GameState extends Phaser.State {
		game: Phaser.Game;
		constructor() {
			super();
		}
		preload() {
			this.game.load.image('sample', 'assets/sample.png');
		}

		create() {
			var sample_sprite = this.game.add.sprite( 100, 100, 'sample' );
			sample_sprite.anchor.setTo(0.5, 0.5);

			this.game.stage.backgroundColor = "#5fcde4";
		}

		update() {

		}

		render() {
			this.game.debug.font = "90px Courier";
			this.game.debug.font = "14px Sans";
			this.game.debug.text("Sample phaser boilerplate", 100, 300, "black");
		}

	}
}

window.onload = () => {
	var game = new MyModule.Game();
}

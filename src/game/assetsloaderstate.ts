/// <reference path="../lib/phaser/typescript/phaser.d.ts" />


module MyModule {


export class AssetsLoaderState extends Phaser.State {
  game: Phaser.Game;
  preload() {
    this.game.load.image('bg', 'assets/bg.png');
    this.game.load.image('board', 'assets/board.png');
    this.game.load.image('marker', 'assets/marker.png');
    this.game.load.spritesheet('polvorones', 'assets/balls.png', 48, 48, 6);
  }

  create() {
    this.game.state.start("GameState");
  }
}

}

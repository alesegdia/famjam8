/// <reference path="../lib/phaser/typescript/phaser.d.ts" />


module MyModule {


export class GameState extends Phaser.State {
  game: Phaser.Game
  board: Board
  constructor() {
    super();
  }
  preload() {

  }

  create() {
    var sample_sprite = this.game.add.sprite( 0, 0, 'bg' );
    sample_sprite.anchor.setTo(0, 0);
    this.game.stage.backgroundColor = "#5fcde4";
    this.board = new Board(this.game, 8, 11);
    //this.game.time.events.add(Phaser.Timer.SECOND * 4, Board.cleanTable, this.board);
  }

  render() {
    this.game.debug.font = "90px Sans";
    this.game.debug.text("Porvoron Crush", 85, 60, "white", "40px Sans");
    this.game.debug.text(this.board.getPoints(), 85, 80, "white", "20px Sans");
  }

}

}

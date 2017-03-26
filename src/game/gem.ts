/// <reference path="../lib/phaser/typescript/phaser.d.ts" />

var type_to_int = {
  "yellow": 0, "orange": 1, "red": 2, "blue": 3, "green": 4, "purple": 5
};

var valid_types = [
  "yellow", "orange", "red", "green", "blue", "purple"
];

class Gem {
  game: Phaser.Game
  type: string
  sprite: Phaser.Sprite
  gridPosition: Phaser.Point
  constructor(game: Phaser.Game, col: number, row: number, type?: string) {
    this.game = game;
    this.sprite = this.game.add.sprite( 0, 0, "polvorones" );
    this.sprite.anchor.setTo( 0, 0 );
    this.gridPosition = new Phaser.Point(col, row);
    this.type = type || valid_types[this.game.rnd.integerInRange(0, valid_types.length - 1)];
    this.sprite.frame = type_to_int[this.type];
  }

  public destroy() {
    this.sprite.destroy();
  }

  public setPosition(x: number, y: number) {
    this.sprite.position.set( x, y );
  }

  public tweenTo(obj: any, t?: number, type?: (k:number)=>number) {
    return this.game.add.tween(this.sprite).to(obj, t || 4000, type || Phaser.Easing.Bounce.Out, true);
  }

  public get gemType(): string {
    return this.type;
  }
}

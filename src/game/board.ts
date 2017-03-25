/// <reference path="./matrix.ts" />
/// <reference path="./gem.ts" />
/// <reference path="../lib/phaser/typescript/phaser.d.ts" />

class Board {
  board: Matrix<Gem>
  sprite: Phaser.Sprite
  offset: Phaser.Point
  game: Phaser.Game
  constructor(game: Phaser.Game, width: number, height: number) {
    this.board = new Matrix<Gem>(width, height);
    this.offset = new Phaser.Point(48, 144);
    this.game = game;
    this.sprite = game.add.sprite(this.offset.x, this.offset.y, 'board');
    this.fill();
  }

  fill() {
    for( var i = 0; i < this.board.cols; i++ ) {
      for( var j = 0; j < this.board.rows; j++ ) {
        var gem = new Gem(this.game, i, j);
        gem.setPosition(this.offset.x + i * 48, this.offset.y + j * 48 - 700);
        gem.tweenTo({y: this.offset.y + j * 48}, 2000);
        this.board.set(i, j, gem);
      }
    }

    var horizontal_matches = this.collectMatches("horizontal");
    var vertical_matches = this.collectMatches("vertical");

    var columns_to_insert = [0, 0, 0, 0, 0, 0, 0, 0];

    for( var i = 0; i < horizontal_matches.length; i++ ) {
      var element = horizontal_matches[i];
      var from = element.from;
      var to = element.to;
      for( var x = from.x; x < to.x; x++ ) {
        this.destroy(x, from.y);
        columns_to_insert[x]++;
      }
    }

    for( var i = 0; i < vertical_matches.length; i++ ) {
      var element = vertical_matches[i];
      var from = element.from;
      var to = element.to;
      for( var y = from.y; y < to.y; y++ ) {
        this.destroy(from.x, y);
        columns_to_insert[from.x]++;
      }
    }

  }

  destroy(x: number, y:number) {
    var gem = this.board.get(x, y);
    if( gem != null ) {
      gem.destroy();
      this.board.set(x, y, null);
    }
  }

  collectMatches(direction:string): any[]{
    var get_gem = (col:number, row:number): Gem => {
      debugger;
      if( direction == "vertical" ) {
        return this.board.get(col, row);
      } else {
        return this.board.get(row, col);
      }
    };
    var create_point = (x:number, y:number): Phaser.Point => {
      if( direction == "vertical" ) {
        return new Phaser.Point(x, y)
      } else {
        return new Phaser.Point(y, x);
      }
    };

    var outer_top, inner_top;
    if( direction == "vertical" ) {
      outer_top = this.board.cols;
      inner_top = this.board.rows;
    } else {
      outer_top = this.board.rows;
      inner_top = this.board.cols;
    }

    var punctuations = [];
    for( var i = 0; i < outer_top; i++ ) {
      var strike = 1;
      var strike_type = get_gem(i, 0).gemType;
      var start_strike = create_point(i, 0);
      for( var j = 1; j < inner_top; j++ ) {
        var new_gem = get_gem(i, j);
        var try_push_strike = false;
        if( new_gem.gemType == strike_type ) {
          strike++;
          if( j == inner_top - 1) {
            try_push_strike = true;
          }
        } else {
          try_push_strike = true;
        }
        if( try_push_strike ){
          if( strike >= 3 ) {
            var punctuation = {
              type: direction,
              from: start_strike,
              to: create_point(i, j)
            };
            punctuations.push(punctuation);
          }
          start_strike = create_point(i, j);
          strike = 1;
          strike_type = new_gem.type;
        }
      }
    }
    return punctuations;
  }

}

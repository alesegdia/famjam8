/// <reference path="./matrix.ts" />
/// <reference path="./gem.ts" />
/// <reference path="../lib/phaser/typescript/phaser.d.ts" />

class Board {
  board: Matrix<Gem>
  sprite: Phaser.Sprite
  offset: Phaser.Point
  game: Phaser.Game
  marker: Phaser.Sprite
  blocked: boolean
  constructor(game: Phaser.Game, width: number, height: number) {
    this.board = new Matrix<Gem>(width, height);
    this.offset = new Phaser.Point(48, 144);
    this.game = game;
    this.sprite = game.add.sprite(this.offset.x, this.offset.y, 'board');
    this.marker = game.add.sprite(-100, -100, 'marker');
    this.fill();
    this.points = 0;
    this.game.input.onDown.add(this.onClick, this);
    this.blocked = false;
  }
  // waiting, chosedest
  clickStatus: string = "waiting"
  srcGemPos: Phaser.Point
  onClick(evt:Phaser.Pointer) {
    if(this.blocked) return;
    var x = evt.clientX - this.offset.x;
    var y = evt.clientY - this.offset.y;

    if( x >= 0 && x < 8 * 48 && y >= 0 && y < 11 * 48 ) {
      var idx = Math.floor(x / 48),
          idy = Math.floor(y / 48);
      switch(this.clickStatus) {
        case "waiting":
          this.srcGemPos = new Phaser.Point(idx, idy);
          this.clickStatus = "chosedest";
          this.putMarker(idx, idy);
          break;
        case "chosedest":
          this.trySwap(idx, idy);
          this.clearMarker();
          this.clickStatus = "waiting";
          break;
      }
    }

  }

  clearMarker() {
    this.marker.x = -100;
    this.marker.y = -100;
  }

  putMarker(idx:number, idy:number) {
    this.marker.x = this.offset.x + idx * 48;
    this.marker.y = this.offset.y + idy * 48;
  }

  trySwap(x: number, y: number) {
    if( Math.abs(this.srcGemPos.x - x) + Math.abs(this.srcGemPos.y - y) == 1 ) {
      debugger;
      this.blocked = true;
      this.board.swap(this.srcGemPos.x, this.srcGemPos.y, x, y);
      var g1 = this.board.get(this.srcGemPos.x, this.srcGemPos.y);
      var g2 = this.board.get(x, y);
      var token = 0;
      var fn = () => {
        token = token + 1;
        if( token == 2 )
        {
            var tween = this.cleanTable();
            if( tween !== null ) {
                    this.fill();
            } else {
              this.board.swap(this.srcGemPos.x, this.srcGemPos.y, x, y);
              var g1 = this.board.get(this.srcGemPos.x, this.srcGemPos.y);
              var g2 = this.board.get(x, y);
              console.log(g1);
              console.log(g2);
              var gt1 = g1.tweenTo({x:g2.sprite.x, y:g2.sprite.y}, 100, Phaser.Easing.Quartic.Out);
              g2.tweenTo({x:g1.sprite.x, y:g1.sprite.y}, 100, Phaser.Easing.Quartic.Out);
              gt1.onComplete.addOnce(() => { debugger; this.blocked = false; })
            }
        }
      };
      var tween1 = g1.tweenTo({x:g2.sprite.x, y:g2.sprite.y}, 100, Phaser.Easing.Quartic.Out);
      var tween2 = g2.tweenTo({x:g1.sprite.x, y:g1.sprite.y}, 100, Phaser.Easing.Quartic.Out);
      tween1.onComplete.addOnce(fn);
      tween2.onComplete.addOnce(fn);
    }
  }

  fillGem(col:number, row:number): Phaser.Tween {
    var gem = new Gem(this.game, col, row);
    gem.setPosition(this.offset.x + col * 48, this.offset.y + row * 48 - 700);
    var tween = gem.tweenTo({y: this.offset.y + row * 48}, 300);
    this.board.set(col, row, gem);
    return tween;
  }

  fill() {
    debugger;
    this.blocked = true;
    var last_tween: Phaser.Tween;

    for( var i = 0; i < this.board.cols; i++ ) {
      for( var j = 0; j < this.board.rows; j++ ) {
        var gem = this.board.get(i, j);
        if( gem == null ) {
          last_tween = this.fillGem(i, j);
        }
      }
    }

    if( last_tween ) {
      last_tween.onComplete.addOnce(() => {
        var tween = this.cleanTable();
        if( tween !== null ) {
            this.fill();
        }
      });
    }
  }

  emptyGaps() {
    for( var i = 0; i < this.board.cols; i++ ) {
      for( var j = 0; j < this.board.rows; j++ ) {
        var gem = this.board.get(i, j);
        if( gem == null ) return true;
      }
    }
    return false;
  }

  getPointsForType(type:string): number {
    switch(type) {
      case "yellow": return 500;
      case "orange": return 1000;
      case "red": return 2000;
      case "green": return 4000;
      case "blue": return 8000;
      case "purple": return 10000;
    }
    return 0;
  }

  addPoints(match:any) {
    this.points += match.count * this.getPointsForType(match.type);
  }

  public getPoints(): number {
    return this.points;
  }

  public cleanTable (): Phaser.Tween {

    var horizontal_matches = this.collectMatches("horizontal");
    var vertical_matches = this.collectMatches("vertical");

    this.clearMatches(horizontal_matches, "horizontal");
    this.clearMatches(vertical_matches, "vertical");

    return this.dropdownGems();
  }

  points: number

  public dropdownGems(): Phaser.Tween {
    var last_tween = null;
    for( var x = 0; x < this.board.cols; x++ ) {
      var gap = 0;
      for( var y = this.board.height - 1; y >= 0; y-- ) {
        var gem = this.board.get(x, y);
        if( gem == null ) {
          gap++;
        } else {
          if( gap > 0 ) {
            this.board.swap(x, y, x, y + gap);
            last_tween = gem.tweenTo({y: gem.sprite.y + 48 * gap}, 300);
            last_tween.onComplete.addOnce(() => { debugger; this.blocked = false; });
          }
        }
      }
      if( gap != 0 )
      {
          last_tween = 0xDEADBEEF;
      }
    }
    return last_tween;
  }

  public clearMatches(matches: any[], direction: string) {
    var columns_to_insert = [0, 0, 0, 0, 0, 0, 0, 0];

    var destroy_element = (k: number, from: Phaser.Point) => {
      if( direction == "horizontal") {
        this.destroy(k,from.y);
        columns_to_insert[k]++;
      } else {
        this.destroy(from.x, k);
        columns_to_insert[from.x]++;
      }
    };

    for( var i = 0; i < matches.length; i++ ) {
      var e = matches[i];
      this.addPoints(e);
      var start_value, end_value;
      if( direction == "horizontal" ) {
        start_value = e.from.x;
        end_value = e.to.x;
      } else {
        start_value = e.from.y;
        end_value = e.to.y;
      }
      for( var k = start_value; k <= end_value; k++ ) {
        destroy_element(k, e.from);
      }
    }

  }

  destroy(x: number, y:number) {
    var gem = this.board.get(x, y);
    if( gem != null ) {
      console.log("destroy " + gem.gemType);
      gem.destroy();
      this.board.set(x, y, null);
    }
  }

  collectMatches(direction:string): any[]{

    var punctuations = [];

    var get_gem = (col:number, row:number): Gem => {
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
      var strike_count = 1;
      var strike_type = get_gem(i, 0).gemType;
      var start_strike = create_point(i, 0);
      for( var j = 1; j < inner_top; j++ ) {
        var new_gem = get_gem(i, j);
        var try_push_strike = false;
        var was_last = false;
        if( new_gem.gemType == strike_type ) {
          strike_count++;
          if( j == inner_top - 1) {
            try_push_strike = true;
            was_last = true;
          }
        } else {
          try_push_strike = true;
        }
        if( try_push_strike ){
          if( strike_count >= 3 ) {
            var rj = j;
            if( false == was_last )
            {
                  rj--;
            }
            var punctuation = {
              dir: direction,
              from: start_strike,
              to: create_point(i, rj),
              type: strike_type,
              count: strike_count
            };
            punctuations.push(punctuation);
          }
          start_strike = create_point(i, j);
          strike_count = 1;
          strike_type = new_gem.type;
        }
      }
    }
    return punctuations;

  }

}

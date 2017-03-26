var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyModule;
(function (MyModule) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            return _super.call(this) || this;
        }
        GameState.prototype.preload = function () {
        };
        GameState.prototype.create = function () {
            var sample_sprite = this.game.add.sprite(0, 0, 'bg');
            sample_sprite.anchor.setTo(0, 0);
            this.game.stage.backgroundColor = "#5fcde4";
            this.board = new Board(this.game, 8, 11);
        };
        GameState.prototype.render = function () {
            this.game.debug.font = "90px Sans";
            this.game.debug.text("Porvoron Crush", 85, 60, "white", "40px Sans");
            this.game.debug.text(this.board.getPoints(), 85, 80, "white", "20px Sans");
        };
        return GameState;
    }(Phaser.State));
    MyModule.GameState = GameState;
})(MyModule || (MyModule = {}));

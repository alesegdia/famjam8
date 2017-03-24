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
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(400, 400, Phaser.CANVAS, 'content');
            this.game.state.add("GameState", GameState, false);
            this.game.state.start("GameState", true, true);
        }
        return Game;
    }());
    MyModule.Game = Game;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            return _super.call(this) || this;
        }
        GameState.prototype.preload = function () {
            this.game.load.image('sample', 'assets/sample.png');
        };
        GameState.prototype.create = function () {
            var sample_sprite = this.game.add.sprite(100, 100, 'sample');
            sample_sprite.anchor.setTo(0.5, 0.5);
            this.game.stage.backgroundColor = "#5fcde4";
        };
        GameState.prototype.update = function () {
        };
        GameState.prototype.render = function () {
            this.game.debug.font = "90px Courier";
            this.game.debug.font = "14px Sans";
            this.game.debug.text("Sample phaser boilerplate", 100, 300, "black");
        };
        return GameState;
    }(Phaser.State));
    MyModule.GameState = GameState;
})(MyModule || (MyModule = {}));
window.onload = function () {
    var game = new MyModule.Game();
};

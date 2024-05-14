var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
            this.game.debug.text("Patry-R-Crush", 110, 60, "white", "40px Sans");
            this.game.debug.text(this.board.getPoints(), 110, 80, "white", "20px Sans");
        };
        return GameState;
    }(Phaser.State));
    MyModule.GameState = GameState;
})(MyModule || (MyModule = {}));

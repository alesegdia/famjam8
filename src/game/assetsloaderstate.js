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
    var AssetsLoaderState = (function (_super) {
        __extends(AssetsLoaderState, _super);
        function AssetsLoaderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AssetsLoaderState.prototype.preload = function () {
            this.game.load.image('bg', 'assets/bg.png');
            this.game.load.image('board', 'assets/board.png');
            this.game.load.spritesheet('polvorones', 'assets/balls.png', 48, 48, 6);
        };
        AssetsLoaderState.prototype.create = function () {
            this.game.state.start("GameState");
        };
        return AssetsLoaderState;
    }(Phaser.State));
    MyModule.AssetsLoaderState = AssetsLoaderState;
})(MyModule || (MyModule = {}));

/// <reference path="../lib/phaser/typescript/phaser.d.ts" />
/// <reference path="./assetsloaderstate.ts" />
/// <reference path="./gameplaystate.ts" />
var MyModule;
(function (MyModule) {
    var Game = (function () {
        function Game() {
            var canvas_width = 480, canvas_height = 720;
            this.game = new Phaser.Game(canvas_width, canvas_height, Phaser.CANVAS, 'content');
            this.game.state.add("AssetsLoaderState", MyModule.AssetsLoaderState, false);
            this.game.state.add("GameState", MyModule.GameState, false);
            this.game.state.start("AssetsLoaderState", true, true);
        }
        Game.prototype.preload = function () {
        };
        return Game;
    })();
    MyModule.Game = Game;
})(MyModule || (MyModule = {}));

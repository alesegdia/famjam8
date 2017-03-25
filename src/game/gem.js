var type_to_int = {
    "yellow": 1, "orange": 2, "red": 3, "blue": 4, "green": 5, "purple": 6
};
var valid_types = [
    "yellow", "orange", "red", "green", "blue", "purple"
];
var Gem = (function () {
    function Gem(game, col, row, type) {
        this.game = game;
        this.sprite = this.game.add.sprite(0, 0, "polvorones");
        this.sprite.anchor.setTo(0, 0);
        this.gridPosition = new Phaser.Point(col, row);
        this.type = type || valid_types[this.game.rnd.integerInRange(0, valid_types.length)];
        this.sprite.frame = type_to_int[this.type];
    }
    Gem.prototype.destroy = function () {
        this.sprite.destroy();
    };
    Gem.prototype.setPosition = function (x, y) {
        this.sprite.position.set(x, y);
    };
    Gem.prototype.tweenTo = function (obj, t) {
        return this.game.add.tween(this.sprite).to(obj, t || 1000, Phaser.Easing.Bounce.Out, true);
    };
    Object.defineProperty(Gem.prototype, "gemType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    return Gem;
}());

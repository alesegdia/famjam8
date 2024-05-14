var Matrix = (function () {
    function Matrix(width, height, data) {
        this.width = width;
        this.height = height;
        if (data) {
            this.data = data;
            if (this.data.length != width * height) {
                throw new Error("Provided data doesn't fit size");
            }
        }
        else {
            this.fill(null);
        }
    }
    Object.defineProperty(Matrix.prototype, "cols", {
        get: function () {
            return this.width;
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.swap = function (x1, y1, x2, y2) {
        var e1 = this.get(x1, y1);
        this.set(x1, y1, this.get(x2, y2));
        this.set(x2, y2, e1);
    };
    Object.defineProperty(Matrix.prototype, "rows", {
        get: function () {
            return this.height;
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.fill = function (value) {
        this.data = [];
        for (var i = 0; i < this.width * this.height; i++) {
            this.data.push(value);
        }
    };
    Matrix.prototype.assertAccess = function (col, row) {
        if (col < 0 && col >= this.width &&
            row < 0 && row >= this.height) {
            throw Error("wrong index");
        }
    };
    Matrix.prototype.coordToIndex = function (col, row) {
        return row * this.width + col;
    };
    Matrix.prototype.get = function (col, row) {
        this.assertAccess(col, row);
        return this.data[this.coordToIndex(col, row)];
    };
    Matrix.prototype.set = function (col, row, value) {
        this.assertAccess(col, row);
        this.data[this.coordToIndex(col, row)] = value;
    };
    return Matrix;
}());

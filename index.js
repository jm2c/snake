"use strict";
var Body = (function () {
    function Body(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    Body.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect((this.x - 1) * this.size, (this.y - 1) * this.size, this.size, this.size);
    };
    return Body;
}());
var Snake = (function () {
    function Snake(head) {
        this.body = new Array(head);
    }
    Snake.prototype.draw = function (ctx) {
        this.body.forEach(function (b) {
            b.draw(ctx);
        });
    };
    return Snake;
}());
var SnakeGame = (function () {
    function SnakeGame(width) {
        this.pixel = width / 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = width * 1.5;
        this.canvas.style.backgroundColor = 'black';
        var head = new Body(11, 16, this.pixel);
        this.snake = new Snake(head);
    }
    SnakeGame.prototype.draw = function () {
        this.snake.draw(this.ctx);
    };
    SnakeGame.prototype.update = function () { };
    SnakeGame.prototype.start = function () {
        this.draw();
    };
    return SnakeGame;
}());
var dir;
(function (dir) {
    dir[dir["UP"] = 8] = "UP";
    dir[dir["LEFT"] = 4] = "LEFT";
    dir[dir["RIGHT"] = 6] = "RIGHT";
    dir[dir["DOWN"] = 2] = "DOWN";
})(dir || (dir = {}));
var key;
(function (key) {
    key[key["UP"] = 38] = "UP";
    key[key["LEFT"] = 37] = "LEFT";
    key[key["RIGHT"] = 39] = "RIGHT";
    key[key["DOWN"] = 40] = "DOWN";
})(key || (key = {}));
var game = new SnakeGame(400);
document.body.appendChild(game.canvas);
game.start();

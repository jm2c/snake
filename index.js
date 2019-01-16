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
        this.direction = dir.UP;
    }
    Snake.prototype.draw = function (ctx) {
        this.body.forEach(function (b) {
            b.draw(ctx);
        });
    };
    Snake.prototype.update = function () {
        var head = this.body[0];
        switch (this.direction) {
            case dir.UP:
                head.y--;
                break;
            case dir.DOWN:
                head.y++;
                break;
            case dir.LEFT:
                head.x--;
                break;
            case dir.RIGHT:
                head.x++;
                break;
        }
        if (head.x > 20) {
            head.x = 20;
        }
        if (head.x < 1) {
            head.x = 1;
        }
        if (head.y > 30) {
            head.y = 30;
        }
        if (head.y < 1) {
            head.y = 1;
        }
    };
    return Snake;
}());
var SnakeGame = (function () {
    function SnakeGame(width) {
        var _this = this;
        this.pixel = width / 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = width * 1.5;
        this.canvas.style.backgroundColor = 'black';
        var head = new Body(11, 16, this.pixel);
        this.snake = new Snake(head);
        this.fps = 8;
        this.now = 0;
        this.then = Date.now();
        this.interval = 1000 / this.fps;
        this.delta = 0;
        document.addEventListener('keydown', function (evt) {
            var k = evt.keyCode;
            switch (k) {
                case key.UP:
                    _this.snake.direction = dir.UP;
                    break;
                case key.LEFT:
                    _this.snake.direction = dir.LEFT;
                    break;
                case key.RIGHT:
                    _this.snake.direction = dir.RIGHT;
                    break;
                case key.DOWN:
                    _this.snake.direction = dir.DOWN;
                    break;
            }
        });
    }
    SnakeGame.prototype.draw = function () {
        this.snake.draw(this.ctx);
    };
    SnakeGame.prototype.update = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.update(); });
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snake.update();
            this.draw();
            this.then = this.now - (this.delta % this.interval);
        }
    };
    SnakeGame.prototype.start = function () {
        this.update();
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

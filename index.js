"use strict";
var Body = (function () {
    function Body(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    Body.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect((this.x - 1) * this.size + 1, (this.y - 1) * this.size + 1, this.size - 2, this.size - 2);
    };
    return Body;
}());
var Food = (function () {
    function Food(size) {
        this.size = size / 2;
        this.x = Math.round(19 * Math.random() + 1);
        this.y = Math.round(29 * Math.random() + 1);
    }
    Food.prototype.move = function (snake) {
        this.x = Math.round(19 * Math.random() + 1);
        this.y = Math.round(29 * Math.random() + 1);
        var badPosition = false;
        for (var _i = 0, _a = snake.body; _i < _a.length; _i++) {
            var part = _a[_i];
            if (part.x == this.x && part.y == this.y) {
                badPosition = true;
                break;
            }
        }
        if (badPosition)
            this.move(snake);
    };
    Food.prototype.draw = function (ctx) {
        ctx.fillStyle = 'firebrick';
        ctx.fillRect(this.size * (2 * this.x - 3 / 2), this.size * (2 * this.y - 3 / 2), this.size, this.size);
    };
    return Food;
}());
var Snake = (function () {
    function Snake(head) {
        this.body = new Array(head, new Body(head.x, head.y - 1, head.size));
        this.alive = true;
        this.score = 0;
        this.direction = dir.UP;
    }
    Snake.prototype.growth = function () {
        var head = this.body[0];
        this.body.push(new Body(head.x, head.y, head.size));
    };
    Snake.prototype.draw = function (ctx) {
        this.body.forEach(function (b) {
            b.draw(ctx);
        });
    };
    Snake.prototype.update = function () {
        var head = this.body[0];
        for (var i = this.body.length - 1; i >= 0; i--) {
            if (!this.body[i - 1])
                continue;
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        this.score = this.body.length - 2;
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
    };
    return Snake;
}());
var SnakeGame = (function () {
    function SnakeGame(width, options) {
        if (options === void 0) { options = {
            boundries: true,
            velocity: 8
        }; }
        var _this = this;
        this.pixel = width / 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = width * 1.5;
        this.canvas.style.backgroundColor = 'black';
        var head = new Body(11, 16, this.pixel);
        this.snake = new Snake(head);
        this.food = new Food(this.pixel);
        this.options = options;
        this.now = 0;
        this.then = Date.now();
        this.interval = 1000 / this.options.velocity;
        this.delta = 0;
        document.addEventListener('keydown', function (evt) {
            var k = evt.keyCode;
            switch (k) {
                case key.UP:
                    if (_this.snake.direction != dir.DOWN)
                        _this.snake.direction = dir.UP;
                    break;
                case key.LEFT:
                    if (_this.snake.direction != dir.RIGHT)
                        _this.snake.direction = dir.LEFT;
                    break;
                case key.RIGHT:
                    if (_this.snake.direction != dir.LEFT)
                        _this.snake.direction = dir.RIGHT;
                    break;
                case key.DOWN:
                    if (_this.snake.direction != dir.UP)
                        _this.snake.direction = dir.DOWN;
                    break;
            }
        });
    }
    SnakeGame.prototype.draw = function () {
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
    };
    SnakeGame.prototype.gameOver = function () {
        var _this = this;
        setTimeout(function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.ctx.fillStyle = 'white';
            _this.ctx.textAlign = 'center';
            _this.ctx.font = "20pt Calibri";
            _this.ctx.fillText("Game Over", _this.canvas.width / 2, _this.canvas.height / 2);
            _this.ctx.fillText('Score: ' + _this.snake.score, _this.canvas.width / 2, _this.canvas.height / 2 + 28);
        }, 300);
        document.addEventListener('keypress', function (evt) {
            if (evt.code == "Space") {
            }
        });
    };
    SnakeGame.prototype.update = function () {
        var _this = this;
        if (!this.snake.alive) {
            this.gameOver();
            return;
        }
        requestAnimationFrame(function () { return _this.update(); });
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta > this.interval) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snake.update();
            var head = this.snake.body[0];
            for (var _i = 0, _a = this.snake.body; _i < _a.length; _i++) {
                var b = _a[_i];
                if (b == head)
                    continue;
                if (head.x == b.x && head.y == b.y) {
                    this.snake.alive = false;
                }
            }
            if (this.options.boundries) {
                if (head.x > 20 || head.x < 1 || head.y > 30 || head.y < 1) {
                    this.snake.alive = false;
                }
            }
            else {
                if (head.x > 20)
                    head.x = 1;
                if (head.x < 1)
                    head.x = 20;
                if (head.y > 30)
                    head.y = 1;
                if (head.y < 1)
                    head.y = 30;
            }
            if (head.x == this.food.x && head.y == this.food.y) {
                this.snake.growth();
                this.food.move(this.snake);
            }
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
var game = new SnakeGame(400, {
    boundries: true,
    velocity: 8
});
document.body.appendChild(game.canvas);
game.start();

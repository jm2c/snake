"use strict";
var Body = (function () {
    function Body(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    Body.prototype.draw = function (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    };
    return Body;
}());
var Snake = (function () {
    function Snake(head) {
        this.body = new Array(head);
    }
    return Snake;
}());
var SnakeGame = (function () {
    function SnakeGame(width, height) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = 'black';
    }
    return SnakeGame;
}());
var game = new SnakeGame(400, 600);
document.body.appendChild(game.canvas);

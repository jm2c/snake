const game = new SnakeGame(400, {
    boundries: true,
    velocity: 8
});
document.body.appendChild(game.canvas);
game.start();

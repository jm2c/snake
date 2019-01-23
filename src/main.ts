const game = new SnakeGame(400, {
    boundries: true,
    velocity: 8
});
document.body.prepend(game.canvas);
game.start();

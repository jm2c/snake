class SnakeGame {
    canvas: HTMLCanvasElement;
    ctx:    CanvasRenderingContext2D;
    pixel:  number;
    snake:  Snake;
    food:   Food;
    options: Options;
    playing: boolean;

    now:      number;
    then:     number;
    interval: number;
    delta:    number;

    constructor(width: number, options={
        boundries: true,
        velocity: 8
    }) {
        // With this measurements we get a 20x30 grid
        this.pixel = width / 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.width = width;
        this.canvas.height = width * 1.5;
        this.canvas.style.backgroundColor = 'black';

        const head = new Body(11, 16, this.pixel);
        this.snake = new Snake(head);
        this.food = new Food(this.pixel);
        this.options = options;
        this.playing = false;
        
        // Control FPS
        this.now = 0;
        this.then = Date.now();
        this.interval = 1000/this.options.velocity;
        this.delta = 0;

        // Controllers
        document.addEventListener('keydown', evt => {
            const k = evt.keyCode;
            switch(k) {
                case key.UP:
                    if(this.snake.direction != dir.DOWN)
                        this.snake.direction = dir.UP;
                    break;
                case key.LEFT:
                    if(this.snake.direction != dir.RIGHT)
                        this.snake.direction = dir.LEFT;
                    break;
                case key.RIGHT:
                    if(this.snake.direction != dir.LEFT)
                        this.snake.direction = dir.RIGHT;
                    break;
                case key.DOWN:
                    if(this.snake.direction != dir.UP)
                        this.snake.direction = dir.DOWN;
                    break;
            }
        });
    }

    draw(): void {
        this.food.draw(this.ctx);
        this.snake.draw(this.ctx);
    }

    gameOver(): void {
        setTimeout(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.font = "bold 25pt Monospace";
            
            this.ctx.fillText(
                "Game Over",
                this.canvas.width / 2,
                this.canvas.height / 2 - 30
            );

            this.ctx.font = "20pt Monospace";
            this.ctx.fillText(
                'Score: ' + this.snake.score,
                this.canvas.width / 2,
                this.canvas.height / 2
            );
            this.ctx.fillText(
                'Press <R> to retry.',
                this.canvas.width / 2,
                this.canvas.height / 2 + 48
            )
        }, 300);

        document.addEventListener('keypress', evt => {
            if( !this.playing && evt.code === "KeyR" ) {
                const head = new Body(11, 16, this.pixel);
                this.snake = new Snake(head);
                this.food = new Food(this.pixel);
                this.start();
            }
        })

    }

    update(): void {
        if(!this.snake.alive){
            this.gameOver();
            this.playing = false;
            return;
        }

        requestAnimationFrame(() => this.update());
        this.now = Date.now();
        this.delta = this.now - this.then;
        if(this.delta > this.interval){
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.snake.update();

            // Collide
            const head = this.snake.body[0];
            for(let b of this.snake.body) {
                if(b == head) continue;
                if(head.x == b.x && head.y == b.y) {
                    this.snake.alive = false;
                }
            }
            if(this.options.boundries){
                if(head.x > 20 || head.x < 1 || head.y > 30 || head.y < 1){
                    this.snake.alive = false;
                }
            }else{
                if(head.x > 20) head.x = 1;
                if(head.x < 1)  head.x = 20;
                if(head.y > 30) head.y = 1;
                if(head.y < 1)  head.y = 30;
            }

            // Eat
            if(head.x == this.food.x && head.y == this.food.y){
                this.snake.growth();
                this.food.move(this.snake);
            }

            this.draw();
            this.then = this.now - (this.delta % this.interval);
        }
    }

    start(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = "bold 25pt Monospace";
        this.ctx.fillText(
            "Snake",
            this.canvas.width / 2,
            this.canvas.height / 2 - 30
        );

        this.ctx.font = "20pt Monospace";
        this.ctx.fillText(
            "<spacebar> to start.",
            this.canvas.width / 2,
            this.canvas.height / 2 + 20
        );

        document.addEventListener('keypress', evt => {
            if(evt.charCode === 32) {
                this.playing = true;
                this.update();
            }
        });
    }
    
}
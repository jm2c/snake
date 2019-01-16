class SnakeGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pixel: number;
    snake: Snake;
    food: Food;

    fps: number;
    now: number;
    then: number;
    interval: number;
    delta: number;

    constructor(width: number) {
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
        
        // Control FPS
        this.fps = 1;
        this.now = 0;
        this.then = Date.now();
        this.interval = 1000/this.fps;
        this.delta = 0;

        // Controllers
        document.addEventListener('keydown', evt => {
            const k = evt.keyCode;
            switch(k) {
                case key.UP:
                    this.snake.direction = dir.UP;
                    break;
                case key.LEFT:
                    this.snake.direction = dir.LEFT;
                    break;
                case key.RIGHT:
                    this.snake.direction = dir.RIGHT;
                    break;
                case key.DOWN:
                    this.snake.direction = dir.DOWN;
                    break;
            }
        });
    }

    draw(): void {
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }

    update(): void {
        requestAnimationFrame(() => this.update());
        this.now = Date.now();
        this.delta = this.now - this.then;
        if(this.delta > this.interval){
            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.snake.update();
            this.draw();

            this.then = this.now - (this.delta % this.interval);
        }
    }

    start(): void {
        this.update();
    }
    
}
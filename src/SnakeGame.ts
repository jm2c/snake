class SnakeGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pixel: number;
    snake: Snake;

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

        
    }

    draw(): void {
        this.snake.draw(this.ctx);
    }

    update(): void {}

    start(): void {
        this.draw();
    }
    
}
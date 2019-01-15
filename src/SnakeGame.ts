class SnakeGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.style.backgroundColor = 'black';
    }

    
}
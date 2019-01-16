class Body {
    x: number;
    y: number;
    size: number;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw(ctx: CanvasRenderingContext2D) :void {
        ctx.fillStyle = 'white';
        ctx.fillRect(
            (this.x - 1)*this.size,
            (this.y - 1)*this.size,
            this.size,
            this.size
        );
    }
}
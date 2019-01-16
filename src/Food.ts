class Food {
    x: number;
    y: number;
    size: number;

    constructor(size: number) {
        this.x = Math.round(19*Math.random() + 1);
        this.y = Math.round(29*Math.random() + 1);
        this.size = size / 2;
    }

    draw(ctx: CanvasRenderingContext2D) :void {
        ctx.fillStyle = 'firebrick';
        ctx.fillRect(
            this.size*(2*this.x - 3/2),
            this.size*(2*this.y - 3/2),
            this.size,
            this.size
        );
    }
}
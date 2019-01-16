class Snake {
    body: Body[];

    constructor(head: Body) {
        this.body = new Array<Body>(head);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.body.forEach(b => {
            b.draw(ctx);
        });
    }
}
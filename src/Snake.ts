class Snake {
    body: Body[];
    direction: number;
    score: number;
    alive: boolean;

    constructor(head: Body) {
        this.body = new Array<Body>(
            head,
            new Body(head.x, head.y - 1, head.size)
        );
        this.alive = true;
        this.score = 0;
        this.direction = dir.UP;
    }

    growth(): void {
        const head = this.body[0];
        this.body.push(
            new Body(head.x, head.y, head.size)
        );
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.body.forEach(b => {
            b.draw(ctx);
        });
    }

    update(): void {
        const head = this.body[0];
        for(let i = this.body.length - 1; i >= 0; i--) {
            if(!this.body[i-1]) continue;
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.score = this.body.length - 2;

        switch(this.direction) {
            case dir.UP:
                head.y--;
                break;
            case dir.DOWN:
                head.y++;
                break;
            case dir.LEFT:
                head.x--;
                break;
            case dir.RIGHT:
                head.x++;
                break;
        }

    }
}
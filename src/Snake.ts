class Snake {
    body: Body[];
    direction: number;

    constructor(head: Body) {
        this.body = new Array<Body>(head);
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
        for(let i = this.body.length - 1; i >= 0; i--) {
            if(!this.body[i-1]) continue;
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        const head = this.body[0];
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
        if(head.x > 20){
            head.x = 20;
        }
        if(head.x < 1){
            head.x = 1;
        }
        if(head.y > 30){
            head.y = 30;
        }
        if(head.y < 1){
            head.y = 1;
        }
    }
}
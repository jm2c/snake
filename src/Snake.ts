class Snake {
    body: Body[];
    direction: number;

    constructor(head: Body) {
        this.body = new Array<Body>(head);
        this.direction = dir.UP;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.body.forEach(b => {
            b.draw(ctx);
        });
    }

    update(): void {
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
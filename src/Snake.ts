class Snake {
    body: Body[];

    constructor(head: Body) {
        this.body = new Array<Body>(head);
    }
}
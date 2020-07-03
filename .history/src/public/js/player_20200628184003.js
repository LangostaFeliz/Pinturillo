class Player{

    constructor(name) {
        this.score=0;
        this.name = name;
    }

    get score() {
        return this;
    }

    get name() {
        return this;
    }

}
export default player;
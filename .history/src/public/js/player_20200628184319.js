export default class Player{

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


var jugador=new Player("Feng");

console.log(jugador);
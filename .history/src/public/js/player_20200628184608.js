 class Player{
     constructor(name) {
         this.score=0;
         this.name = name;
     }
     getScore() {
         return this;
     }
     getName() {
         return this;
     }
 }
 var jugador=new Player("Feng");
 console.log(jugador.getScore());

// class Point {

//     constructor(x, y) {
//       this.x = x;
//       this.y = y;
//     }
  
//     toString() {
//       return '('+this.x+', '+this.y+')';
//     }
  
//   }
  
//   var point = new Point(2,3);
//   point.toString() // (2, 3)
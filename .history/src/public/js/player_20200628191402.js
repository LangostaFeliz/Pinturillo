class Player{
     constructor(name) {
         this.score=0;
         this.name = name;
     }
     getScore() {
         return this.score;
     }
     getName() {
         return this;
     }
 }
 module.exports = Player;

 

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
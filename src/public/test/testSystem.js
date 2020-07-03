const System=require('../js/system')

var sistema=new System();


sistema.addUserList("Feng","1253779");
sistema.addUserList("Hao","1253771");
sistema.addUserList("Sheng","1253772");
sistema.addUserList("EN","1253776");

console.log(sistema.userList);

sistema.deleteUser("1253776");
console.log("eliminar 1253776");
console.log(sistema.userList);
console.log(typeof undefined);

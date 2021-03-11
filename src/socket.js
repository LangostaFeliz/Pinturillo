module.exports=function (io,arrayData){
     var timerTurn;
  
    
     const System= require('./public/js/system');

     var sistema=new System();

 //   console.log(sistema);

    io.on('connection',socket => {
        //var arrayData=[];
        console.log("nuevo usuario");
        console.log(socket.id);
        console.log("Total cliente conectado:"+io.eio.clientsCount);
        
        


        socket.on('send idName',function(data){

          sistema.addUserList(data,socket.id);
          console.log(sistema.userList);
          io.sockets.emit('update user',sistema.userList);
          io.sockets.emit('new user',data);
          for (let i=0; i<sistema.line_history.length;i++){
          
          }
          
         })

        socket.on('send message',function(data){

           io.sockets.emit('new message',data);
        })




        //accion cuando se desconecta un servidor
        socket.on('disconnect',function(data){
          sistema.deleteUser(socket.id);
          console.log("Disponible en:"+sistema.userList.length);
          // actualiza userList
          io.sockets.emit('update user',sistema.userList);
          io.sockets.emit('exit user',);
          console.log(io.eio.clientsCount);    
          console.log("Se ha desconnectado un cliente ID:"+socket.id);
          
          if(sistema.userList.length==0){
            console.log("reinicia el servidor");
            sistema.clearData();
          }
        })

        
        
    

  
  });


  


}
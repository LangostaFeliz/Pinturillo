module.exports=function (io,arrayData){
     var timerTurn;
     var round=1,turn=0;
    
     const System= require('./public/js/system');

     var sistema=new System();

 //   console.log(sistema);

    io.on('connection',socket => {
        //var arrayData=[];
        console.log("nuevo usuario");
        console.log(socket.id);
        console.log("Total cliente conectado:"+io.eio.clientsCount);
        
        
        socket.on('draw line',(data)=>{
          sistema.line_history.push(data);
          io.emit('draw line',data);
        //  console.log(data);
        });

        socket.on('send idName',function(data){

          sistema.addUserList(data,socket.id);
          
          io.sockets.emit('update user',sistema.userList);
          for (let i=0; i<sistema.line_history.length;i++){
          socket.emit('draw line',sistema.line_history[i]);
            
          }
          
         })

        socket.on('send message',function(data){
         // console.log(data);
         console.log(sistema.getWordSelected());
         console.log(data.texto);
         if(sistema.getWordSelected()==data.texto){
          io.sockets.emit('word guessed',data.name);
          console.log(data.name+' Guessed the word');
         }else{
           io.sockets.emit('new message',data);}
        })

        socket.on('send Canva',function(data){
          //io.sockets.emit('new Canva',data);
          socket.broadcast.emit('new Canva',data);
          //console.log("enviando URL");
          console.log(data);
         
        })


        //accion cuando se desconecta un servidor
        socket.on('disconnect',function(data){
          sistema.deleteUser(socket.id);
          console.log("Disponible en:"+sistema.userList.length);
          // actualiza userList
          io.sockets.emit('update user',sistema.userList);
          console.log(io.eio.clientsCount);    
          console.log("Se ha desconnectado un cliente ID:"+socket.id);
        })

        socket.on('start timeTurn',function(data){
           var count=80;
           console.log(data);
           if(data===sistema.userList[turn].name){
             timerTurn= setInterval(function (){
               
               count--;
               io.sockets.emit('timeTurn',count);
               },1000)
           } else{
             console.log("error");
           }
           
          
        })


        

        // 
        socket.on('end timeTurn',function(){

          clearInterval(timerTurn);
          
          console.log("End time turn ");
        })


        // tiempo de espera para escoger la palabra
        socket.on('time choosing',()=>{
           var count=10;
           timerTurn=setInterval(()=>{
             count--;
            socket.emit('time choosing',count);
           },1000);
        })

        socket.on('end timer',()=>{
          console.log("Stop timer");
          clearInterval(timerTurn);
        })


            // selecion de la palabras
        socket.on('choose word',()=>{

          //socket.emit('choosing word',arrayWordChoose);
          socket.emit('choosing word',sistema.getWordsToChoose());
          console.log(sistema.getWordsToChoose());
        })

        socket.on('send choose word',(data)=>{
          sistema.setChooseSelected(data);
          socket.broadcast.emit('word to guess',data)
          socket.emit('word to draw',data);
        //  console.log(sistema.chooseSelected);
          clearInterval(timerTurn);
        })

        socket.on('start',(data)=>{
          if(socket.id==sistema.userList[0].id){
            //socket.emit('choosing word',sistema.getWordsToChoose());
            socket.emit('new turn');
          }else{
            socket.emit('error host');
          }
          
        })

        socket.on('next turn or round',()=>{
          sistema.turn+=1;
          console.log(sistema.userList[sistema.turn]);
          if(sistema.round>=3){
            io.sockets.emit('end game');
          }else
          if(sistema.turn>=sistema.userList.length){
            io.sockets.emit('next round',sistema.round);
            sistema.turn=0;
            sistema.round++;
            socket.to(sistema.userList[sistema.turn].id).emit('new turn');
          } else{
            
            socket.to(sistema.userList[sistema.turn].id).emit('new turn');
          }
        })
        
    

  
  });
  
  function initElement() {
     }

  function getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;
    
  }


}
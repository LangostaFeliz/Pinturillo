module.exports=function (io,arrayData){
     var timerTurn;
     var worlds=["hola","mundo","amistad","web","UABC","feng","Omar","Crisanto","Miriam","Victor","Soto"];
     var indexArrayWord=[];
     var arrayGuessWord=[];
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
          console.log(data);
        });

        socket.on('send idName',function(data){
           console.log(data);data
          let user={
            name:data,
            id:socket.id
          };
          sistema.addUserList(data,socket.id);
          
          io.sockets.emit('update user',sistema.userList);
          for (let i=0; i<sistema.line_history.length;i++){
            socket.emit('draw line',sistema.line_history[i]);
            
          }
          
         })

        socket.on('send message',function(data){
         // console.log(data);
         io.sockets.emit('new message',data);
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
          if(data===arrayData[turn].name){
            timerTurn= setInterval(function (){
            
              count--;
              io.sockets.emit('timeTurn',count);
              },1000)
          }
          console.log(arrayData[turn].name);
        })


        

        // 
        socket.on('end timeTurn',function(){

          clearInterval(timerTurn);
          if(turn<arrayData.length){
            io.to(arrayData[turn].id).emit('next turn');
            console.log("turno:"+turn);
          }else 
            if(round<=3){
              turn=0;
            io.to(arrayData[turn].id).emit('next round');
          }
          else {
            io.sockets.emit('end game');
          }
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

        socket.on('end time choosing',()=>{
          clearInterval(timerTurn);
        })


            // selecion de la palabras
        socket.on('choose word',()=>{
          let i=0;
          let arrayWordChoose=[];
          let index;
          while(i<3){
            index=getRandomInt(0,worlds.length);
            console.log(index);
            if(indexArrayWord.indexOf(index)<0){
              indexArrayWord.push(index);
              arrayWordChoose.push(worlds[index]);
              i++;
            }
          }
          //socket.emit('choosing word',arrayWordChoose);
          socket.to(socket.id).emit('choosing word',sistema.getWordsToChoose());
          console.log(arrayData[turn]);
        })

        socket.on('send choose word',(data)=>{
          arrayGuessWord.push(data);
          socket.broadcast.emit('word to guess',data)
          socket.emit('word to draw',data);
          clearInterval(timerTurn);
        })

      
        
    

  
  });
  
  function initElement() {
     }

  function getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;
    
  }


}
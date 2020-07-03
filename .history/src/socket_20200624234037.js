module.exports=function (io,arrayData){
     var timerTurn;
     var worlds=["hola","mundo","amistad","web","UABC"];
     var indexArrayWord=[];
     var arrayGuessWord=[];
     var round=1,turn=0;
     var line_histotry=[];
    io.on('connection',socket => {
        //var arrayData=[];
        console.log("nuevo usuario");
        console.log(socket.id);
        console.log(io.eio.clientsCount);
        
        
        socket.on('draw line',(data)=>{
          line_histotry.push(data.line);
          io.emit('draw line',data);
          console.log(data);
        });

        socket.on('send idName',function(data){
           console.log(data);data
          let ID={
            name:data,
            id:socket.id
          };
          arrayData.push(ID);
          console.log(arrayData[0]);
          io.sockets.emit('update user',arrayData);
          for (let i=0; i<line_histotry.length;i++){
            socket.emit('draw line',line_history[i]);
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
          let temp; 
          // Encontrar id desconectado en arrayData
         for(let i=0;i<arrayData.length;i++){
           if(arrayData[i].id==socket.id)
            {
              temp=arrayData[i];
            }
          }
          // buscar el indice
          let res=arrayData.indexOf(temp);
          // ajuste si indice es cero
           if(res!=0){
             temp=arrayData[0];
             arrayData[res]=temp;
           }
          for(let i=res ;i<arrayData.length-1;i++){
            arrayData[i]=arrayData[i+1]
          }
          // eliminar elemento de array a desconectar
          arrayData.pop();
          console.log("Disponible en:"+arrayData.length);
          // actualiza userList
          io.sockets.emit('update user',arrayData);
          console.log(io.eio.clientsCount);    
          console.log("Se ha desconnectado un cliente ID:"+socket.id);
        })

        socket.on('start timeTurn',function(data){
          var count=80;
          if(data===arrayData[0].name){
            timerTurn= setInterval(function (){
            //  console.log(count);
              count--;
              io.sockets.emit('timeTurn',count);
              },1000)
          }
          console.log(arrayData[0].name);
        })

        // 
        socket.on('end timeTurn',function(){

          clearInterval(timerTurn);
          if(turn<arrayData.length){
            io.to(arrayData[turn].id).emit('next turn');
          }else 
            if(round<=3){
              turn=0;
            io.to(arrayData[0].id).emit('next round');
          }
          else {
            io.sockets.emit('end game');
          }
          console.log("End time turn ");
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
          socket.emit('choosing word',arrayWordChoose);
        })

        socket.on('send choose word',(data)=>{
          arrayGuessWord.push(data);
          socket.broadcast.emit('word to guess',data)
          socket.emit('word to draw',data);
        })

      
        
    

  
  });
  
  function initElement() {
     }

  function getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;
    
  }


}
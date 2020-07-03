//const { response } = require("express");

$(function () {

    const socket= io();
    
    // obtener los DOM de para chatBox
    const chatBox=$('#chatBox');
    const mensajeForm = $('#mensaje-form');
    const name= $('#name');
    const texto=$('#texto');
    const chat=$('#chat');
    const who=$('#who');
    // obtener los DOM para login
    const loginBox=$('#loginBox')
    const loginForm=$('#loginForm');
    const loginName=$('#loginName');
    // DOM canva
    const componenteCanva=$("#componenteCanva");
    var dibujo="punto1x";
    // DOM userBox
    const userBox=$('#userBox');
    const userList=$('#userList');
    // timerBox
    const timerBox=$('#timerBox');
    const contentTimer=$('#contentTimer');
    // button start
    const buttonStart=$('#buttonStart');
    //chooseBox
    const chooseBox=$('#chooseBox');
    const chooseWordBox=$('#chooseWordBox');
    const chooseWord1=$('#chooseWord1');
    const chooseWord2=$('#chooseWord2');
    const chooseWord3=$('#chooseWord3');
    const choosing = $('#choosing');
    //guessBox
    const guessBox=$('#guessBox');
    const lettersBox=$('#lettersBox');
    //canva
    const canva=$('#can');
    const context=canva[0].getContext("2d");
    // scoreBox
    const scoreBox=$('#scoreBox');
    const totalScore=$('#totalScore');
    const buttonRestart=$('#buttonRestart');
    const borrador=$('#borrador');
    var drawCanva=false;
    var arrayWord=[];
    
    var jugador={
        name,
        score:0
    };
    

    //
    mouse={
        click:false,
        move:false,
        pos:{x:0,y:0},
        pos_prev:false,
    };
    initComponetLogin();
    // caja de login
    loginForm.submit(e=>{
        e.preventDefault();
        if(loginName.val()!=0){
            initComponetPlay();
            jugador.name=loginName.val();
            socket.emit('send idName',jugador.name);
            who.append(loginName.val());
        }
        else {
        alert("El nombre no esta registrado");        
        }
    });

// chatBox 
    // ocultar chatrBox

     
    // Chat BOX
   mensajeForm.submit(e=>{
        e.preventDefault();
       // console.log(name.val());

       var obj={
            name:jugador.name,
            texto:texto.val()
       };
 
        if(obj.texto!=0){
            socket.emit('send message',obj);
            
        }
        else {
            alert("favor de ingresar un mensaje ultil");
        }
        texto.val('');
    })

    //actualiza chatBox
    socket.on('new message',function(data){
        let  html='<div class="leftTalk"><span>'+data.name+':' +data.texto+'</span></div>';
        chat.append(html);
        console.log(html);
        //mover el curso de la sala al ultimo
        chat.scrollTop(chat[0].scrollHeight);
    });

    // actualiza canva
    socket.on('new Canva',function(data){

        });

        socket.on('update user',function(data){
            userList.empty();
            let html='';
            data.forEach(element => {
                html+='<div>'+element.name+"  score:"+element.score+'</div>';
            })
       //     userList[0].innerHTML(html);
            userList.append(html);
            console.log(html);

        })

        socket.on('timeTurn',(data)=>{
            console.log(data);
            buttonStart.hide();
            
            contentTimer.empty();
            let html = '<h4>'+data+'</h4>';
            contentTimer.append(html);
        })

        socket.on('check timeTurn',(data)=>{
            if(data===0){
                socket.emit('end timeTurn');
                socket.emit('next turn or round');
            }
        })


        socket.on('next turn',()=>{
            // socket.emit('start timeTurn',loginBox.val());
            socket.emit('choose word');
            texto.show();
        })


        socket.on('choosing word',(data)=>{
            chooseBox.show();
           // chooseWord1[0].innerText = data;
            choosing.empty();
            choosing.append(jugador.name+" is choosing!!");
            console.log(data);
           chooseWord1.val(data[0]);
           chooseWord2.val(data[1]);
           chooseWord3.val(data[2]);
           arrayWord[0]=data[0];
           arrayWord[1]=data[1];
           arrayWord[2]=data[2];
           console.log(data[0],data[1],data[2]);

        })
        // mostrar 
        socket.on('word to guess',(data)=>{
            var i=0;
            var char;
            lettersBox.empty();
            while(data.charAt(i)!=''){
                char=data.charAt(i);
                console.log("Letra a imprimir es :"+char+'valor de i:'+i);
                if(char===' '){
                    // html+='<pre style="display:inline-block;font-size:200%;"> </pre>';
                    lettersBox.append('<pre class="guessWord"> </pre>');
                }else{
                    // html+='<div style="display:inline-block;font-size:200%;">_</div>';
                    lettersBox.append('<div class="guessWord"">_</div>');
                }
                i++;
            }
            drawCanva=false;
        })

        socket.on('word to draw',(data)=>{
            var i=0;
            var char;
            lettersBox.empty();
            while(data.charAt(i)!=''){
                char=data.charAt(i);
                console.log("Letra a imprimir es :"+char+'valor de i:'+i);
                if(char===' '){
                    // html+='<pre style="display:inline-block;font-size:200%;"> </pre>';
                    lettersBox.append('<pre class="guessWord"> </pre>');
                }else{
                    // html+='<div style="display:inline-block;font-size:200%;">_</div>';
                    lettersBox.append('<div class="guessWord"">'+char+'</div>');
                }
                i++;
            }
            drawCanva=true;
            socket.emit('start timeTurn',jugador.name);
            
        })

        socket.on('draw line',(data)=>{
            const line= data.line;
            context.beginPath();
            context.strokeStyle=line[2];
            context.lineWidth=5;
            context.moveTo(line[0].x*500,line[0].y*400);
            context.lineTo(line[1].x*500,line[1].y*400)
            context.stroke();
           // console.log(data);
        })

        socket.on('time choosing',(data)=>{
            contentTimer.empty();
            let html = '<h4>'+data+'</h4>';
            contentTimer.append(html);
            if(data==0){
                let index=getRandomInt(0,2)
                socket.emit('send choose word',arrayWord[index]);
                //console.log("EL numero aleatorio es:"+index);
                socket.emit('start timeTurn',jugador.name);
                socket.emit('end timer');
                chooseBox.hide();
            }
        })
        socket.on('word guessed',(data)=>{
        let  html='<div class="leftTalk" style="background:green";><span>'+data+':guessed the word</span></div>';
        chat.append(html);
        console.log(html);
        //mover el curso de la sala al ultimo
        chat.scrollTop(chat[0].scrollHeight);
        console.log(data);
        
        })

        socket.on('end game',()=>{
            socket.emit('show score');
        })

        socket.on('show score',(data)=>{
            let html='';
            scoreBox.show();
            buttonRestart.show();
            data.forEach(e => {
                html+='<div>'+e.name+':'+e.score+'</div>';
            })
            totalScore.append(html);
        })

        

        socket.on('hide textBox',()=>{
            texto.hide();
        })

        socket.on('show textBox',()=>{
            texto.show();
        })


        socket.on('new turn',(data)=>{
            //texto.hide();
            console.log(data);
            socket.emit('time choosing');   
            socket.emit('choose word');
            
        })

        socket.on(('error host'),()=>{
            alert("You aren't Host ,You can't start the game");
            buttonStart.show();
        })

        chooseWord1.click(function (){
            
            socket.emit('send choose word',chooseWord1.val());
            socket.emit('end timer');
            chooseBox.hide();
        });

        chooseWord2.click(()=>{
            
            socket.emit('send choose word',chooseWord2.val());
            socket.emit('end timer');
            chooseBox.hide();
        })

        chooseWord3.click(()=>{
            socket.emit('send choose word',chooseWord3.val());
            socket.emit('end timer');
            chooseBox.hide();
        })

        buttonRestart.click(()=>{
            initComponetPlay();
            buttonRestart.hide();
        })

        borrador.click(()=>{
            if(drawCanva){
                context.clearRect(0,0,500,500);
                socket.emit('delete canva');
            }
        })

        buttonStart.click(function(){
            
           // socket.emit('start timeTurn',loginName.val());
           socket.emit('start',jugador);
           buttonStart.hide();
            
        })

        function getRandomInt (min,max){
            return Math.floor(Math.random()*(max-min))+min;
            
          };

        function  initComponetLogin(){
            guessBox.hide();
            buttonRestart.hide();
            buttonStart.hide();
            chatBox.hide();
            componenteCanva.hide();
            userBox.hide();
            chooseBox.hide();
            canva.hide();
            scoreBox.hide();
            //timerBox.hide();
        }

        function initComponetPlay(){
         //   timerBox.show();
            scoreBox.hide();
            loginBox.hide();
            guessBox.show();
            chatBox.show();
            componenteCanva.show();
            userBox.show();
            canva.show();
            buttonStart.show();
        }

    


window.onload = function (){
    
    // si cambias la ubiacion de canva tiene que ajustar
    // siguiente variable
    var ajusteCanva=185;
    function mouseCanva(){
        if(drawCanva){
            canva[0].addEventListener('mousedown',(e)=>{
                mouse.click=true;
                console.log(e.clientX,e.clientY);
            })
            canva[0].addEventListener('mousemove',(e)=>{
                mouse.move=true;
                mouse.pos.x=(e.clientX-500)/500;
                mouse.pos.y=(e.clientY-210)/400;
               // console.log(mouse);
            })
            canva[0].addEventListener('mouseup',(e)=>{
                mouse.click=false;
                mouse.move=false;
               // console.log(e.clientX);
            })
        }
    }

    function canvaLoop(){
        if(mouse.click && mouse.move && mouse.pos_prev){
            socket.emit('draw line',{line:[mouse.pos,mouse.pos_prev,context.strokeStyle]});
            mouse.move = false;
        }
       // console.log(drawCanva);
        mouseCanva();
       // console.log(context.strokeStyle);
        mouse.pos_prev={x:mouse.pos.x, y:mouse.pos.y};
        setTimeout(canvaLoop,25);
    }
    canvaLoop();

}

})

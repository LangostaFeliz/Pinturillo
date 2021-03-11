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
    // DOM userBox
    const userBox=$('#userBox');
    const userList=$('#userList');


    
    var jugador={
        name,
        score:0
    };
    

    //

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

    socket.on('exit user',function(data){
        let  html='<div class="leftTalk"><span>Alguien se salio de la sala</span></div>';
        chat.append(html);
        console.log(html);
        //mover el curso de la sala al ultimo
        chat.scrollTop(chat[0].scrollHeight);
    });

    socket.on('new user',function(data){
        let  html='<div class="leftTalk"><span>'+data+' entro a la sala</span></div>';
        chat.append(html);
        console.log(html);
        //mover el curso de la sala al ultimo
        chat.scrollTop(chat[0].scrollHeight);
    });



    // actualiza canva


        socket.on('update user',function(data){
            userList.empty();
            let html='';
            data.forEach(element => {
                html+='<div>'+element.name+'</div>';
            })
       //     userList[0].innerHTML(html);
            userList.append(html);
            console.log(html);

        })




        function  initComponetLogin(){ 
            chatBox.hide();
            userBox.hide();
        }

        function initComponetPlay(){
         //   timerBox.show();
            loginBox.hide();
            chatBox.show();
            userBox.show();

        }

    


})

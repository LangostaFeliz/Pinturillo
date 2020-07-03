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


    buttonStart.hide();
    chatBox.hide();
    componenteCanva.hide();
    userBox.hide();
    chooseBox.hide();
    // caja de login
    loginForm.submit(e=>{
        e.preventDefault();
        if(loginName.val()!=0){
            loginBox.hide();
            chatBox.show();
            componenteCanva.show();
            userBox.show();
            buttonStart.show();
            socket.emit('send idName',loginName.val());
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
            name:loginName.val(),
            texto:texto.val()
       };
        if(obj.texto!=0){
            socket.emit('send message',obj);
            
        }
        else {
            alert("favor de ingresar un mensaje ultil");
        }
        texto.val(' ');
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
        let oc=$('#can');
        let og=oc[0].getContext("2d");
        //og.moveTo(data.position.punto_x,data.position.punto_x);
        og.strokeStyle=data.color;
        og.fillStyle=data.color;
       // og.moveTo(data.moveX,data.moveY);
        switch (data.dibujo){
            case "punto1x" :
            //og.lineTo( data.moveX,data.moveY);
                //og.fillRect(data.moveX,data.moveY,1,5);
                og.ellipse(data.moveX,data.moveY,10,10);
                og.stroke();
                break;
        }

        });

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

        socket.on('timeTurn',(data)=>{
            console.log(data);
            buttonStart.hide();
            if(data===0){
                socket.emit('end timeTurn');
            }
            contentTimer.empty();
            let html = '<h4>'+data+'</h4>';
            contentTimer.append(html);
        })

        socket.on('choosing word',(data)=>{
            chooseBox.show();
           // chooseWord1[0].innerText = data;
            choosing.append(loginName.val()+" is choosing!!");
           chooseWord1.val(data[0]);
           chooseWord2.val(data[1]);
           chooseWord3.val(data[2]);

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
        })




        chooseWord1.click(function (){
            
            socket.emit('send choose word',chooseWord1.val());
        });

        chooseWord2.click(()=>{
            
            socket.emit('send choose word',chooseWord2.val());
        })

        chooseWord3.click(()=>{
            socket.emit('send choose word',chooseWord3.val());
        })

        buttonStart.click(function(){
            
            socket.emit('start timeTurn',loginName.val());
            socket.emit('choose word');
            
        })


    


window.onload = function (){
    const oc=$('#can');
    const og=oc[0].getContext("2d");
    // si cambias la ubiacion de canva tiene que ajustar
    // siguiente variable
    var ajusteCanva=185;

//Accion de de boton con canva
    oc[0].onmousedown =function (ev) {
    var ev=ev||event;
    var punto_x= ev.clientX-oc[0].width;
    var punto_y= ev.clientY-oc[0].height+ajusteCanva; 
    let position={
        punto_x: ev.clientX-oc[0].width,
        punto_y: ev.clientY-oc[0].height+ajusteCanva
    };              
    var canvasTemp = new Image();
    var array=[];
    var count=0;

    array[count]=oc[0].toDataURL();
    canvasTemp.src=array[count];

    console.log("X:"+punto_x);
    console.log("Y:"+punto_y);
    og.moveTo( punto_x,punto_y);

    document.onmousemove = function (ev) {
        var ev=ev||event;
        var drawCanva={
            position:position,
            moveX:ev.clientX-oc[0].width,
            moveY:ev.clientY-oc[0].height+ajusteCanva,
            dibujo:dibujo,
            color:og.strokeStyle
        };
        console.log(drawCanva.position.punto_x);
        socket.emit('send Canva',drawCanva);
        switch (dibujo) {
        
            case "punto1x":
                drawPunto1x(ev,og,oc);
            break;

            case "rectangle":
                drawRectangle(canvasTemp,position,ev,og);
                break;        
        }

        
    }
            document.onmouseup = function(){
                og.closePath();
                og.beginPath();
                document.onmousedown=document.onmousemove=null;
            //    socket.emit('send URL',oc[0].toDataURL());
            }
    }

    function drawRectangle(canvasTemp,position,ev, og) {
        og.closePath();
        og.beginPath();
        og.clearRect(0,0,oc[0].width,oc[0].height);
        og.drawImage(canvasTemp,0,0);
        og.rect(position.punto_x,position.punto_y,ev.clientX-oc[0].width-position.punto_x,ev.clientY-oc[0].height+ajusteCanva-position.punto_y);
        og.stroke();        
    }

    function drawPunto1x(ev,og,oc){
        og.lineTo( ev.clientX-oc[0].width,ev.clientY-oc[0].height+ajusteCanva);
        og.stroke();
    }

 


}




})

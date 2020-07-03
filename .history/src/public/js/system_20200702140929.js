class System{
    constructor(){
        this.userList=[];
        this.wordsChoose=[];
        this.chooseSelected=[];
        this.round=0;
        this.turn=0;
        this.line_history=[];
        this.words=["hola","mundo","amistad","web","UABC","feng","Omar","Crisanto","Miriam","Victor","Soto"];
    }

    clearData(){
        this.userList=[];
        this.wordsChoose=[];
        this.chooseSelected=[];
        this.round=0;
        this.turn=0;
        this.line_history=[];
    }

    getWordSelected(){
        return this.chooseSelected[this.chooseSelected.length-1];
    }

    addUserList(name,socketID){
        let user={
            name:name,
            id:socketID,
            score:0
        }
        this.userList.push(user);
    }

    getWordsToChoose(){
        let i=0,random;
        this.wordsChoose=[];
        while(i<3){
            random=this.getRandomInt(0,this.words.length-1);
            if(this.chooseSelected.indexOf(this.words[random])<0){
               if(this.wordsChoose.indexOf(this.words[random])<0){
                   this.wordsChoose.push(this.words[random]);
                   i++;
               }
            }
            
        }
        return this.wordsChoose;
    }
    setChooseSelected(word){
        this.chooseSelected.push(word);

    }
    deleteUser(socketID){
        let i=0;
        var temp;
        // obtener el elemento en la userList
        
        while (i<this.userList.length){
            
            if(this.userList[i].id ===socketID){
                temp=this.userList[i];
            }
            i++;
            
        }
        // obtener el indice en userList
        let index=this.userList.indexOf(temp);
        // si index es el primer elemento de userList
        
        if(index==0){    
            this.userList.shift();
        }else 
        if(index>0){
            // sino acomodar el userList 
            while(index!=0){
                this.userList[index]=this.userList[index-1];
                index--;
                
            }
            // insert temp a primer elemento de userList
            // liberarlo
            this.userList[0]=temp;
            this.userList.shift();
        } else{
            console.log("No se encuentro el dato en userList");
        }
      //  console.log("temp:"+temp);
    }

    addScore(name,ID){
        this.userList,map((element)=>{
            if(element.socketID==ID && element.name==name){
                element.score+=90;
                console.log(name+"sube 90 puntos");
            }
        })
    }


    getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;    
    }   
}



module.exports = System;
//Test

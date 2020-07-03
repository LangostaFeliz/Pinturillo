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

    addUserList(name,socketID){
        let user={
            name:name,
            id: socketID
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
    setChooseWord(word){
        this.chooseSelected.push(word);

    }
    deleteUser(socketID){
        let i=0;
        var temp;
        // obtener el elemento en la userList
        
        while (i<this.userList.length-1){
            
            if(this.userList[i].id ===socketID){
                temp=this.userList[i];
                console.log("temp:"+temp);
                
            }
            i++;
            
        }
        // obtener el indice en userList
        let index=this.userList.indexOf(temp);
        // si index es el primer elemento de userList
        
        if(index==0){    
            this.userList.shift();
        }else {
            // sino acomodar el userList 
            while(index!=0){
                this.userList[index]=this.userList[index-1];
                index--;
            }
            // insert temp a primer elemento de userList
            // liberarlo
            this.userList[0]=temp;
            this.userList.shift();
        }
      //  console.log("temp:"+temp);
    }

    getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;    
    }   
}

var sistema=new System();
// sistema.setChooseWord("feng");
// sistema.setChooseWord(sistema.words[sistema.getRandomInt(0,sistema.words.length-1)]);

sistema.addUserList("Feng","1253779");
sistema.addUserList("Hao","1253771");
sistema.addUserList("Sheng","1253772");
sistema.addUserList("EN","1253776");

console.log(sistema.userList);

sistema.deleteUser("1253771");
console.log(sistema.userList);

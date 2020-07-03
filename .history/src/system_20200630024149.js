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
        while (i<this.userList.length){
            if(this.userList[i].id == socketID){
                temp=this.userList[i];
            }
        }
        // 
        let index=this.userList.indexOf(temp);
        if(idnex==0){    
            this.userList.shift();
        }else {
            for(i=1;i<index;i++){
                this.userList[i]=this.userList[i-1];
            }
            this.userList[0]=temp;
            this.userList[0].shift();
        }
    }

    getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;    
    }   
}

var sistema=new System();
sistema.setChooseWord("feng");
sistema.setChooseWord(sistema.words[sistema.getRandomInt(0,sistema.words.length-1)]);

console.log(sistema.chooseSelected);
console.log(sistema.getWordsToChoose());
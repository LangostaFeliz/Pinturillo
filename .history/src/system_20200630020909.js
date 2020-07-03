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
        

        if(flag==0){
            this.userList.shift();
        }else {
            
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
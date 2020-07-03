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
            if(this.chooseSelected.indexOf(this.words[random])){
               if(this.wordsChoose.indexOf(this.words[random])){
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

    getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;    
    }   
}

var sistema=new System();
sistema.setChooseWord(sistema.words[sistema.getRandomInt(0,sistema.words.length-1)]);

console.log(sistema.chooseSelected);
console.log(sistema.getWordsToChoose());
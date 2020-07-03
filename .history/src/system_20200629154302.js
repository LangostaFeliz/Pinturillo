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
        while(i<3){
            random=this.getRandomInt(0,words.length-1);
            if(chooseSelected.indexOf(words[random])){
                
            }
            i++;
        }
    
        return this.wordsChoose;
    }


    getRandomInt (min,max){
    return Math.floor(Math.random()*(max-min))+min;    
    }   
}

var sistema=new System();

console.log(sistema.turn);
class System{
    constructor(){
        var userList=[];
        var wordsChoose=[];
        var chooseSelected=[];
        var round;
        var turn;
        var line_history=[];
        var worlds=["hola","mundo","amistad","web","UABC","feng","Omar","Crisanto","Miriam","Victor","Soto"];
    }

    addUserList(name,socketID){
        let user={
            name:name,
            id: socketID
        }
        this.userList.push(user);
    }

    getWordsToChoose(){
        
    }
    

    
}
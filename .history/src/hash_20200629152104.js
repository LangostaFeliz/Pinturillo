class Hash{
    constructor(){
        this.table = new Array(1024);
    }
    hash(data) {
    //就将字符串中的每个字符的ASCLL码值相加起来，再对数组的长度取余
        var total = 0;
        for(var i = 0; i < data.length; i++) {
            total += data.charCodeAt(i);
        }
        console.log("Hash Value: " +data+ " -> " +total);
        return total % this.table.length;
    }
    insert(key, val){
        var pos = this.hash(key);
        this.table[pos] = val;
    }
    get(key){
        var pos = this.hash(key);
        return this.table[pos] 
    }
    show(){
        for(var i = 0; i < this.table.length; i++) {
            if(this.table[i] != undefined) {
                console.log(i + ":" +this.table[i]);
            }
        }
    }
    }
    var someNames = ["David","Jennifer","Donnie","Raymond","Cynthia","Mike","Clayton","Danny","Jonathan"];
    var hash = new Hash();
    for(var i = 0; i < someNames.length; ++i) {
    hash.insert(someNames[i],someNames[i]);
    }
    
    hash.show(); 




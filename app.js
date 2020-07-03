function hola(num1,num2,callback){
    var final=num1+num2;
    callback(final);
}


hola(10,5,function (num) {
    console.log(num);
    })
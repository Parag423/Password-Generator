let passwordlength=10;
const lengthdisplay= document.querySelector('.number');
const inputslide = document.querySelector('.slider');
let password;
//To set inistial value
function  handelslider(){
    inputslide.value=passwordlength;
    lengthdisplay.textContent= passwordlength;
    //to color left side of thum
    let min =  inputslide.min;
    let max = inputslide.max;
    inputslide.style.backgroundSize = ( (passwordlength - min)*100/(max - min)) + "% 100%"
}
handelslider();

//To set indicator
const indicator= document.querySelector('.indicator');

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

//function to get random value in a given range.
function getRndom(min , max){
       return Math.floor(Math.random()*(max-min))+min;
}


//To get random number
 function generatRandom(){
    return getRndom(0,9);
}

//To get Upercase letter
function generatUpperCase(){
    let a=String.fromCharCode(getRndom(65,91));
        return a;
}

//To get Lowercase letter
function generatLowerCase(){
    let a=String.fromCharCode(getRndom(97,122));
    return a;
}

//Too get random  symbol
const symbol ='~`!@#$%^&*()_+{}[]|\?/>.<,'
function generatSymbol(){
    let random =getRndom(0,symbol.length);
    return symbol[random];
}

//To calculate strenght  of the password
const upperCaseCheck= document.querySelector('.uppercase');
const lowerCaseCheck= document.querySelector('.lowercase');
const numCheck= document.querySelector('.num');
const includeSymbolCheck= document.querySelector('.includeSymbol');

function calstrenght(){
    let hassLower=false;
    let hassUpper=false;
    let hassNum=false;
    let hassSymbol=false;
    if(upperCaseCheck.checked)hassUpper=true;
    if(lowerCaseCheck.checked)hassLower=true;
    if(numCheck.checked)hassNum=true;
    if(includeSymbolCheck.checked)hassSymbol=true;

    if(hassUpper &&  hassLower && ( hassSymbol ||  hassNum) && passwordlength>=8){
        setIndicator("#0f0")
    }
    else if((hassUpper ||  hassLower) && ( hassSymbol ||  hassNum) && passwordlength>=6){
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

//tO COPY 
const passwordDisplay=document.querySelector('.password');
const copymsg=document.querySelector('.copy-msg');


async function copyContent(){

        await navigator.clipboard.writeText(passwordDisplay.value);
        
copymsg.textContent='Copied';


    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    }, 2000);

}

// Eventlistner  for slider

const inputSlider=document.querySelector('.slider');

inputSlider.addEventListener('input',()=>{
    passwordlength=inputSlider.value;
    handelslider();
})

//Eventlistner for copy

const copybtn=document.querySelector('.copy');

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

// TO CHECKBOX COUNT  

const allCheckbox = document.querySelectorAll('.checkbox');
let checkcount=1;
function handelcheckboxChange(){
     checkcount=0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked) checkcount++;
    });
    // condition so that minimum number passsword generate
    if(passwordlength < checkcount){
        passwordlength = checkcount;
        handelslider();
    }
}

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handelcheckboxChange);
})
//To display not  select checkbox
let message=  document.querySelector('.message');
let message2=  document.querySelector('.back');

async function plzchecked(){
   await message.classList.add('message-active');
     setTimeout(()=>{
        message.classList.remove('message-active');
     },2000);
     await message2.classList.add('back-active');
     setTimeout(()=>{
        message2.classList.remove('back-active');
     },2000);
}
//To generate password

let generatePassword = document.querySelector('.generate');


//function to  sufful

function sufful(password){
for(let i=password.length-1;i>=0;i--){
    let j=getRndom(0,i);
    let temp=password[i];
    password[i]=password[j];
    password[j]=temp;
}
let str='';
password.forEach((el)=>{
    str=str+el;
})
return str;
}

generatePassword.addEventListener('click',()=>{
  
if(checkcount<=0){
    plzchecked();
    passwordDisplay.placeholder="Password";
    setIndicator("rgb(83, 69, 69)")
    passwordDisplay.value=" ";
    return;
}


password="";
   let fun=[];

        
        if(lowerCaseCheck.checked) {
            password=password+generatLowerCase();
          fun.push(generatLowerCase);}
       
          if(upperCaseCheck.checked) {
            password=password+generatUpperCase();
        fun.push(generatUpperCase);}
        
        if(includeSymbolCheck.checked){
            password=password+generatSymbol();
         
        fun.push(generatSymbol);}
       
        if(numCheck.checked){
            password=password+generatRandom();
        fun.push(generatRandom);}
  
    

    let randomIndex=  getRndom(0,checkcount);
        let k=password.length;
    for(let i=0;i<(passwordlength-k);i++){
        password=password + fun[randomIndex]();
      
    }
    
//To sufful password
console.log(password);
console.log(password[0]);
password=sufful(Array.from(password));
console.log(password);

 //To display  passsword in ui
 passwordDisplay.value=password;
 //if after check  all checkbox slider value set in less than  checbox ccount 
 if(passwordlength<checkcount){
    passwordlength = password.length;
    handelslider();
 }


 //To set strenght
 calstrenght();


    
})

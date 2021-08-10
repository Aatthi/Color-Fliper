window.addEventListener('DOMContentLoaded',init);

    const opts = ["*", "/", "+", "-", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."]
    const spec = ["*", "/", "+", "-"]; 

   

function init(){
    document.title = "Javascript Calculator"
    let dec = false;
    let eva = false;
     const container = document.createElement('div');
     container.classList.add('container');
     container.style.maxWidth = "600px";
     container.style.margin = "auto";
     document.body.appendChild(container);



     const output = document.createElement("input");
     output.setAttribute('type', 'text');
     output.classList.add('container');
     output.style.width = "100%";
     output.style.lineHeight = "50px";
     output.style.fontSize = "3em";
     output.style.textAlign = "right"
     output.style.fontFamily =  " monospace";
  
     container.appendChild(output)


     const main = document.createElement('div');
     main.classList.add('main');
     main.style.width = "100%";
     main.style.border = " 1px solid grey";


     container.appendChild(main)

     opts.forEach(function(val){
         buttonMaker(val, addOutput)
     })

     buttonMaker('=', evalOutput);
     buttonMaker('C', clrOutput);

     function cOuput(v){
        output.style.border = v + '1px solid';
        output.style.color = v;
     }

     function evalOutput() {
        console.log('=');2
        cOuput("black")

        if(output.value === ''){
            cOuput("red")
        } else if (eva){
            cOuput("red")
        } else {
            output.value = eval(output.value);
        }
        dec = output.value.includes('.');
     }
     function clrOutput(){
        cOuput("black")
        console.log('Clr');
        output.value = '';
     }

     function buttonMaker(txt, myFunction){
         let btn = document.createElement('button');
         btn.setAttribute('type', 'button');
         btn.style.width = '25%';
         btn.style.lineHeight = '50px';
         btn.style.margin = '1%';
         btn.style.borderRadius = '10px';


         btn.val = txt;
         btn.textContent = txt;
         btn.addEventListener('click', myFunction);
         main.appendChild(btn)
         

     }
     function addOutput(e) {
        console.log(e.target.val)
        let char = e.target.val
        if (char == '.'){
            if(dec){
                char = '';
                cOuput("red");
            } else{
                dec = true;
            }
        }
        eva = spec.includes(char);
        if(eva) {
            dec = false;
        }
        output.value += char

    }
}
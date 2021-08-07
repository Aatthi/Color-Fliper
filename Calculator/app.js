window.addEventListener('DOMContentLoaded',init);

    const opts = ["*", "/", "+", "-", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."]
    const spec = ["*", "/", "+", "-"]; 

    function addOutput(e) {

    }

function init(){
    document.title = "Javascript Calculator"
    console.log('ready');

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
     output.style.fontFamily =  " sans-serif"
     container.appendChild(output)

     const main = document.createElement('div');
     main.classList.add('main');
     main.style.width = "100%";
     main.style.border = "1px solid red";

     container.appendChild(main)

     opts.forEach(function(val){
         console.log(val)
         buttonMaker(val, addOutput)
     })

     function buttonMaker(txt, myFunction){
         let btn = document.createElement('button');
         btn.setAttribute('type', 'button')
         btn.style.width = '25%';
         btn.style.lineHeight = '50px';
         btn.style.margin = '1%';
         btn.style.background = 'rgba(32, 114, 221, 0.815)';
         btn.style.border = "none"
         btn.style.borderRadius = '10px'


         btn.val = txt;
         btn.textContent = txt;
         btn.addEventListener('click', myFunction);
         main.appendChild(btn)
         

     }
}
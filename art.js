const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberofParticle = 100;

// get mouse

const mouse = {
    x : null,
    y : null 
}
// get mouse position

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x,mouse.y);
    }
);

window.addEventListener('touchmove',f);
function f(event) {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
   // console.log(mouse.x,mouse.y);
}
// working great
//set interval for mouse interation.bcs i dont need to follow the entire.

setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 10 );

// create template  for every particle

class Particle {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    //with given constuctor template we create a path
    draw(){
        ctx1.beginPath();
        // we draw a bubble type objest folows mouse so its a cicrelmeans an arc 
        ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // the template enumarate the arc(x,y,startangle,endangle,counterclockwise)
        // math.pi *2 derines a complte circle then false for not-counterclwise
        ctx1.fill();
        // ctx1.closePath();
    }
    //need to create unque and not same type obj
    update() {
        this.size -= 0.5;
        //this def e3very time new object creates its shrinks to 0.05times
        //create if ststement for update
        if (this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10 ));
            this.y = (mouse.y + ((Math.random() * 20) - 10 ));
            this.size = (Math.random() * 10 ) + 20 ;
            this.weight = (Math.random() *2) - 0.5 ;
        }

        // create bounce effect
        this.y += this.weight;
        this.weight += 0.6;

        if (this.y > canvas.height - this.size){
            this.weight *= -1;
        };
    }
}
 // template finished and jumps to start draw 
function init(){
    for (let i = 0; i < numberofParticle; i++ ){
        let size = (Math.random() *5) +2;
        let x = Math.random() *  (innerWidth - size * 2) + size;
        let y = Math.random() *  (innerHeight - size * 2) + size;
        let color = 'black';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i < particleArray.length; i ++){
        particleArray[i].update();
        particleArray[i].draw();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();
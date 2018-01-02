console.log("vampire window game");

const canvas = document.getElementById('vampcanvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

const vamp = {
    body: {},
    direction: "",
    initVamp: function (){
        this.body = {x: 20, y: 400, r: 12.5, e: 0}
    },
    drawBody: function(){
    	ctx.beginPath();
    	ctx.arc(vamp.body.x, vamp.body.y, vamp.body.r, vamp.body.e, Math.PI*2);
    	ctx.strokeStyle = "white";
    	ctx.fill();
    	ctx.closePath();
    },
    // drawWindow: function(){
    //     ctx.fillStyle = "yellow";
    //     ctx.fillRect(x,y,75,100)
    //     // ctx.roundedRect(ctx, 12, 12, 150, 150, 15);
    // },
    // make multiple windows
    //set space between windows
    //set range of windows to be generated with boundries
    //math random with range for amount of windows
    //keyframes scroll and animation not linear but left
    randWindow: function(){
        //random window between 1-10
        let howMany = Math.floor(Math.random() * 10) + 1;
        // random x or y position between 10-700
        let randX = Math.floor(Math.random() * 600) + 10;
        let randY = Math.floor(Math.random() * 600) + 10;
        for(let i=0; i < howMany; i++){
            ctx.fillRect(randX,randY,75,100);
            ctx.fillStyle = "yellow";
        }
    },
     move: function(){
    	if(vamp.direction === 'right'){
    		if(vamp.body.x + 10 < 400){
    		    // move hero right along x axis
    		vamp.body = {x: vamp.body.x + 10, y: vamp.body.y, r: 12.5, e:0}
    		}
    		
    	}else if(vamp.direction === "left"){
    		// move left from x axis
    		vamp.body = {x: vamp.body.x - 10, y: vamp.body.y, r: 12.5, e:0}

    	}else if(vamp.direction === "up"){
    		vamp.body = {x: vamp.body.x, y: vamp.body.y - 10, r: 12.5, e:0}

    	}else if(vamp.direction === "down"){
    		vamp.body = {x: vamp.body.x, y: vamp.body.y + 10, r: 12.5, e:0}
    	}
    }
};

document.addEventListener('keydown', function(event){
	let key = event.which;
	
	if(key === 39){
		vamp.direction = "right";
		vamp.move();
		vamp.drawBody();

	}else if (key === 37){
		vamp.direction = "left";
		vamp.move();
		vamp.drawBody();

	}else if (key === 38){
		vamp.direction = "up";
		vamp.move();
		vamp.drawBody();

	}else if (key === 40){
		vamp.direction = "down";
		vamp.move();
		vamp.drawBody();
	}
	// console.log(key);
});


//have actions in this function to clear frame by frame as moving
const animateCanvas = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	vamp.drawBody();
	// vamp.randWindow();
	window.requestAnimationFrame(animateCanvas)
};

animateCanvas();


vamp.move();
vamp.initVamp();
vamp.drawBody();
vamp.randWindow();
















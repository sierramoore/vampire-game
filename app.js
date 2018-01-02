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
    	ctx.strokeStyle = "green";
    	ctx.fill();
    	ctx.closePath();
    },
    drawWindow: function(){
        ctx.fillStyle = "yellow";
        ctx.fillRect(100,300,75,100)
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
	console.log(key);
});


//have actions in this function to clear frame by frame as moving
const animateCanvas = function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	vamp.drawBody();
	vamp.drawWindow();
	window.requestAnimationFrame(animateCanvas)
};

animateCanvas();

vamp.move();
vamp.initVamp();
vamp.drawBody();
vamp.drawWindow();
















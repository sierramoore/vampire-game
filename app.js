console.log("vampire window game");

const canvas = document.getElementById('vampcanvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

const vamp = {
    body: {},
    direction: "",
    initVamp: function (){
        this.body = {x: 40, y: 400, r: 12.5, e: 0}
    },
    drawBody: function(){
    	ctx.beginPath();
    	ctx.arc(vamp.body.x, vamp.body.y, vamp.body.r, vamp.body.e, Math.PI*2);
    	ctx.strokeStyle = "white";
    	ctx.fill();
    	ctx.closePath();
    },
    //set space between windows
    //set range of windows to be generated with boundries
    //if within canvas boundry -> if statements
     move: function(){
    	if(vamp.direction === 'right'){
    		if(vamp.body.x + 20 < 800){
    		    // move hero right along x axis
    		vamp.body = {x: vamp.body.x + 10, y: vamp.body.y, r: 12.5, e:0}
    		}
    		
    	}else if(vamp.direction === "left"){
            if(vamp.body.x >= 20)
            // move left from x axis
    		vamp.body = {x: vamp.body.x - 10, y: vamp.body.y, r: 12.5, e:0}

    	}else if(vamp.direction === "up"){
    	    //set to 200px so cant move above dark area
    	    if(vamp.body.y >=200)
    		vamp.body = {x: vamp.body.x, y: vamp.body.y - 10, r: 12.5, e:0}

    	}else if(vamp.direction === "down"){
    	    //set to only move within dark grey area
    	    if(vamp.body.y <= 600)
    		vamp.body = {x: vamp.body.x, y: vamp.body.y + 10, r: 12.5, e:0}
    	}
    }
};

document.addEventListener('keydown', function(event){
    // console.log("sldkfj")
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

// let windows = {
//     randWindow: function(){
//         let howMany = Math.floor(Math.random() * 10) + 1;
//         let randY = Math.floor(Math.random() * 600) + 10;
//         for(let i=0; i < howMany; i++){
//             ctx.fillRect(700,randY,75,100);
//             ctx.fillStyle = "yellow";
//         }
//     }
// };

const game = {
    windows: [],
    // function to set random values and output/return/store window obbject in array of windows
    generateWindow: function () {
        //set properties
        let x = 700;
        //if y between red borders
        let y = Math.floor(Math.random() * 400) + 100;
        let width = Math.floor(Math.random() * 100) + 70;
        let height = Math.floor(Math.random() * 150) + 100;
        // let color = ctx.fillStyle = "yellow";

        let window = {
            x: x,
            y: y,
            width: width,
            height: height
        };
        // store window in windows array
        this.windows.push(window);
        // console.log(this.windows)
    },
    // show window on screen
    showWindow: function () {
        //get window object and print the window using properties of window object just grabbed in for loop
        //loop through windows array and print them all
        for (let i = 0; i < this.windows.length; i++) {
            let w = this.windows[i];
            ctx.fillStyle = "yellow";
            ctx.fillRect(w.x, w.y, w.width, w.height);
        }
    },
    //  //decrease x for all the windows ("move the windows to the left")
    moveWindow: function(){

        //update all the values of x in windows arr
        for(let i=0; i < this.windows.length; i++){
            let xValue = this.windows[i].x;
            //update value of x in window arr
            this.windows[i].x = xValue -2;
        }
    },
    addWindows: function() {
        // console.log(this.windows.slice(-1)[0])
        let lastWindow = this.windows[this.windows.length - 1];
        // if previous window is at x = 400
        //get last elem of arr
        if (lastWindow.x  === 400) {

            this.generateWindow()
        }

        // console.log(this.windows[0].x)
        if(lastWindow === -170){
            this.windows.pop(lastWindow);
        }





        // //if the window has left the screen remove it from array
        // if (xValue === -170) {
        //     this.windows.shift(xValue);
        // }
    },

    checkForCollision: function() {
        //if ?? player hits any elment in windows arr

            alert("dead");
    }
};

game.generateWindow();


//have actions in this function to clear frame by frame as moving
const animateCanvas = function(){
    //erase canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    // this causes the hero to show on the screen
    vamp.drawBody();

	// this will make the window(s) show on the screen
    game.showWindow();

    //call a function to slowly decrease x as page refreshes
	game.moveWindow();

	game.addWindows();

	// game.checkForCollision();

    // updates the whole screen
    window.requestAnimationFrame(animateCanvas)
};

vamp.initVamp();

animateCanvas();


// vamp.move();
// vamp.drawBody();


//set event listeners to catch user interaction and set animation function




















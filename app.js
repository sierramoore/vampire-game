console.log("vampire window game");

const canvas = document.getElementById('vampcanvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

let isOverlapped = function(x1,y1,w1,h1,x2,y2,w2,h2){
    //horizontal check first two && && vertical check last two
    //checks for true or false and returns that value
    return  x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1;
};

const vamp = {
    x: 40,
    y:400,
    w: 40,
    h: 40,

    body: {},
    direction: "",
    initVamp: function (){
        this.body = {x: 40, y: 400, r: 12.5, e: 0}
    },
    vampImage: function (){
        let img = new Image();
        img.src = "images/vampy.png";
        // img.src = "https://st.depositphotos.com/3248189/4472/v/950/depositphotos_44727327-stock-illustration-cartoon-vampire-bat.jpg";
        ctx.drawImage(img, this.x, this.y, this.w, this.h)

    },
    // drawBody: function(){
    // 	ctx.beginPath();
    //     ctx.fillStyle = "white";
    // 	ctx.arc(vamp.body.x, vamp.body.y, vamp.body.r, vamp.body.e, Math.PI*2);
    // 	ctx.fill();
    // 	ctx.closePath();
    // },
    //set space between windows
    //set range of windows to be generated with boundries
    //if within canvas boundry -> if statements
     move: function(){
    	if(this.direction === 'right'){
    		if(this.x + 20 < 800){
    		    // move right along x axis
                this.x += 10;
    		}
    	}
    	else if(this.direction === "left"){
            if(this.x >= 20)
            // move left from x axis
    		this.x -= 10;

    	}else if(this.direction === "up"){
    	    //set to 200px so cant move above dark area
    	    if(this.y >=200)
    	        this.y -= 10;

    	}else if(this.direction === "down"){
    	    //set to only move within dark grey area
    	    if(this.y <= 600) {
                this.y += 10;
            }
    	}
    }
};

document.addEventListener('keydown', function(event){
    // console.log("sldkfj")
	let key = event.which;
	
	if(key === 39){
		vamp.direction = "right";

	}else if (key === 37){
		vamp.direction = "left";

	}else if (key === 38){
		vamp.direction = "up";

	}else if (key === 40){
		vamp.direction = "down";
	}
	// console.log(key);
});
document.addEventListener('keyup', function(event){
    let key = event.which;

    if(key === 39){
        vamp.direction = "";

    }else if (key === 37){
        vamp.direction = "";

    }else if (key === 38){
        vamp.direction = "";

    }else if (key === 40){
        vamp.direction = "";
    }
    // console.log(key);
});

const game = {
    windows: [],
    // function to set random values and output/return/store window object in array of windows
    generateWindow: function () {
        //makes vampire appear before windows
        ctx.globalCompositeOperation='destination-over';
        let x = 700;
        //if y between red borders
        let y = Math.floor(Math.random() * 400) + 80;
        let width = Math.floor(Math.random() * 100) + 70;
        let height = Math.floor(Math.random() * 250) + 120;

        let window = {
            x: x,
            y: y,
            width: width,
            height: height
        };
        // store window in windows array
        this.windows.push(window);

        // add 1 point to score for each generated window
        this.score = this.score + 1;
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
            this.windows[i].x = xValue -4;
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
    },

    // return true if the specified rectangle collides with at least one window
    // otherwise return false
    checkForCollision: function (x, y, w, h) {
        //return true if collision found
        for (let i = 0; i < this.windows.length; i++) {
            let c = this.windows[i];
            //check if vamp(params of this function) and first window collided
            if(isOverlapped(x, y, w, h, c.x, c.y, c.width, c.height)){

                this.health = this.health - 1;
                ctx.fillRect(600, 735, this.health, 20);

                if(this.health === 0){
                    //make vamp catch fire if time
                    //or stop with game over image
                    ctx.strokeRect(600, 735, 101, 21);
                    console.log("dead");
                }
                return true;
            }
        }
        return false;
    },

    score: -1,
    drawScore: function () {
        ctx.font = "24px 'Berkshire Swash'";
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + this.score, 50, 750);
    },

    health: 50,
    drawHealthBar: function (){
        ctx.fillStyle = "red";
        //BORDER color
        ctx.strokeStyle= "black";

        //BORDER
        ctx.strokeRect(600, 735, 101, 21);
        //can multiply health to make bar longer w/o changing literal health amount
        ctx.fillRect(600, 735, this.health * 2, 20);

    },
};

game.generateWindow();


//have actions in this function to clear frame by frame as moving
const animateCanvas = function(){
    //call a function to slowly decrease x as page refreshes
    game.moveWindow();

	game.addWindows();

	vamp.move();

	//check for collision as a calculated as a square
	// game.checkForCollision(vamp.body.x - vamp.body.r, vamp.body.y - vamp.body.r, vamp.body.r * 2, vamp.body.r * 2);
    game.checkForCollision(vamp.x, vamp.y, vamp.w, vamp.h);
    //erase canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // this causes the vamp to show on the screen
    // vamp.drawBody();
    vamp.vampImage();

    game.drawScore();

    game.drawHealthBar();

    if(game.health === 0){
        ctx.font = "80px 'Berkshire Swash'";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over",200,400);
        return game.drawHealthBar();
    }

	// this will make the window(s) show on the screen
    game.showWindow();

	// game.checkForCollision();

    // updates the whole screen
    window.requestAnimationFrame(animateCanvas)
};

vamp.initVamp();

animateCanvas();





















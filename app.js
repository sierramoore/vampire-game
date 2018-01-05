console.log("vampire window game");

const canvas = document.getElementById('vampcanvas');
const ctx = canvas.getContext('2d');
//const var bkus vamp needs it too
const screenBorder = 120;
// console.log(ctx);

let isOverlapped = function(x1,y1,w1,h1,x2,y2,w2,h2){
    //horizontal check first two && && vertical check last two
    //checks for true or false and returns that value
    return  x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1;
};

const vamp = {
    x: 40,
    y:400,
    w: 45,
    h: 50,

    body: {},
    direction: "",
    initVamp: function (){
        this.body = {x: 40, y: 400, r: 12.5, e: 0}
    },
    vampImage: function (){
        let img = new Image();
        img.src = "images/vampy.png";
        ctx.drawImage(img, this.x, this.y, this.w, this.h)

    },
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
    	    if(this.y >= screenBorder + 20)
    	        this.y -= 10;

    	}else if(this.direction === "down"){
    	    //set to only move within dark grey area
    	    if(this.y <= canvas.height - screenBorder - 80) {
                this.y += 10;
            }
    	}
    }
};
vamp.initVamp();

document.addEventListener('keydown', function(event){
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
});
document.addEventListener('keyup', function(event){
    let key = event.which;

    if(key === 39){
        vamp.direction = "";

    }else if (key === 37){
        vamp.direction = "";

    }else if (key === 38){
        vamp.direction = "";

    }else if (key === 40) {
        vamp.direction = "";
    }
});

class Game {
    //constructor is called automatically when game is created
    constructor(){
        this.windows = [];
        this.score = -1;
        this.health = 50;
        this.speed = 4;
        this.imgWindow = new Image();
        this.imgWindow.src = "images/window1.png";
        //is x property of canvas tiling
        this.backgroundPosX = 0;
        this.imgBackground = new Image();
        this.imgBackground.src = "images/wall.jpg";
        this.imgEnd = new Image();
        this.imgEnd.src = "images/background3.png";
        this.generateWindow();
        this.animateLoop();
    }

    // function to set random values and output/return/store window object in array of windows
    generateWindow() {
        //makes vampire appear over windows
        let width = Math.floor(Math.random() * 100) + 70;
        let height = Math.floor(Math.random() * (380 - 200)) + 200;
        let x = canvas.width;
        //if y between borders and -window height to ensure window doesnt start and bottom border and overlap into border
        let y = Math.floor(Math.random() * (canvas.height - 2*screenBorder - height)) + screenBorder;


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
    };
    // show window on screen
    drawBackground(){
        //x,y,width,height params
        ctx.clearRect(0, 0, canvas.width, screenBorder);
        ctx.clearRect(0, canvas.height - screenBorder, canvas.width, screenBorder);
        //height and width same as canvas
        let tileHeight = canvas.height - 2*screenBorder;
        let tileWidth = canvas.width;
        for (let x = this.backgroundPosX; x < canvas.width; x += tileWidth) {
            ctx.drawImage(this.imgBackground, x, screenBorder, tileWidth, tileHeight);
        }
    }
    drawWindows() {
        //get window object and print the window using properties of window object just grabbed in for loop
        //loop through windows array and print them all
        for (let i = 0; i < this.windows.length; i++) {
            let w = this.windows[i];
            ctx.drawImage(this.imgWindow, w.x, w.y, w.width, w.height)
        }
    };
    //  //decrease x for all the windows ("move the windows to the left")
    moveWindow(){

        //update all the values of x in windows arr
        for(let i=0; i < this.windows.length; i++){
            //update value of x in window arr
            this.windows[i].x -= this.speed;
        }

        this.backgroundPosX -= this.speed;
        //modulo resets position back to near start when it is out of frame
        this.backgroundPosX %= canvas.width;
        // console.log(this.backgroundPosX);
    };
    addWindows() {
        let lastWindow = this.windows[this.windows.length - 1];
        // if previous window is at x = 400
        //get last elem of arr
        //start generating more windows when
        if (lastWindow.x  === 300) {

            this.generateWindow()
        }

        // console.log(this.windows[0].x)
        if(lastWindow === -170){
            this.windows.pop(lastWindow);
        }
    };

    // return true if the specified rectangle collides with at least one window
    // otherwise return false
    checkForCollision(x, y, w, h) {
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
    };
    drawScore() {
        ctx.font = "24px 'Berkshire Swash'";
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + this.score, 50, 750);
    };
    drawHealthBar(){
        ctx.fillStyle = "red";
        //BORDER color
        ctx.strokeStyle= "red";

        //BORDER
        ctx.strokeRect(canvas.width - 200, canvas.height - 65, 101, 21);
        //can multiply health to make bar longer w/o changing literal health amount
        ctx.fillRect(canvas.width - 200, canvas.height - 65, this.health * 2, 20);

    };
    drawGameOver(){

        ctx.drawImage(this.imgEnd, 0, 0, 800, 800);

        ctx.font = "80px 'Berkshire Swash'";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over",200,400);
    };
    animateLoop(){
        if(this.health > 0){
            this.moveWindow();
            this.addWindows();
            vamp.move();
            this.checkForCollision(vamp.x, vamp.y, vamp.w, vamp.h);
            this.drawBackground();
            this.drawWindows();
        }else{
            this.drawGameOver();
        }
        vamp.vampImage();

        this.drawScore();
        this.drawHealthBar();

        // updates the whole screen
        window.requestAnimationFrame(()=>{ this.animateLoop() })
    }
}
//creates an obj of the class Game
const game = new Game();
























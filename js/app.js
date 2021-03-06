// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*110) + 120;   
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    if (this.x > 505) {
        this.x = 0;
        this.y = Math.floor(Math.random() * (240 - 70 + 1)) + 70;
    }

    if (this.x >= player.x - 30 && this.x <= player.x + 30 && this.y >= player.y - 40 && this.y <= player.y + 40) {
        player.reset();
        } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}


Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.update = function(dt) {

};

Player.prototype.reset = function(dt) {
    this.x = 200;
    this.y = 400;
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left': if (this.x > 0) {
                       this.x -= 101; 
                    }
                    break;

        case 'right': if (this.x < 401){
                        this.x += 101;
                        } 
                        break;

        case 'up': if (this.y > 0) {
                    this.y -= 83;
                    } 
                    break;

        case 'down': if (this.y < 400){
                    this.y += 83;
                    } 
                    break;                                        
    }
};

var Rock = function(x, y){
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
}

Rock.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Rock.prototype.update = function() {
    if (this.y >= player.y  && this.x >= player.x ) {
            player.y += 83; 
    }       
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for(var i=0; i<5; i++){
    allEnemies.push(new Enemy(0, Math.floor(Math.random() * (240 - 70 + 1)) + 70));
}

var player = new Player(200, 400);

var rocks = [];
var rockXValue = 0;
for(var i=0; i<4; i++){
    rocks.push(new Rock(rockXValue, -15));
    rockXValue = rockXValue + 101;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


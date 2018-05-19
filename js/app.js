// Enemies our player must avoid
const Enemy = function(x,y,z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = z;
    this.width = 75;
    this.height = 30;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505){
      this.x = -100;
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x,y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
};
Player.prototype.update = function(dt) {
  // this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handles player's movements and keeps them from going off the screen

Player.prototype.handleInput = function(k) {
  switch(k) {
    case "left":
    if (this.x > 0) {
      this.x -= 101
      }
    break;
    case "right":
      if(this.x < 400){
        this.x += 101
      }
    break;
    case "up":
    if (this.y > 0) {
      this.y -= 83
      }
    break;
    case "down":
    if (this.y < 400) {
      this.y += 83
      }
    break;
  }
}


Player.prototype.reset = function(){
  this.x = 202;
  this.y = 400;
  // this.update();
}

// Now instantiate your objects.
let tickA = new  Enemy(10,58,20);
let tickB = new  Enemy(10,140,40);
let tickC = new  Enemy(10,223,20);
let tickD = new  Enemy(200,140,20);
// Place all enemy objects in an array called allEnemies
const allEnemies = [tickA, tickB, tickC, tickD];

// Place the player object in a variable called player
let player = new Player(202, 400);

//checks for collisions v1

  // Enemy.prototype.checkCollisions = function(){
  //   for(i = 0; i < allEnemies.length; i++){
  //     if (allEnemies[i].x < player.x + player.width &&
  //   allEnemies[i].x + allEnemies[i].width > player.x &&
  //    allEnemies[i].y < player.y + player.height &&
  //    allEnemies[i].height + allEnemies[i].y > player.y){
  //      player.reset();
  //    }};
  //  }

//checks for object collisions, function adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollisions = function() {
for (let x of allEnemies) {
  if (this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
     this.height + this.y > player.y){
       player.reset();
     }};
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

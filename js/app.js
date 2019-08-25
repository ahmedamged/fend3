// Enemies our player must avoid
/**
 * Creates a new Enemy.
 * @class Enemy
 */
class Enemy {
  /**
   * @param {number} x - x Position for a new Enemy
   * @param {number} y - y Position for a new Enemy
   */
    constructor(x,y){
      /** @this Enemy */
      this.sprite = 'images/enemy-bug.png';
  	  this.x = x;
  	  this.y = y;
      this.height = 60;
      this.width = 60;
  	  this.speed = this.calculateSpeed();
    }

    /**
     * @param {number} dt - a time delta between ticks
     */
    update(dt){
      /** @this Enemy */
      if(this.x < 808){
        this.x += this.speed * dt;
      }
      else {
    		this.x = -100;
      }
    }

    // Draw the enemy on the screen, required method for game
    render(){
      /** @this Enemy */
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    calculateSpeed(){
      const maxSpeed = 600;
      const minSpeed = 200;
      // genertaing a random speed
      return Math.floor(Math.random() * (maxSpeed-minSpeed + 1) + minSpeed);
    }
}

// modal to select the points modal
// points to select points span in the points modal
// replay to select replay button in the points modal
// mClose to select the close button in the modal
// gemPoints to select gem points span in the points modal
// chooseModal to select the choosing player modal
// play to select play button in the choosing player modal
// pClose to select the close button in the choosing player modal
// chooseP to select the body of the choosing player modal
// playerSprite is the url of the player image
let modal = document.querySelector('.modal');
let points = document.querySelector('.modal-points');
let replay = document.querySelector('.modal-replay');
let mClose = document.querySelector('.modal-close');
let gemPoints = document.querySelector('.gem-points');
let chooseModal = document.querySelector('.choose-player');
let play = document.querySelector('.player-play');
let pClose = document.querySelector('.player-close');
let chooseP = document.querySelector('.player-body');
let playerSprite = 'images/char-boy.png';


// The close button click listener to hide the points modal
mClose.addEventListener('click', () => {
  modal.style.display = 'none';
});
// The replay button click listener to continue playing the game
replay.addEventListener('click', () => {
  modal.style.display = 'none';
});
// The close button click listener to hide the choosing player modal
pClose.addEventListener('click', () => {
  chooseModal.style.display = 'none';
});
// The play button click listener to start playing the game
play.addEventListener('click', () => {
  chooseModal.style.display = 'none';
});
// window click listener to hide the modal
window.addEventListener('click', (even) => {
  if (even.target == modal) {
    modal.style.display = 'none';
  }
});

// The body of choosing player modal click listener to choose player
chooseP.addEventListener('click', choosePlayer);

/**
* @description choosing player based on selection by clicking
* @param eve - event to be used by listening to it
*/
function choosePlayer(eve) {
  if(eve.target.nodeName === 'IMG'){
    if(eve.target.id === 'c1'){
      playerSprite = 'images/char-boy.png';
    }
    else if (eve.target.id === 'c2') {
      playerSprite = 'images/char-cat-girl.png';
    }
    else if (eve.target.id === 'c3') {
      playerSprite = 'images/char-horn-girl.png';
    }
    else if (eve.target.id === 'c4') {
      playerSprite = 'images/char-pink-girl.png';
    }
    else if (eve.target.id === 'c5') {
      playerSprite = 'images/char-princess-girl.png';
    }
  }
};

// score from collecting gems
let gemScore = 0;

/**
 * Creates a new Player.
 * @class Player
 */
class Player {
  /**
   * @param {number} x - x Position for a new Player
   * @param {number} y - y Position for a new Player
   */
  constructor(x,y){
    /** @this Player */
    this.sprite = playerSprite;
	  this.x = x;
	  this.y = y;
    this.height = 60;
    this.width = 60;
    this.score = 0;
  }

  update(){
    for(let enemy of allEnemies){
      if(player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y){
        // console.log('collapsed');
        /** @this Player */
        // if the player get touched by a bug the points is reduced by 3
        // and the score from collecting gems is reduced by 30
        if(this.score >= 3){
          this.score -= 3;
        }
        else {
          this.score = 0;
        }
        if(gemScore >= 30){
          gemScore -= 30;
        }
        else {
          gemScore = 0;
        }
        // reset the position of the player
        this.reset();
      }
    }
  }

  /**
   * @param {number} key - key that have been pressed
   */
  handleInput(key){
    /** @this Player */
    // moving the player to the left
    if(key === 'left'){
      if(this.x > 0){
        this.x -= 100;
      }
    }
    // moving the player to the right
    else if(key === 'right'){
      if(this.x < 700){
        this.x += 100;
      }
    }
    // moving the player up
    else if(key === 'up'){
      if (this.y > 40){
        this.y -= 90;
      }
      // winning condition by reaching water
      else{
        // points is incresed by 1
        this.score += 1;
        const yourScore = this.score;
        points.innerText = yourScore;
        modal.style.display = 'block';
        // reset the position of the player
        this.reset();
      }
    }
    // moving the player down
    else if(key == 'down'){
      if(this.y < 400){
        this.y += 90;
      }
    }
  }

  reset(){
    /** @this Player */
    this.x = 300;
    this.y = 400;
  }

  render(){
    /** @this Player */
    this.sprite = playerSprite;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

/**
 * Creates a new Collectible.
 * @class Collectible
 */
class Collectible {

  /**
   * @param {number} x - x Position for a new Collectible
   * @param {number} y - y Position for a new Collectible
   * @param {number} cImg - a number to select a Collectible image
   */
    constructor(x,y,cImg){
      /** @this Collectible */
      this.sprite = this.choose(cImg);
  	  this.x = x;
  	  this.y = y;
      this.height = 10;
      this.width = 80;
    }

    // choose Collectible image based on cImg parameter
    choose(c){
        let cImage = 'images/Small-Gem-Blue.png';
        if (c === 2) {
          cImage = 'images/Small-Gem-Green.png';
        }
        else if (c === 3) {
          cImage = 'images/Small-Gem-Orange.png';
        }
        return cImage;
    }

    update(){
       for(let collectible of allCollectibles){
         if(player.x < collectible.x + collectible.width - 5 && player.x + player.width > collectible.x && player.y < collectible.y + collectible.height && player.y + player.height > collectible.y){
           // console.log('collapsed');
           /** @this Collectible */
           // changing the positions of all collectibles after collision
           this.reset();
           // updating the score from collecting gems
           gemScore += 1;
          }
       }
       gemPoints.innerText = gemScore;
     }

    // Draw the collectible on the screen
    render(){
      /** @this Collectible */
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset(){
      /** @this Collectible */
      // genertaing a rondom x position for a Collectible
      this.x = Math.floor(Math.random() * 750);
    }
}

// instantiate objects.
const allEnemies = [
  new Enemy(0,55),
  new Enemy(0,140),
  new Enemy(0,215),
  new Enemy(0,300)
];

const allCollectibles = [
  new Collectible(220,90,1),
  new Collectible(420,175,3),
  new Collectible(700,260,2),
  new Collectible(120,340,1)
];

const player = new Player(300,400);

// This listens for key presses and sends the keys to
// Player.handleInput() method.
/**
 * @param e - event to be used by listening to it
 */
document.addEventListener('keyup', function(e){
  // keys for moving the player
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);

  // keys for hiding the points modal
  const skipKeys = {
    13: 'enter',
    32: 'space',
  };

  if(skipKeys[e.keyCode]){
    if(modal.style.display === 'block'){
      modal.style.display = 'none';
    }
  }
});

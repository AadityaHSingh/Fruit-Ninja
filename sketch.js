var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword,swordImage;

var fruitGroup,fruit1,fruit2,fruit3,fruit4
var enemyGroup,enemy1,enemy2;

var score;

var GameOver,GameOverImage;

var GameOverSound,SwordSound;

function preload(){
  //loading Images
  swordImage = loadImage("sword.png");

  enemy1 = loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  GameOverImage = loadImage("gameover.png");
  
  GameOverSound = loadSound("gameover.mp3");
  SwordSound = loadSound("knifeSwooshSound.mp3");

}

function setup() {
  //creatingCanvas
  createCanvas(400,400);
  
  //creating sword
  sword = createSprite(20,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  score = 0;
  
  //creating GameOver
  GameOver = createSprite(200,200);
  GameOver.addImage("Gameover",GameOverImage);
  GameOver.scale = 0.5;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
}



function draw() {
  //setting Background
  background("lightblue");
  
  //displaying score
  text("Score: "+ score, 350,20);
   
    sword.x = mouseX;
    sword.y = mouseY;
  
  //Gamestate PLAY
  if(gameState === PLAY){
    
    GameOver.visible = false;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score +1;
    }

    
  //Gamestate END
  if(enemyGroup.isTouching(sword)){
    gameState = END;
    GameOverSound.play();
    }
  }
  else if (gameState === END) {
    
    GameOver.visible = true;
    
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    
  }
  
  fruits();
  enemy();
  drawSprites();
}


function fruits(){
 if (frameCount % 80 === 0){
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;  
   
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else if (r == 4){
      fruit.addImage(fruit4);
    }
   
    fruit.y = Math.round(random(50,340));
   
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
   
    fruitGroup.add(fruit);
    }
  }

function enemy() {
  //write code here to spawn the enemy
  if (frameCount % 150 === 0) {
    var enemy = createSprite(400,200,20,20);
    enemy.scale = 0.5;
    enemy.velocityX = -7;
    enemy.setLifetime = 100;
    
    r = Math.round(random(1,2));
    if(r == 1){
      enemy.addImage(enemy1);
    }else if(r == 2){
      enemy.addImage(enemy2);
    }
    
    enemyGroup.add(enemy);
  }
}
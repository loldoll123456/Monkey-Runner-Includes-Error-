var bananaImage;
var obstacleImage;
var obstaclegroup;
var backimage, monkeyimage;
var bananagroup;
var background;
var score;
var monkey;
function preload() {
  backimage = loadImage("jungle.jpg");
  monkeyimage = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("stone.png");
}
function setup() {
  createCanvas(400, 400);
  background = createSprite(200,200,400,400);
  background.addImage("obstacle",obstacleimage);
  background.velocityX = -6;
  Monkey = createSprite(45,340,20,20);
  monkey.addAnimation("monkey",monkeyimage);


Ground = createSprite(200,390,800,20);
Ground.x = Ground.width /2;
Ground.visibility = false;
  
  obstaclegroup = new Group();
  bananagroup = new Group();
}

function draw() {
  
  Ground.velocityX = -6;
if(Ground.x<0){
  Ground.x = Ground.width/2;
}
  
  monkey.collide(Ground);
  
  if(keyDown("space") && Monkey.y >= 333){
      Monkey.velocityY = -12 ;
    }
  
  Monkey.velocityY = Monkey.velocityY +0.8;
  

  
  if(bananagroup.isTouching(monkey)){
    score = score+2;
    bananagroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
    default: break;
  }
  
  if(obstaclegroup.isTouching(monkey)){
    monkey.scale = 0.1;
    score = 0;
  }
  
  Banana();
  spawnObstacles();
  drawSprites();
  stroke("white");
  textsize(20);
  fill("white");
  text("Score: "+score,500,50);
}

 function Banana() {
   if(World.framecount % 80 === 0) {
   var banana = createSprite(400,200,20,20);
   banana.scale = 0.2;
   banana.setAnimation("Banana");
   banana.y = randomNumber(120,200);
   banana.velocityX = -7;
   banana.lifetime = 100;
   bananagroup.add(banana);
   }
 }

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,390,20,20);
    obstacle.velocityX = -7;
    
    //generate random obstacles
    obstacle.setAnimation("Stone");
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstacleGroup.add(obstacle);
  }
}
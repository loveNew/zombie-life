var boy,boyImg,boyShootImg,bgImg,bg;
var edges,invi,bullet,bulletImg;
var zombieGroup,bulletGroup;
var zombie,zombieImg;
var score,bulletCount,fakeCount,lose,life1Img,life3Img,life2Img;
var gameState = "serve";
var life;
var fakeLife;


function preload(){
boyImg = loadImage("shooter_2.png");
bgImg = loadImage("bg.jpeg");
boyShootImg = loadImage("shooter_3.png");
zombieImg = loadImage("zombie.png");
lose = loadSound("lose.mp3");
lose.looping = false;
life1Img = loadImage("heart_1.png");
life2Img = loadImage("heart_2.png");
life3Img = loadImage("heart_3.png");
}

function setup(){
createCanvas(1200,600);

invi = createSprite(600,200,1500,10);

bg = createSprite(600,300,1200,600);
bg.addImage(bgImg);

boy = createSprite(300,400,50,50);
boy.addImage(boyImg);
boy.setCollider("rectangle",0,0,250,450);
boy.scale = 0.3;

life = createSprite(1050,50,50,50);
life.addImage(life3Img);
life.scale = 0.3;

zombieGroup = new Group();
bulletGroup = new Group();

score = 0;
bulletCount = 100;
fakeLife = 3;
fakeCount = 100;
edges = createEdgeSprites();
}

function draw(){
background("white");

drawSprites();

if(gameState === "bulletOver"){


zombieGroup.destroyEach();
bulletGroup.destroyEach();
boy.destroy();

fill("red");
textSize(40);
text("😔Game over😔,",width/2,height-200);
text("because your bullets got over!!",width/2,height-150);
life.destroy();

}

if(gameState === "lifeOver"){
zombieGroup.destroyEach();
bulletGroup.destroyEach();
boy.destroy();
life.destroy();

fill("red");
textSize(40);
text("😔Game over😔,",width/2,height-200);
text("because your life got over!!",width/2,height-150);
}

if(gameState === "serve"){
if(keyDown(UP_ARROW)){
    boy.y = boy.y-5;
}
if(keyDown(DOWN_ARROW)){
    boy.y = boy.y+5;
}
if(keyDown(LEFT_ARROW)){
    boy.x = boy.x-5;
}
if(keyDown(RIGHT_ARROW)){
    boy.x = boy.x+5;
}
if(keyWentDown("space")){
   createBullets();
   bulletCount = bulletCount - 10;
   fakeCount = fakeCount - 10;
   boy.addImage(boyShootImg);
}
else if(keyWentUp("space")){
   boy.addImage(boyImg);
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i<zombieGroup.length; i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
  score = score + 10;
  zombieGroup[i].destroy();
  bulletGroup.destroyEach();
  }
  }

}

boy.collide(edges);
boy.collide(invi);
spawnZombies();    

fill("yellow");
textSize(25);
text("Score: " + score, 1010,110);
text("Bullets: " + bulletCount, 1000,150);
text(fakeLife,200,200);
}

if(fakeCount <= 0){
lose.play();
fakeCount = fakeCount + 1000000;
gameState = "bulletOver";

}
text(fakeLife,200,200);

if(fakeLife === 2){
for(var i = 0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(boy)){
zombieGroup[i].destroy();
life.addImage(life2Img);
fakeLife = fakeLife - 1;
}}}

if(fakeLife === 1){
for(var i = 0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(boy)){
zombieGroup[i].destroy();
life.addImage(life1Img);
}}}



if(boy.isTouching(zombieGroup)){
   fakeLife = fakeLife - 1;
}

}

function createBullets(){

bullet = createSprite(boy.x,boy.y-25,8,5);
bullet.velocityX = 10;
bulletGroup.add(bullet);

}

function spawnZombies(){

if(frameCount % 50 === 0){
zombie = createSprite(random(820,1300),random(210,570),8,5);
zombie.addImage(zombieImg);
zombie.setCollider("rectangle",0,0,250,850);
zombie.scale = 0.1;
zombie.velocityX = -5;
zombie.lifetime = 300;
zombieGroup.add(zombie);
}
}


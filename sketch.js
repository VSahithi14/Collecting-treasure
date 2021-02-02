var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0;
var gameState=1;
var boyCollied

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  boyCollided=loadAnimation("runner1.png")
}

function setup(){
  
  createCanvas(400,500);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,450,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("rest",boyCollided);  
boy.scale=0.08;
  
end =createSprite(200,200,30,40);
end .addAnimation("end",endImg);  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  
}

function draw() {

  background(0);
 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
  
  
    
    
  if(gameState===PLAY){
    path.velocityY = 4;
     boy.x = World.mouseX;
    
    if(path.y > 400 ){
    path.y = height/2;
  }
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+60;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+200;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        treasureCollection=treasureCollection+0;
        gameState=END;
    }
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    end.visible=false;
    
    
  }
  
  else if(gameState===END){
    path.velocityY=0;
   
    cashG.setVelocityEach(0);
    diamondsG.setVelocityEach(0);
    jwelleryG.setVelocityEach(0);
    swordGroup.setVelocityEach(0);
    
    end.visible=true;
    
    boy.changeAnimation("rest",boyCollided);
    
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
  }
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = -1;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(250, 500),40, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = -1;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount %300 == 0) {
  var jwellery = createSprite(Math.round(random(40, 300),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = -1;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 400 == 0) {
  var sword = createSprite(Math.round(random(50, 300),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = -1;
  swordGroup.add(sword);
  }
}
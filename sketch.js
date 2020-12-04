
var monkey , monkey_running
var bananas ,bananaImage, obstacles, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //create monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  //create ground
  ground = createSprite(400,350,900,10);
  ground.shapeColor = "brown";
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  //create obstacle and banana group
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //set initial score
  score = 0;
}


function draw() {

  background("lightblue");
  
  //calculate and display survival time
  fill("black");
  score = Math.ceil(frameCount/frameRate());
  textSize(20);
  text("Survival Time: "+ score, 200,50);
  
  
  
  //set infinite ground
  if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
  //jump the monkey when space key pressed
  if(keyDown("space")&& monkey.y>=310)
    {
      monkey.velocityY = -14;
    }
  //make the monkey come back to the ground
  monkey.velocityY = monkey.velocityY + 0.7;
  
  //call obstacles
  produceObstacles();
  
  //call bananas
  produceBananas();
  
  //collide monkey
  monkey.collide(ground);
  
  
  drawSprites();
  
  
}


function produceBananas()
{
  if (frameCount%80===0)
    {
      bananas = createSprite(300,150,20,10);
      bananas.addImage(bananaImage);
      bananas.y = Math.round(random(150,220));
      bananas.velocityX = -3;
      bananas.lifetime = 150;
      bananas.scale = 0.1;
      FoodGroup.add(bananas);
    }
}


function produceObstacles()
{
  if (frameCount%300===0)
    {
      obstacles = createSprite(400,330,20,10);
      obstacles.addImage(obstacleImage);
      obstacles.velocityX = -3;
      obstacles.lifetime = 150;
      obstacles.scale = 0.1;
      obstacleGroup.add(obstacles);
    }
}




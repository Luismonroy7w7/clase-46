var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3

var gameOver, gameOverImg

var restart, restartImg

var score =0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImg= loadImage("assets/gameOver.png")
restartImg= loadImage("assets/restart.png")


}

function setup(){

  createCanvas(400,400)
//imagen de fondo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creando los terrenos superior e inferior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = true;

topGround = createSprite(200,10,800,20);
topGround.visible = true;
      
//creando el globo 
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true;

topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();

gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage(gameOverImg);
gameOver.scale =0.4  ;
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible =false; 
restart.visible =false;





}

function draw() {
  
  background("black");
        
          //haciendo que el globo aerostático brinque
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //agregando la gravedad
           balloon.velocityY = balloon.velocityY + 2;

           
          Bar();
   
        drawSprites();
       
        //generando los obstáculos superiores
      spawnObstaclesTop();

      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //posiciones "y" aleatorias para los obstáculos superiores
    obstacleTop.y = Math.round(random(10,100));

    //generar obstáculos superiores de forma aleatoria 
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //asignando lifetime (tiempo de vida) a la variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = true;
         }

  

}

function reset()
{
  gameState = PLAY;
  gameOver.visible=false;
  restart.visible=false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();

  score= 0;
}

  

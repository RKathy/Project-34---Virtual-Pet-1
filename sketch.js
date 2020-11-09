//Create variables here
var dog,dogImage,dogImage1;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImage=loadImage("images/Dog.png");
   dogImage1=loadImage("images/happydog.png");
}

function setup() {
	database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
  
}


function draw() {  
  background("turquoise");
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage1);
  }

  drawSprites();
  fill("black");
  stroke("black");
  text("Milk remaining: "+foodS,170,200);
  textSize(13);
  text("Press the UP arrow key to feed Charlie milk!",130,10,300,20);
}


//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}


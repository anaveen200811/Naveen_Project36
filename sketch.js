//Create variables here
var foodStock;
var lastFed,fedTime;
var changeState;
var readState;
var bedroom,garden,Washroom,currentTime; 
var dog,happyDog,feed,addFood,dogImg,database, foodS, foodStock,foodObj;
function preload(){
  //load images here
  bedroom = loadImage("virtual pet images/Bed Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  Washroom = loadImage("virtual pet images/Wash Room.png");
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,700);
  
  foodObj = new Food();

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}
function draw() { 
  background(46,139,87);
  currentTime=hour();

  foodObj.display();
  if(currentTime ==(lastFed+1)) {
    update("playing");
    foodObj.garden();  
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
   feed.show();
   addFood.show();
   dog.addImage(dogImg);
  }
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("last Fed : "+ lastFed%12 + "PM",0,30)
  }else if(lastFed==0) {
    text("last Fed : 12 AM",50,30);
  }else{
    text("last Fed : "+ lastFed + " AM",0,30)
  }
  
  drawSprites();
  fill("blue");
  textSize(20);
  text("foodStock:"+foodS,200,100);
  //add styles here
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x) {

  database.ref('/').update({
    Food:x
  });
}
function feedDog() {
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  writeStock(foodS);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}
function addFoods() {
  foodS++;
  dog.addImage(dogImg);
  database.ref('/').update({
    Food:foodS
  })
}
function update(state) {
  database.ref('/').update({
    gameState:state
  })
}

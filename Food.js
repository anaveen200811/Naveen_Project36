class Food{
  constructor() {
     this.lastFed;
     this.foodStock=0;
     this.image = loadImage("Milk.png");
    }
  bedroom() {
    background(bedroom,550,500);
  }
  garden() {
    background(garden,550,500);
  }
  washroom() {
    background(Washroom,550,500);
  }
  updateFoodStock(foodStock){
    this.foodStock=foodStock;
  }
  getFedTime(lastFed){
    this.lastFed=lastFed;
  }

  deductFood(){
    if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
    }
  }

  getFoodStock(){
    return this.foodStock;
  }
  display() {
    var x = 70;
    var y = 100;
    background(46,139,87);
    textSize(15);
  if(lastFed>=12) {
    text("last Fed : "+ lastFed%12 + "PM",0,30)
  }else if(lastFed==0) {
    text("last Fed : 12 AM",50,30);
  }else{
    text("last Fed : "+ lastFed + " AM",0,30)
  }
  
    imageMode(CENTER);
    //image(this.image,x,y+50,50,50);
    if(this.foodStock!=0) {
        for(var i = 0;i<this.foodStock;i++) {
            if(i%10==0) {
                x = 70;
                y = y+50
            }
            image(this.image,x,y,50,50);
            x = x+30;
        }
    }
  }
  
}
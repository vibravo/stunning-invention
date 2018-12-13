//bullet
var bullet = [];
var firing;

//ship
var galagaship;
var ok = 0;
var idk = 500;

//stars
var stararray = [];
var stars;
var numberofstars = 300;

//bee object
var Count = 0;
var bee;
var BeeArray = []
var NumOfRows = 2;
var NumOfBeespRow = 9;
var spaceBtwnCol = 30;
var spaceBtwnBees = 50;

//boss object
var gal;
var BossArray = []
var NumOfRowsB = 2;
var NumOfBosspRow = 10;
var spaceBtwnColB = 30;
var spaceBtwnBoss = 50;
 
//boss galaga object
var bossga;
var County = 0;

var flag = 0;

function preload(){
	//images
	bulletpic = loadImage('bullets.png');
	ship = loadImage('galaga_ship.png');
	bee = loadImage('bee.png');
	bossgalaga = loadImage('bossgalaga.png');
	logo = loadImage('galagalogo.png');
	boss = loadImage('boss.png');
	
	//sound effects
	firing = loadSound("firing.mp3");
	theme = loadSound("galaga_theme.mp3");
	
	//text
	font = loadFont('CourierStd-Bold.otf');
	
}
	
function setup() {
	createCanvas(800, 800);
	rectMode(RADIUS);	
	theme.play();
	
	//set up stars
	for (var i = 0; i < numberofstars; i++){
		var stars = new star;
		stars.position(width,height);
		stararray[i] = stars;
	}	
	//bees
	for (let i = 0; i < NumOfRows; i++){
		for (let j = 0; j < NumOfBeespRow; j++){
			let InitY = -20 - i*spaceBtwnCol;
			let InitX = 100 + j*spaceBtwnBees;
      BeeArray[i*NumOfBeespRow + j] = new beeobject(bee,i,j,spaceBtwnBees,spaceBtwnCol);
	
		}
	//boss object
	for (let i = 0; i < NumOfRowsB; i++){
		for (let j = 0; j < NumOfBosspRow; j++){
			let InitY = -20 - i*spaceBtwnColB;
			let InitX = 100 + j*spaceBtwnBoss;
      BossArray[i*NumOfBosspRow + j] = new bossobject(boss,i,j,spaceBtwnBoss,spaceBtwnColB);
		}
	} 
	} 
}

function draw() {
	background(0);
	rectMode(RADIUS);
	imageMode (CENTER)
	
if (flag == 0){ // if mouse is clicked, do this
	for(var i = 0; i < numberofstars; i++){
		fill(random(0,255),random(0,255),random(0,255));				
		rect(stararray[i].x,stararray[i].y,2,2);
	}
		intro();
}
if (flag == 1){ 
	//objects
	galagaship = new shipobject(ship);
	bees = new beeobject(bee);
	bossga = new bossgalagaobject(bossgalaga);
	
	//resize images
	ship.resize(50,0);
	bee.resize(50,0);
	bossgalaga.resize(50,0);
	boss.resize(50,0);

	//draw stars
	for(var i = 0; i < numberofstars; i++){
		fill(random(0,255),random(0,255),random(0,255));				
		rect(stararray[i].x,stararray[i].y,2,2);
	}
	
	galagaship.move(ok,this.ratio);
	galagaship.display();
	galagaship.cdistance();
	bossga.move();
	
	//score
	fill(255);
	text('SCORE: '+bullet.length*10,600, 50);

	//three ships
	image(ship,20,750,30,30);
	image(ship,50,750,30,30);
	image(ship,80,750,30,30);
	
	//bullets kill bees
	for (var i = 0; i < bullet.length; i++) {		
	  bullet[i].display();
	  bullet[i].y = (bullet[i].y + bullet[i].step)%height;
	  
		for (let j = 0; j < BeeArray.length; j++){
			for (let k = 0; k < BossArray.length; k++){
	     BeeArray[j].DidYouClickOnMe(bullet[i].x+25,bullet[i].y)
			 BossArray[k].DidYouClickOnMe(bullet[i].x+25,bullet[i].y)
		}	//for j
	} //for i
} // for k
	
	KillTheBoss();
	KillTheBee();
	KillTheBullet();
	
	//bee array
	for (let i = 0; i < BeeArray.length; i++){
		BeeArray[i].PlaceImage(1);
	}	
	//boss array
	for (let j = 0; j < BossArray.length; j++){
		BossArray[j].PlaceImage(1);
		}
	}
}

function mousePressed() {
	flag = flag + 1;
	if (flag = 1){
		flag = 1;
	}
}

function mouseClicked(){ 
	firing.play();
	bullet[bullet.length] = new bulletobject(galagaship.X,700);
	KillTheBee();
	KillTheBoss();
}

function keyPressed(){
  //move ship
	var n = 20;
		if (keyCode === RIGHT_ARROW) {
			 ok = ok + n
		} else if (keyCode === LEFT_ARROW) {
			 ok = ok - n
		}
	if (ok == idk) {
		ok = 0
	}
	if (keyCode === ENTER){
			bullet[bullet.length] = new bulletobject(galagaship.X,700);
		}
}

function intro(){
	image(logo,400,200);
	fill(200);
	textFont(font);
	textSize(20);
	text('PRESS ANYWHERE TO BEGIN',250,350);
}

function KillTheBee() {
	for (let i = 0; i < BeeArray.length; i++){
      if (BeeArray[i].AmIHit == 1) {   //if object was clicked on... get rid of it
			  var sub1 = subset(BeeArray, 0, i);
	      var sub2 = subset(BeeArray, i+1,BeeArray.length);
	      
				BeeArray = concat(sub1,sub2);
		}
	}
}

function KillTheBoss() {
	for (let i = 0; i < BossArray.length; i++){
      if (BossArray[i].AmIHit == 1) {   //if object was clicked on... get rid of it
			  var sub1 = subset(BossArray, 0, i);
	      var sub2 = subset(BossArray, i+1,BossArray.length);
	      
				BossArray = concat(sub1,sub2);
		}
	}
}

function KillTheBullet(){
	for (let i = 0; i < bullet.length; i++){
      if (bullet[i].AmIHit == 1) {   //if object was clicked on... get rid of it
			  var sub1 = subset(bullet, 0, i);
	      var sub2 = subset(bullet, i+1,bullet.length);
	      
				bullet = concat(sub1,sub2);
		}
	}
}
			

//objects

function shipobject(img) {
	this.img = img;
	this.InitX = 400;
	this.X = img.X;
	this.InitY = 700;
	this.Y = 800;
	
	this.move = function(step,ratio) {
		this.X = this.InitX + step;
		this.Y = this.InitY + 1;
	}
	
	this.display = function() {
		image(img,this.X,this.Y);	
	}

	this.cdistance = function() {
		this.distance = idk - this.InitX
		this.ratio = 1-ok/this.distance
	}
}

function bulletobject(x,y){
	this.x = x;
	this.y = y;
	this.size = 30;
	this.step = -10;
	
	this.display = function(){
		image(bulletpic,this.x,this.y,this.size,this.size);
	}	
}

function beeobject(Img,r,c,SpaceBBees,SpaceBColum) {
	this.img = Img
	this.row = r
	this.column = c;
	this.SpaceX = SpaceBBees;
	this.SpaceY = SpaceBColum;
	
	this.Y = -10 - this.row*this.SpaceY;
	this.X = 160 + this.column*this.SpaceX;
	
	this.AmIHit = 0;
	
	this.PlaceImage = function(Step) {
	 	this.Y  = this.Y+Step;
	 	image(this.img,this.X ,this.Y) 
 }
 
 this.DidYouClickOnMe = function(X,Y){
	 
   var InWidth = false;
   var InHeight = false;
 
	 if ((X > this.X+10) && (X < this.X+10+30)) {
		 InWidth = true;
	 }
	 if ((Y > this.Y+10) && (Y < this.Y+10+30)) {
		  InHeight = true;
	 }
	 
	 if ((InWidth == true) && (InHeight == true) ) {
		 //print("got me, dang you!");
		 this.AmIHit = 1;
	 	}
 	}	
}
	
function bossobject(Img,r,c,SpaceBBoss,SpaceBColum) {
	this.img = Img
	this.row = r
	this.column = c;
	this.SpaceX = SpaceBBoss;
	this.SpaceY = SpaceBColum;
	
	this.Y = -70 - this.row*this.SpaceY;
	this.X = 135 + this.column*this.SpaceX;
	
	this.AmIHit = 0;
	
this.PlaceImage = function(Step) {
	 this.Y  = this.Y+Step;
	 image(this.img,this.X ,this.Y) 
 }
 
 this.DidYouClickOnMe = function(X,Y){
	 
 var InWidth = false;
 var InHeight = false;
 
	 if ((X > this.X+10) && (X < this.X+10+30)) {
		 InWidth = true;
	 }
	 if ((Y > this.Y+10) && (Y < this.Y+10+30)) {
		  InHeight = true;
	 }
	 
	 if ((InWidth == true) && (InHeight == true) ) {
		// print("got me, dang you!");
		 this.AmIHit =1;
	 }
 }	
}

 function bossgalagaobject(Img) {
	this.img = Img
	this.X = Img.x;
	this.Y = Img.y;
	
 this.PlaceImage = function() {
	 image(this.img,this.X ,this.Y) 
 }
 this.move = function(){
	 County = County + .2;
   if (County > 600)
		 County = 0;
	 
	 image(bossgalaga,100,-200+County);
 }
}

function star(){
		this.x;
		this.y;
		this.size;
		
		this.position = function(x,y){
			this.x = random(x);
			this.y = random(y);
			
		}
	}

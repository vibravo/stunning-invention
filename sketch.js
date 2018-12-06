var Cx,Cy;
var Diameter = 200;
var Radius = Diameter/2;



function setup() {
	createCanvas(windowWidth, windowHeight);
	Cx = windowWidth/2;
	Cy = windowHeight/2;
	
	angleMode(DEGREES);
	
}
 
function draw() {
background(0);
	
	
// background
	for (var V = 0; V < windowWidth; V = V + 100) {
			for (var B = 0; B < windowHeight; B = B + 100){
			ellipse(V, B, 10, 10); // unless I assign a color to the ellipses, they will change according to the PhaseAngle
			ellipse(V, V, 10, 10);
		}
	}	
	// panels + ellipses
	for (var j = -100;j <= 100;j = j + 10){
    for (var i = 0; i < 10; i++) {
			if (j <=0){
				
		
// top middle
			ring(Cx-j,Cy-j,(i*10+frameCount*3)%360,Radius,-1);
			ellipse(windowWidth/2,windowHeight/2,100,100);
// top left
			ring(Cx/2-j,500-j,(i*10+frameCount*3)%360,Radius,-1);
			ellipse(windowWidth/4,500,100,100);
// top right		
			ring(1200-j,350-j,(i*10+frameCount*3)%360,Radius,-1);
			ellipse(1200,350,100,100);

			} else {
// bottom middle panel
			ring(Cx-j,Cy-j,(i*10+frameCount*3)%360,Radius,1);
// bottom left panel
			ring(Cx/2-j,500-j,(i*10+frameCount*3)%360,Radius,1); //2
// bottom right panel
			ring(1200-j,350-j,(i*10+frameCount*3)%360,Radius,1); //3
			}
   	}
	}
	
// colors for panels that go around circles
	function ring (X,Y,PhaseAngle,Rad,Dir){
  var Xpos;
	var Ypos;
		
	Xpos = X + Rad*cos(PhaseAngle+Dir*90);
	Ypos = Y + Rad*sin(PhaseAngle+Dir*90);
	
// change colors depending on angle
	if (PhaseAngle < 190 )  {
	  fill(0) //pink
	} else {
		fill(255,255,255) //yellow
	}
	stroke(255+j,255-j,(i*10+frameCount)%360);
	ellipse(Xpos,Ypos,25,25);

	}
}

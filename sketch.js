var Cx,Cy;
var Diameter = 200;
var Radius = Diameter/2;



function setup() {
	createCanvas(380, 350);
	Cx = windowWidth/2;
	Cy = windowHeight/2;
	
	angleMode(DEGREES);
	
}
 
function draw() {
background(0);
	
	
// background
	for (var V = 0; V < windowWidth; V = V + 70) {
			for (var B = 0; B < windowHeight; B = B + 70){
			ellipse(V, B, 8, 8); // unless I assign a color to the ellipses, they will change according to the PhaseAngle
			ellipse(V, V, 8, 8);
		}
	}	
	// panels + ellipses
	for (var j = -100;j <= 100;j = j + 10){
    for (var i = 0; i < 10; i++) {
			if (j <=0){
				
		
// top middle
			ring(180-j,160-j,(i*10+frameCount*2)%360,Radius,-1);
			ellipse(180,160,100,100);
			} else {
// bottom middle panel
			ring(180-j,160-j,(i*10+frameCount*2)%360,Radius,1);
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
	ellipse(Xpos,Ypos,18,18);

	}
}

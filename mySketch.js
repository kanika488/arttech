let fileJson = ['a camera','an apple','a bicycle','a crab','headphones','the Eiffel Tower'];
let strokes = 0;
let drawing = false;
let clicks = [];
let incarray = [4,2,3,2,2,4];
let increment;
let numDrawings=625;
let xPara=1;
let yPara=5;
let choice;
let drawings;

function preload(){	
	let index = floor(random(0, 6));
	choice = fileJson[index];
	increment = incarray[index];
	let url = choice +'.json';
	apple = loadJSON(url);
	
}
			
function setup() {
	createCanvas(windowWidth,windowHeight);
	background(255);
	numStrokes = 0;
	noFill();
	drawings = []
			// console.log()
	for (let index1 = 0; index1 < numDrawings*2; index1 +=1){
		drawings[index1] = apple[index1].drawing;
		// console.log(drawings[index1]);
	}
	drawings = shuffle(drawings);
	
	strokeWeight(1);
	stroke(0);
	rectMode(CORNERS);
	fill(255);
	rect(3*windowWidth/4+31,3*windowHeight/4-10,windowWidth,windowHeight);
	
		textAlign(CENTER);
		stroke(0);

		textSize(20);
		fill(255,0,0);
		let title="Draw "+choice+ " here";
		text(title,(3*windowWidth/4)+10,3*windowHeight/4,windowWidth/4,150);
		textSize(50);
		textAlign(LEFT);
		fill(0);
		text("Draw with a Thousand People",40,40,2*windowWidth,200);
		textSize(25);
		text("1. Draw the object specified in the box on the bottom-right corner.",40,150,windowWidth,75);
		text("2. Refresh to draw a different object.",40,200,windowWidth,75);
}

function draw() {
	if (mouseIsPressed) 
	{
		if (!drawing) 
		{
			drawing = true;
			numStrokes += 1;
			
			if(pmouseX > 3*windowWidth/4+31 && pmouseY > 3*windowHeight/4-10){
				clicks[clicks.length] = [pmouseX, pmouseY, mouseX, mouseY, 1];
			}
			
		}
		else
		{
			if(pmouseX > 3*windowWidth/4+31 && pmouseY > 3*windowHeight/4-10){
				clicks[clicks.length] = [pmouseX, pmouseY, mouseX, mouseY, 0];
			}
			// clicks[clicks.length] = [pmouseX, pmouseY, mouseX, mouseY, 0];
		}
	} 
	else 
	{
		drawing = false;
	}
	
	if(frameCount % 5==0)
		{
			if(clicks.length!=0){
			background(255);
			}
			let parameters = [];
			let xOffset = xPara;
			let yOffset = yPara;
			// console.log(apple)
			
			
			for (let index = 0; index < numDrawings; index+=1) 
			{
				parameters[index] = [xOffset, yOffset];
				// strokes = apple[index].drawing;
				// console.log(drawings);
				strokes = drawings[index];
				xOffset+=windowWidth/numDrawings**0.5;
				if ((index+1)%numDrawings**0.5==0){
					xOffset=1;
					yOffset+=windowHeight/numDrawings**0.5;
				}
				let count = 0;
				for (let i = 0; i < strokes.length; i++) 
				{
					strokeWeight(1);
					stroke(0);
					let stroke1 = strokes[i];
					let xs = stroke1[0];
					let ys = stroke1[1];
					let lVector=createVector(xs[xs.length-1],ys[xs.length-1]);
					beginShape();
					let fillShape=[];
					for (let j = 0; j < xs.length; j++) 
					{
						let pVector=translateFunc(xs[j],ys[j],xOffset,yOffset);
						stroke(map(count,0,150,0,150),map(count,0,250,0,100),map(count,0,450,0,100));
						fill(map(count,0,150,0,240),map(count,0,150,0,70),map(count,0,150,240,0),map(count,0,150,20,40));
						vertex(pVector.x, pVector.y);
						count += increment;
						if(count > clicks.length) break;
					}
					endShape();
					if(count > clicks.length) break;
				}
			}
		}
	
		// strokeWeight(1);
		// stroke(0);
		// rectMode(CORNERS);
		// fill(255);
		// rect(3*windowWidth/4+31,3*windowHeight/4-10,windowWidth,windowHeight);
		// if(clicks.length==0){
		// 	textAlign(CENTER);
		// 	stroke(0);
		// 	fill(0);
		// 	textSize(35);
		// 	// fill(255,0,0)
		// 	let title="Draw "+choice+ " here";
		// 	text(title,3*windowWidth/4,3*windowHeight/4,windowWidth/4,200);
		// 	textSize(50);
		// 	textAlign(LEFT);
		// 	text("Draw with a Thousand People",40,40,windowWidth/2,200);
		// 	textSize(25);
		// 	text("1. Draw the object specified in the box on the bottom-right corner.",40,150,windowWidth/2,75);
		// 	text("2. Refresh to draw a different object.",40,200,windowWidth/2,75);
		// }
		
		if(clicks.length!=0){
		strokeWeight(1);
		stroke(0);
		rectMode(CORNERS);
		fill(255);
		rect(3*windowWidth/4+31,3*windowHeight/4-10,windowWidth,windowHeight);
		beginShape();
		for(let i=0; i<clicks.length; i++){
			strokeWeight(5);
			let scalePara=increment*4;
			stroke(map(i/scalePara,0,30,0,150),map(i/scalePara,0,50,0,100),map(i/scalePara,0,90,0,100));
			fill(map(i/scalePara,0,30,0,240),map(i/scalePara,0,30,0,70),map(i/scalePara,0,30,240,0),20);
			if(clicks[i][4]){
				endShape();
				beginShape();
			}
			let userVect=createVector(clicks[i][0], clicks[i][1]);
			if(userVect.x > 3*windowWidth/4+31 && userVect.y > 3*windowHeight/4-10){
				vertex(userVect.x,userVect.y);
			}
		}
			endShape();
		}
}
function translateFunc(x,y,xOffset,yOffset){
	x=map(x,0,255,0,windowHeight/numDrawings**0.5);
	y=map(y,0,255,0,windowHeight/numDrawings**0.5-5);
	x=x+xOffset;
	y=y+yOffset;	
	let p=createVector(x,y);
	return p;
}
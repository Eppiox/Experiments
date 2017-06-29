//Globals
var FPS = 60;
var TURN_SPEED = 10;
var TOP_SPEED = 15;
var keyW, keyA, keyS, keyD, keySpace, keyT, keyY, keyU, keyG, keyH, keyJ;
var myShip;

var canvas = document.createElement('canvas');
	canvas.id		 = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//canvas.width	= 1920;
	//canvas.height = 1080;
	canvas.style.zIndex	 = 999999;
	canvas.style.position = "fixed";
	canvas.style.left = "0px";
	canvas.style.top = "0px";
	canvas.style.right = "0px";
	canvas.style.bottom = "0px";
document.body.appendChild(canvas);

var myCanvas = document.getElementById('canvas');

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

//event listener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function onKeyDown(event) {
	var keyCode = event.keyCode;
	switch (keyCode) {
		case 68: //d
			keyD = true;
			break;
		case 83: //s
			keyS = true;
			break;
		case 65: //a
			keyA = true;
			break;
		case 87: //w
			keyW = true;
			break;
		case 32: //space
			keySpace = true;
			break;
		case 85: //U
			keyU = true;
			break;
		case 89: //y
			keyY = true;
			break;
		case 84: //t
			keyT = true;
			break;
		case 71: //g
			keyG = true;
			break;
		case 74: //J
			keyJ = true;
			break;
		case 72: //h
			keyH = true;
			break;
	}
}

function onKeyUp(event) {
	var keyCode = event.keyCode;

	switch (keyCode) {
		case 68: //d
			keyD = false;
			break;
		case 83: //s
			keyS = false;
			break;
		case 65: //a
			keyA = false;
			break;
		case 87: //w
			keyW = false;
			break;
		case 32: //space
			keySpace = false;
			break;
		case 85: //U
			keyU = false;
			break;
		case 89: //y
			keyY = false;
			break;
		case 84: //t
			keyT = false;
			break;
		case 71: //g
			keyG = false;
			break;
		case 74: //J
			keyJ = false;
			break;
		case 72: //h
			keyH = false;
			break;
	}
}

//if (myCanvas.getContext){
	//var ctx = myCanvas.getContext('2d');
	//ctx.fillRect(25,25,100,100);
//}
function cell(number, numbers=null){
	this.number = number;
	//or 9dig array

	//neighbours
	this.botLeft = this.number-4;
	this.midLeft = this.number-3;
	this.topLeft = this.number-2;
	this.botMid = this.number-1;
	this.topMid = this.number+1;
	this.botRight = this.number+2;
	this.midRight = this.number+3
	this.topRight = this.number+4;
}

function board(width, height, zero){
	this.width = width;
	this.height = height;
	this.zero = zero;
	this.maxNumber = this.width * this.height;
	//Assuming typical 3 rows for now
	this.topRow = [];
	this.midRow = [];
	this.bowRow = [];
}
function Point3D(xVal, yVal, zVal) {
	this.x = xVal;
	this.y = yVal;
	this.z = zVal;
}

function Point2D(xVal, yVal) {
	this.x = xVal;
	this.y = yVal;
}
Point3D.prototype.resizePointsUniformly = function (resizeByScale){
	this.x = this.x * resizeByScale;
	this.y = this.y * resizeByScale;
	this.z = this.z * resizeByScale;
}
Point3D.prototype.adjustXValueBy = function (pixelAdjustment){
	this.x = this.x + pixelAdjustment;
}
Point3D.prototype.adjustYValueBy = function (pixelAdjustment){
	this.y = this.y + pixelAdjustment;
}
Point2D.prototype.resizePointsUniformly = function (resizeByScale){
	this.x = this.x * resizeByScale;
	this.y = this.y * resizeByScale;
}

Point2D.prototype.adjustXValueBy = function (pixelAdjustment){
	this.x = this.x + pixelAdjustment;
}
Point2D.prototype.adjustYValueBy = function (pixelAdjustment){
	this.y = this.y + pixelAdjustment;
}
function ship () {
	this.turningRight = false;
	this.turningLeft = false;
	this.x = 800;
	this.y = 800;
	this.direction360 = 0;
	this.heading = 0;
	this.directionRad = 0;
	this.speed = 0;
	this.turnSpeed = 0;
	this.points = [];
	this.pointsBase = [];
	this.rotX = 0;
	this.rotY = 0;
	this.rotZ = 0;
	this.radX = 0;
	this.radY = 0;
	this.radZ = 0;
	this.xRotateSpeed = 10 * Math.PI / 180; 
	this.yRotateSpeed = 10 * Math.PI / 180;
	this.zRotateSpeed = 10 * Math.PI / 180;
	//ur-quan ship
	this.points.push(new Point3D(-.1, .6, 0 ));
	this.points.push(new Point3D(.2, 1, 0 ));
	this.points.push(new Point3D(.5, 1, 0 ));
	this.points.push(new Point3D(1.2, .2, 0 ));
	this.points.push(new Point3D(1.2, -.2, 0 ));
	this.points.push(new Point3D(.5, -1, 0 ));
	this.points.push(new Point3D(.2, -1, 0 ));
	this.points.push(new Point3D(-.1, -.6, 0 ));
	this.points.push(new Point3D(-1, -.6, 0 )); 
	this.points.push(new Point3D(-1, -1, 0 ));
	this.points.push(new Point3D(-1, -1, 0 ));
	this.points.push(new Point3D(0.1, -1.1, 0 ));
	this.points.push(new Point3D(0.1, -1.2, 0 ));
	this.points.push(new Point3D(0.1, -1.5, 0 ));
	this.points.push(new Point3D(0.0, -1.6, 0 ));
	this.points.push(new Point3D(-1.5, -1.6, 0 ));
	this.points.push(new Point3D(-2, -1.3, 0 ));
	this.points.push(new Point3D(-2.3, -1, 0 ));
	this.points.push(new Point3D(-1.4, -1, 0 ));
	this.points.push(new Point3D(-1.4, -.6, 0 ));
	this.points.push(new Point3D(-2, -.6, 0 ));
	this.points.push(new Point3D(-2, -.5, 0 ));
	this.points.push(new Point3D(-2.2, -.5, 0 ));
	this.points.push(new Point3D(-2.6, -.7, 0 ));
	this.points.push(new Point3D(-2.6, -.5, 0 ));
	this.points.push(new Point3D(-2.7, -.4, 0 ));
	this.points.push(new Point3D(-2.7, .4, 0 ));
	this.points.push(new Point3D(-2.6, .5, 0 ));
	this.points.push(new Point3D(-2.6, .7, 0 ));
	this.points.push(new Point3D(-2.2, .5, 0 ));
	this.points.push(new Point3D(-2, .5, 0 ));
	this.points.push(new Point3D(-2, .6, 0 ));
	this.points.push(new Point3D(-1.4, .6, 0 ));
	this.points.push(new Point3D(-1.4, 1, 0 ));
	this.points.push(new Point3D(-2.3, 1, 0 ));
	this.points.push(new Point3D(-2, 1.3, 0 ));
	this.points.push(new Point3D(-1.5, 1.6, 0 ));
	this.points.push(new Point3D(0.0, 1.6, 0 ));
	this.points.push(new Point3D(0.1, 1.5, 0 ));
	this.points.push(new Point3D(0.1, 1.2, 0 ));
	this.points.push(new Point3D(0.1, 1.1, 0 ));
	this.points.push(new Point3D(0, 1, 0 ));
	this.points.push(new Point3D(-1, 1, 0 ));
	this.points.push(new Point3D(-1, .6, 0 ));
	this.points.push(new Point3D(-.1, .6, 0 ));
	this.points.push(new Point3D(-.1, .6, -2 ));
	this.points.push(new Point3D(.2, 1, -2 ));
	this.points.push(new Point3D(.5, 1, -2 ));
	this.points.push(new Point3D(1.2, .2, -2 ));
	this.points.push(new Point3D(1.2, -.2, -2 ));
	this.points.push(new Point3D(.5, -1, -2 ));
	this.points.push(new Point3D(.2, -1, -2 ));
	this.points.push(new Point3D(-.1, -.6, -2 ));
	this.points.push(new Point3D(-1, -.6, -2 )); 
	this.points.push(new Point3D(-1, -1, -2 ));
	this.points.push(new Point3D(-1, -1, -2 ));
	this.points.push(new Point3D(0.1, -1.1, -2 ));
	this.points.push(new Point3D(0.1, -1.2, -2 ));
	this.points.push(new Point3D(0.1, -1.5, -2 ));
	this.points.push(new Point3D(0.0, -1.6, -2 ));
	this.points.push(new Point3D(-1.5, -1.6, -2 ));
	this.points.push(new Point3D(-2, -1.3, -2 ));
	this.points.push(new Point3D(-2.3, -1, -2 ));
	this.points.push(new Point3D(-1.4, -1, -2 ));
	this.points.push(new Point3D(-1.4, -.6, -2 ));
	this.points.push(new Point3D(-2, -.6, -2 ));
	this.points.push(new Point3D(-2, -.5, -2 ));
	this.points.push(new Point3D(-2.2, -.5, -2 ));
	this.points.push(new Point3D(-2.6, -.7, -2 ));
	this.points.push(new Point3D(-2.6, -.5, -2 ));
	this.points.push(new Point3D(-2.7, -.4, -2 ));
	this.points.push(new Point3D(-2.7, .4, -2 ));
	this.points.push(new Point3D(-2.6, .5, -2 ));
	this.points.push(new Point3D(-2.6, .7, -2 ));
	this.points.push(new Point3D(-2.2, .5, -2 ));
	this.points.push(new Point3D(-2, .5, -2 ));
	this.points.push(new Point3D(-2, .6, -2 ));
	this.points.push(new Point3D(-1.4, .6, -2 ));
	this.points.push(new Point3D(-1.4, 1, -2 ));
	this.points.push(new Point3D(-2.3, 1, -2 ));
	this.points.push(new Point3D(-2, 1.3, -2 ));
	this.points.push(new Point3D(-1.5, 1.6, -2 ));
	this.points.push(new Point3D(0.0, 1.6, -2 ));
	this.points.push(new Point3D(0.1, 1.5, -2 ));
	this.points.push(new Point3D(0.1, 1.2, -2 ));
	this.points.push(new Point3D(0.1, 1.1, -2 ));
	this.points.push(new Point3D(0, 1, -2 ));
	this.points.push(new Point3D(-1, 1, -2 ));
	this.points.push(new Point3D(-1, .6, -2 ));
	this.points.push(new Point3D(-.1, .6, -2 ));

	for(var i = 0; i <= this.points.length - 1 ; i++){
		this.pointsBase.push(new Point3D(this.points[i].x ,this.points[i].y,this.points[i].z));
	}
	//this.rotateBasePoints(90 * Math.PI/180); //start it looking to the right (at 0 degrees)
	this.centerShipForRotation(); // use this to center a ship if you made the points in some other program
	this.resizeBasePoints(30);
	
}
ship.prototype.centerShipForRotation = function(){
	//only for centering positive values
	var maxY = 0;
	var maxX = 0;
	var minY = 999;
	var minX = 999;
	for (var i = 0; i < this.points.length; i++){
		if ( this.pointsBase[i].x > maxX )
			maxX = this.pointsBase[i].x;
		if ( this.pointsBase[i].y > maxY )
			maxY = this.pointsBase[i].y;
		if ( this.pointsBase[i].y < minY )
			minY = this.pointsBase[i].y;
		if ( this.pointsBase[i].x < minX )
			minX = this.pointsBase[i].x;
	}

	for (var i = 0; i < this.points.length; i++){
		this.pointsBase[i].adjustXValueBy(-(minX+((maxX-minX)/2)));
		this.pointsBase[i].adjustYValueBy(-(minY+((maxY-minY)/2)));
	}
}
ship.prototype.resizeBasePoints = function(scaleResize){
	for (var i = 0; i < this.points.length; i++){
		this.points[i].resizePointsUniformly(scaleResize);
	}
}
ship.prototype.rotateBasePoints = function(rotation){
	for(var i = 0; i <= this.points.length - 1 ; i++){
		cx = this.pointsBase[i].x * Math.cos(rotation) - this.pointsBase[i].y * Math.sin(rotation) ;
		cy = this.pointsBase[i].x * Math.sin(rotation) + this.pointsBase[i].y * Math.cos(rotation) ;
		this.pointsBase[i].x = cx;
		this.pointsBase[i].y = cy;
	}
}
ship.prototype.rotatePoints = function (){
		
	for(var i = 0; i <= this.points.length - 1 ; i++){
		
		cx = this.pointsBase[i].x * Math.cos(this.directionRad) - this.pointsBase[i].y * Math.sin(this.directionRad) ;
		cy = this.pointsBase[i].x * Math.sin(this.directionRad) + this.pointsBase[i].y * Math.cos(this.directionRad) ;
		this.points[i].x = cx;
		this.points[i].y = cy;
	}
}

ship.prototype.rotateXAxies = function (){
	for(var i = 0; i <= this.pointsBase.length - 1 ; i++){
		xx = this.points[i].x;
		yy = this.points[i].y;
		zz = this.points[i].z;

		cx = xx;
		cy = yy * Math.cos(this.radX) - zz * Math.sin(this.radX);
		cz = yy * Math.sin(this.radX) + zz * Math.cos(this.radX);	

		this.points[i].x = cx;
		this.points[i].y = cy;
		this.points[i].z = cz;
	}
}
ship.prototype.rotateYAxies = function (){
	for(var i = 0; i <= this.pointsBase.length - 1 ; i++){
		xx = this.points[i].x;
		yy = this.points[i].y;
		zz = this.points[i].z;

		cx = xx * Math.cos(this.radY) + zz * Math.sin(this.radY);
		cy = yy;
		cz = xx * -Math.sin(this.radY) + zz * Math.cos(this.radY);

		this.points[i].x = cx;
		this.points[i].y = cy;
		this.points[i].z = cz;
	}
}
ship.prototype.rotateZAxies = function (){
	for(var i = 0; i <= this.pointsBase.length - 1 ; i++){
		xx = this.points[i].x;
		yy = this.points[i].y;
		zz = this.points[i].z;

		cx = xx * Math.cos(this.radZ) - yy * Math.sin(this.radZ);
		cy = xx * Math.sin(this.radZ) + yy * Math.cos(this.radZ);
		cz = zz;

		this.points[i].x = cx;
		this.points[i].y = cy;
		this.points[i].z = cz;
	}
}

ship.prototype.renderTest = function (){
	var ctx = myCanvas.getContext('2d');

	this.rotateXAxies();
	this.rotateYAxies();
	this.rotateZAxies();
		
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	
	ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y);
	
	for(var i = 1; i <= this.points.length - 1 ; i++){
		ctx.lineTo(this.x + this.points[i].x, this.y + this.points[i].y);
	}
	ctx.stroke();
}

ship.prototype.accelerate = function() {
	this.speed += 1;
	if ( this.speed >= TOP_SPEED ) {
		this.speed = TOP_SPEED;
	}
}

ship.prototype.deAccelerate = function() {
	this.speed -= 1;
	if ( this.speed <= 0 ) {
		this.speed = 0;
	}
}

ship.prototype.turnLeft = function() {
	this.turningLeft = true;
	this.rotZ -= this.turnSpeed;
	this.turnSpeed += 0.3;
	if ( this.turnSpeed >= TURN_SPEED ) {
		this.turnSpeed = TURN_SPEED;
	}
	if (this.rotZ <= 0 ){
		this.rotZ += 360;
	}
}

ship.prototype.turnRight = function() {
	this.turningRight = true;
	this.rotZ += this.turnSpeed;
	this.turnSpeed += 0.3;
	if ( this.turnSpeed >= TURN_SPEED ) {
		this.turnSpeed = TURN_SPEED;
	}
	if (this.rotZ >= 360 ){
		this.rotZ -= 360;
	}
}

ship.prototype.update = function() {
	this.directionRad = this.direction360 * Math.PI/180;
	if (keyS == true) {
		this.deAccelerate();
	}
	if (keyW == true) {
		this.accelerate();
	}
	if (keyA == true) {
		this.turnLeft();
	} else { this.turningLeft = false;}
	if (keyD == true) {
		this.turnRight();
	} else { this.turningRight = false;}
	//3d shiz

	//  G & J
	if (keyG == true) {
		this.radX = this.xRotateSpeed; //this.rotateX(this.xRotateSpeed);
	} else if (keyJ == true) {
		this.radX = -this.xRotateSpeed;

	} else {
		this.radX = 0;
	}

	//  Y & H
	if (keyY == true) {
		this.radY = this.yRotateSpeed;
	} else if (keyH == true) {
		this.radY = -this.yRotateSpeed;
	} else {
		this.radY = 0;
	}

	//  T & U
	if (keyT == true) {
		this.radZ = this.zRotateSpeed;
		this.directionRad += this.zRotateSpeed * 180/Math.PI;
	} else if (keyU == true) {
		this.radZ = -this.zRotateSpeed;
		this.directionRad -= this.zRotateSpeed * 180/Math.PI;
	} else {
		this.radZ =0;
	}
	this.shipScreenClipping();

	this.x += Math.cos(this.directionRad) * this.speed;
	this.y += Math.sin(this.directionRad) * this.speed;
	if ( this.turningRight == false && this.turningLeft == false ){
		this.turnSpeed = 0;
	}
}

ship.prototype.shipScreenClipping = function(){
	if (this.x > canvas.width){
		this.x -= canvas.width;
	}
	if (this.x < 0){
		this.x += canvas.width;
	}
	if (this.y > canvas.height){
		this.y -= canvas.height;
	}
	if (this.y < 0){
		this.y += canvas.height;
	}
}

ship.prototype.getX = function (){
	return this.x;
}

ship.prototype.getY = function (){
	return this.y;
}

function main(){
	myShip = new ship();
	var loopTimer = setInterval(gameLoop, 1000/FPS)
}

function gameLoop(){
	myShip.update();
	myShip.renderTest();
}

main();
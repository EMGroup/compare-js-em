/* Inputs */
function house(x,y) {
	this.houseX = x;
	this.houseY = y;

	/* Optional Inputs */
	this.floorHeight = 40;
	this.floors = 2;
	this.houseWidth = 200;
}

house.prototype.roofHeight = function() {
	return this.houseWidth * 0.5;
}

house.prototype.roof = function(roofY) {
	return Triangle(this.houseX,roofY,this.roofHeight(),
		this.houseWidth);
}

house.prototype.drawables = function() {
	/* Internals */
	let roofY = this.houseY + this.roofHeight();
	let blockHeight = this.floorHeight * this.floors;
	let houseBlock = Rectangle(this.houseX,roofY,
		this.houseWidth,blockHeight);

	/* Output */
	return [houseBlock, this.roof(roofY)];
}

/* Usage */
/* Case 1*/
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

/* Case 2*/
myhouse_inst = new house(100,100);
myhouse_inst.floors = 4;
myhouse = myhouse_inst.drawables();

/* Case 3*/
myhouse_inst = new house(100,100);
myhouse_inst.roofHeight = function() { return 10; };
myhouse = myhouse_inst.drawables();

/* Case 4*/
myhouse_inst = new house(100,100);
myhouse_inst.roof = function(roofY) {
	return Triangle(this.houseX-50,roofY,this.roofHeight(),
		this.houseWidth+100);
}
myhouse = myhouse_inst.drawables();

/* Case 5*/
house.prototype.roof = function(roofY) {
	return Triangle(this.houseX-50,roofY,this.roofHeight(),
		this.houseWidth+100);
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

## Program 3 - Refactor All Locals

house = function (x,y) {
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

house.prototype.roof = function() {
	return Triangle(this.houseX,this.roofY(),this.roofHeight(),
		this.houseWidth);
}

# Move all remaining locals in `drawables` to functions.

house.prototype.roofY = function() {
	return this.houseY + this.roofHeight();
}

house.prototype.blockHeight = function() {
	return this.floorHeight * this.floors;
}

house.prototype.houseBlock = function() {
	return Rectangle(this.houseX,this.roofY(),
		this.houseWidth,this.blockHeight());
}

house.prototype.drawables = function() {
	return [this.houseBlock(), this.roof()];
}

### Use and Reuse
#### Case 1
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

#### Case 2
myhouse_inst = new house(100,100);
myhouse_inst.floors = 4;
myhouse = myhouse_inst.drawables();

#### Case 3
myhouse_inst = new house(100,100);
myhouse_inst.roofHeight = function() { return 10; };
myhouse = myhouse_inst.drawables();

#### Case 4
myhouse_inst = new house(100,100);
myhouse_inst.roof = function(roofY) {
	return Triangle(this.houseX-50,roofY,this.roofHeight(),
		this.houseWidth+100);
}
myhouse = myhouse_inst.drawables();

#### Case 5
house.prototype.roof = function(roofY) {
	return Triangle(this.houseX-50,roofY,this.roofHeight(),
		this.houseWidth+100);
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

#### Case 6
# Possible but potentially unsafe if values are changed in the wrong order

myhouse_inst = new house(100,100);
myhouse_inst.floors = Math.ceil(
	myhouse_inst.houseWidth / myhouse_inst.floorHeight);
myhouse = myhouse_inst.drawables();

#### Case 7
# Not Possible without rewriting drawables



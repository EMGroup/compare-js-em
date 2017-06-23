## Program 2 - OO Refactor Roof

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

# Move `roof` to a separate function instead of being a hidden local

house.prototype.roof = function(roofY) {
	return Triangle(this.houseX,roofY,this.roofHeight(),
		this.houseWidth);
}

house.prototype.drawables = function() {
	let roofY = this.houseY + this.roofHeight();
	let blockHeight = this.floorHeight * this.floors;
	let houseBlock = Rectangle(this.houseX,roofY,
		this.houseWidth,blockHeight);

	return [houseBlock, this.roof(roofY)];
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



## Program 4 - Refactor Floors Member

function house(x,y) {
	this.houseX = x;
	this.houseY = y;
	/* Optional Inputs */
	this.floorHeight = 40;
	this.houseWidth = 200;
}

# Change floors member variable to a function

house.prototype.floors = function() {
	return 2;
}

house.prototype.roofHeight = function() {
	return this.houseWidth * 0.5;
}

house.prototype.roof = function() {
	return Triangle(this.houseX,this.roofY(),this.roofHeight(),
		this.houseWidth);
}

house.prototype.roofY = function() {
	return this.houseY + this.roofHeight();
}

house.prototype.blockHeight = function() {
	return this.floorHeight * this.floors();
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
myhouse_inst.floors = function() { return 4; };
myhouse = myhouse_inst.drawables();

#### Case 3
myhouse_inst = new house(100,100);
myhouse_inst.roofHeight = function() { return 10; };
myhouse = myhouse_inst.drawables();

#### Case 4
myhouse_inst = new house(100,100);
myhouse_inst.roof = function() {
	return Triangle(this.houseX-50,this.roofY(),this.roofHeight(),
		this.houseWidth+100);
}
myhouse = myhouse_inst.drawables();

#### Case 5
house.prototype.roof = function() {
	return Triangle(this.houseX-50,this.roofY(),this.roofHeight(),
		this.houseWidth+100);
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

#### Case 6
house.prototype.floors = function() {
	return Math.ceil(this.houseWidth / this.floorHeight);
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables();

#### Case 7
# Not Possible, needs dependency injection


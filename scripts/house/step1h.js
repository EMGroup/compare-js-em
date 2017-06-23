/* Inputs */
function house(x,y) {
	this.houseX = x;
	this.houseY = y;
}

house.prototype.floorHeight = function() {
	return 40;
}

house.prototype.houseWidth = function() {
	return 200;
}

house.prototype.floors = function() {
	return 2;
}

house.prototype.roofHeight = function() {
	return this.houseWidth() * 0.5;
}

house.prototype.roof = function(Triangle) {
	return Triangle(this.houseX,this.roofY(),this.roofHeight(),
		this.houseWidth());
}

house.prototype.roofY = function() {
	return this.houseY + this.roofHeight();
}

house.prototype.blockHeight = function() {
	return this.floorHeight() * this.floors();
}

house.prototype.houseBlock = function(Rectangle) {
	return Rectangle(this.houseX,this.roofY(),
		this.houseWidth(),this.blockHeight());
}

house.prototype.drawables = function(Rectangle,Triangle) {
	return [this.houseBlock(Rectangle), this.roof(Triangle)];
}

/* Usage */
/* Case 1*/
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 2*/
myhouse_inst = new house(100,100);
myhouse_inst.floors = function() { return 4; };
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 3*/
myhouse_inst = new house(100,100);
myhouse_inst.roofHeight = function() { return 10; };
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 4*/
myhouse_inst = new house(100,100);
myhouse_inst.roof = function(Triangle) {
	return Triangle(this.houseX-50,this.roofY(),this.roofHeight(),
		this.houseWidth()+100);
}
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 5*/
house.prototype.roof = function(Triangle) {
	return Triangle(this.houseX-50,this.roofY(),this.roofHeight(),
		this.houseWidth()+100);
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 6*/
house.prototype.floors = function() {
	return Math.ceil(this.houseWidth() / this.floorHeight());
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 7*/
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,OutlineTriangle);

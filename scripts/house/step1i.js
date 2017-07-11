/* Inputs */
house = function (x,y) {
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

house.prototype.drawables = function(Rectangle,Triangle) {
	return [Rectangle(this.houseX,this.houseY + this.roofHeight(),
		this.houseWidth(),this.floorHeight() * this.floors()),
		Triangle(this.houseX,this.houseY + this.roofHeight(),this.roofHeight(),
		this.houseWidth())];
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
/* Not possible */

/* Case 5*/
/* Not possible */

/* Case 6*/
house.prototype.floors = function() {
	return Math.ceil(this.houseWidth() / this.floorHeight());
}
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,Triangle);

/* Case 7*/
myhouse_inst = new house(100,100);
myhouse = myhouse_inst.drawables(Rectangle,OutlineTriangle);


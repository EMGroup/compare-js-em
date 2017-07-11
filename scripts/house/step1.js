## Program 1 - Single Function

house = function (houseX, houseY, options) {
	if (!options) options={};
	let floorHeight = options.floorHeight||40;
	let floors = options.floors||2;
	let houseWidth = options.houseWidth||200;
	let roofHeight = options.roofHeight||houseWidth * 0.5;

	let roofY = houseY + roofHeight;
	let roof = Triangle(houseX,houseY,houseWidth,roofHeight);
	let blockHeight = floorHeight * floors;
	let houseBlock = Rectangle(houseX,rootY,houseWidth,blockHeight);

	return [houseBlock, roof];
}

### Use and Reuse
#### Case 1
myhouse = house(100,100);

#### Case 2
myhouse = house(100,100, {floors: 4});

#### Case 3
myhouse = house(100,100, {roofHeight: 10});

#### Case 4
# Not possible without complete rewrite

#### Case 5
# Not possible without complete rewrite

#### Case 6
# Not possible without complete rewrite

#### Case 7
# Not possible without complete rewrite


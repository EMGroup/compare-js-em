## Program 1 - Single Function

function house(houseX, houseY, options) {
	if (!options) options={};
	let floorHeight = options.floorHeight||40;
	let floors = options.floors||2;
	let houseWidth = options.houseWidth||200;
	let roofHeight = options.roofHeight||houseWidth * 0.5;

	let roofY = houseY + roofHeight;
	let roof = Triangle(houseX,roofY,roofHeight,houseWidth);
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
# Not possible


#### Case 5
# Not possible


#### Case 6
# Not possible


#### Case 7
# Not possible


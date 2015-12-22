var _ = require('underscore');
const EMPTY_SPACE = 'EMPTY_SPACE', 
      HORIZONTAL_SPACE = 'HORIZONTAL_SPACE', 
      VERTICAL_SPACE = 'VERTICAL_SPACE';


class Crossword {
	
	constructor(size){
		this.size = size;
		this.horizontalEntries = [];
		this.verticalEntries = [];
	}

	setHorizontalEntries(entryList){
		this.horizontalEntries = entryList;
	}

	setVertialEntries(entryList){
		this.verticalEntries = entryList;
	}

	getHorizontalEntries(){
		return this.horizontalEntries;
	}

	getVerticalEntries(){
		return this.verticalEntries;
	}


	printCrossword(){
		let map = new ReferenceMap(size);
		

	}

}


class ReferenceMap {

	constructor(size){
		this.size = size;
		this.map = [];
		initialise();	
	}

	initialise(){
		for (var i  = 0; i < this.size; i ++){
			let row = [];
			for (var j = 0; j < this.size; j ++){
				row.push(new SpaceReference(EMPTY_SPACE, -1, -1));
			}
			this.map.push(row);
		}
	}

	getReference(x, y){
		this.map[x][y];
	}

	addEntry(entry, entryIndex){
		var entryType = entry.getType();
		_.each(entry, function(space, spaceIndex){
			let position = space.getPosition();
			let spaceReference = this.getReference(position[0], position[1]);
			spaceReference.setIndexes(entryIndex, spaceIndex);
			spaceReference.setType(entryType);
		})
	}
}

class SpaceReference {

	constructor(type, entryIndex, spaceIndex){
		this.type = type;
		this.entryIndex = entryIndex;
		this.spaceIndex = spaceIndex;
	}

	setIndexes(entryInex, spaceIndex){
		this.entryIndex = entryIndex;
		this.spaceIndex = spaceIndex;
	}

	setType(type){
		this.type = type;
	}

	getSpaceAnswer(HorizontalEntries, VerticalEntries){
		let spaceIndex = this.spaceIndex;
		let entryIndex = this.entryIndex;
		if(type == HORIZONTAL_SPACE){
			return HorizontalEntries[entryIndex][spaceIndex].getAnswer();
		} else if (type == VERTICAL_SPACE){
			return VerticalEntries[entryIndex][spaceIndex].getAnswer();
		} else {
			return '*'
		}
	}

}

class Entry {

	constructor(size, type){
		this.size = size;
		this.type = type;
		this.spaces = []
	}

	getType(){
		return this.type;
	}

	setSpaces(spaceList){
		if(spaceList.length == this.size){
			this.spaces = spaceList;
		} else {
			throw new Error('spaceList does not have the right length');
		}
	}

	getSpaces(){
		return this.spaces;
	}

	isCorrect(){
		let spaces = this.getSpaces();
		if(spaces.length > 0){
			return _.every(spaces, v => v.isCorrect());
		} else {
			return false;
		}
	}

}

class Space {

	constructor(answer, position){
		this.answer = answer;
		this.value = '';
		this.x = x;
		this.y = y;
	}

	isCorrect(){
		return this.getValue() === this.getAnswer();
	}

	getValue(){
		return this.value;
	}

	getAnswer(){
		return this.answer;
	}

	getPosition(){
		return (this.x, this.y);
	}

	setValue(value){
		this.value = value;
	}

}
"use strict";

var _ = require('underscore');
const EMPTY_SPACE = 'EMPTY_SPACE', 
      HORIZONTAL_SPACE = 'HORIZONTAL_SPACE', 
      VERTICAL_SPACE = 'VERTICAL_SPACE';




class Crossword {
	
	constructor(size){
		this.size = size;
		this.horizontalEntries = [];
		this.verticalEntries = [];
		this.map = new ReferenceMap(size);
	}

	setHorizontalEntries(entryList){
		this.horizontalEntries = entryList;
		let map = this.map;
		_.each(entryList, function(entry, entryIndex){
			map.addEntry(entry, entryIndex);
		})
	}

	setVerticalEntries(entryList){
		this.verticalEntries = entryList;
		let map = this.map;
		_.each(entryList, function(entry, entryIndex){
			map.addEntry(entry, entryIndex);
		})
	}

	getHorizontalEntries(){
		return this.horizontalEntries;
	}

	getVerticalEntries(){
		return this.verticalEntries;
	}


	printCrossword(){

		for (var i = 0; i <= this.size; i++){
			let rowString = '';
			for(var j = 0; j <= this.size; j++){
				let spaceRef = this.map.getReference(i, j);
				let space = spaceRef.getSpace(this.getHorizontalEntries(), this.getVerticalEntries());
				let content = "*"
				if(!_.isNull(space)){
					content = space.getAnswer();
				}
				rowString = rowString + content + ' ';
				
			}
			console.log(rowString);
		}
	}

}


class ReferenceMap {

	constructor(size){
		this.size = size;
		this.map = [];
		this.initialise();	
	}

	initialise(){
		for (var i  = 0; i <= this.size; i ++){
			let row = [];
			for (var j = 0; j <= this.size; j ++){
				row.push(new SpaceReference(EMPTY_SPACE, -1, -1));
			}
			this.map.push(row);
		}
	}

	getReference(x, y){
		return this.map[x][y];
	}

	addEntry(entry, entryIndex){
		var entryType = entry.getType();
		let self = this;
		_.each(entry.getSpaces(), function(space, spaceIndex){

			let position = space.getPosition();
			let spaceReference = self.getReference(position[0], position[1]);
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

	setIndexes(entryIndex, spaceIndex){
		this.entryIndex = entryIndex;
		this.spaceIndex = spaceIndex;
	}

	setType(type){
		this.type = type;
	}

	getSpace(horizontalEntries, verticalEntries){

		let spaceIndex = this.spaceIndex;
		let entryIndex = this.entryIndex;
		if(this.type == HORIZONTAL_SPACE){
			return horizontalEntries[entryIndex].getSpace(spaceIndex);
		} else if (this.type == VERTICAL_SPACE){
			return verticalEntries[entryIndex].getSpace(spaceIndex);
		} else {
			return null;
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

	getSpace(index){
		return this.spaces[index];
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
		this.x = position[0];
		this.y = position[1];
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
		return [this.x, this.y];
	}

	setValue(value){
		this.value = value;
	}

}

var crossword = new Crossword(2);

var aa = new Space('A', [0, 0]);
var ab = new Space('B', [0, 1]);
var bb = new Space('C', [1, 1]);
var cb = new Space('D', [2, 1]);

var entryOne = new Entry(2, HORIZONTAL_SPACE);
var entryTwo = new Entry(2, VERTICAL_SPACE);
entryOne.setSpaces([aa, ab]);
entryTwo.setSpaces([bb, cb]);

crossword.setVerticalEntries([entryTwo]);
crossword.setHorizontalEntries([entryOne]);

crossword.printCrossword();

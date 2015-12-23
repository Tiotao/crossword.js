"use strict";

var _ = require('underscore');
const EMPTY_SPACE = ['*', '*'],
      HORIZONTAL_ENTRY = 0, 
      VERTICAL_ENTRY = 1;

class Crossword {
	
	constructor(size){
		this.size = size;
		this.horizontalEntries = [];
		this.verticalEntries = [];
		this.map = new WordMap(size);
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

	isEntryCorrect(type, entryIndex){
		let entry;
		if(type == HORIZONTAL_ENTRY){
			entry = this.horizontalEntries[entryIndex];
		} else {
			entry = this.verticalEntries[entryIndex];
		}
		let map = this.map;
		let spaceRefs = entry.getSpaceRefs();
		return _.every(spaceRefs, v => map.getSpace(v.getPosition()).isCorrect());
	}

	fillSpace(position, value){
		this.map.getSpace(position).setValue(value);
		console.log(this.map.getSpace(position))
	}

	printCrossword(){
		for (var i = 0; i <= this.size; i++){
			let rowString = '';
			for(var j = 0; j <= this.size; j++){
				let space = this.map.getSpace([i, j]);
				let content = "*";
				if(!space.isEmptySpace()){
					content = space.getAnswer();
				}
				rowString = rowString + content + ' ';
			}
			console.log(rowString);
		}


		for (var i = 0; i <= this.size; i++){
			let rowString = '';
			for(var j = 0; j <= this.size; j++){
				let space = this.map.getSpace([i, j]);
				let content = " * ";
				if(!space.isEmptySpace()){
					content = space.getEntryIndexes()[0] + '/' + space.getEntryIndexes()[1];
				}
				rowString = rowString + content + ' ';
			}
			console.log(rowString);
		}

	}

}


class WordMap {

	constructor(size){
		this.size = size;
		this.map = [];
		this.initialise();	
	}

	initialise(){
		for (var i  = 0; i <= this.size; i ++){
			let row = [];
			for (var j = 0; j <= this.size; j ++){
				row.push(new Space(['*', '*'], [i, j]));
			}
			this.map.push(row);
		}
	}

	getSpace(position){
		return this.map[position[0]][position[1]];
	}

	addEntry(entry, entryIndex){
		var entryType = entry.getType();
		let self = this;

		_.each(entry.getSpaceRefs(), function(spaceRef, spaceIndex){

			let position = spaceRef.getPosition();
			let space = self.getSpace(position);

			space.setAnswer(entry.getAnswer()[spaceIndex]);


			// console.log([entryType, entryIndex])
			space.setEntryIndexes(entryType, entryIndex);

			// console.log(space)
		})
		// console.log(self.map[1])
	}

}

class SpaceReference {

	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	getPosition(){
		return [this.x, this.y];
	}

	getSpace(spaceCollection, x, y){
		return spaceCollection[x][y];
	}

}

class Entry {

	constructor(type, answer){
		this.size = answer.length;
		this.type = type;
		this.spaceRefs = []
		// same length as size
		this.answer = answer;
	}

	getType(){
		return this.type;
	}

	getAnswer(){
		return this.answer;
	}

	setSpaceRefs(spaceRefList){
		if(spaceRefList.length == this.size){
			this.spaceRefs = spaceRefList;
		} else {
			throw new Error('spaceList does not have the right length');
		}
	}

	getSpaceRefs(){
		return this.spaceRefs;
	}

	getSpaceRef(index){
		return this.spaces[index];
	}

}

class Space {

	constructor(entryIndexes, position){
		this.answer = '*';
		this.value = '';
		this.entryIndexes = entryIndexes;
		this.x = position[0];
		this.y = position[1];
	}

	setEntryIndexes(entryType, entryIndex){
		this.entryIndexes[entryType] = entryIndex;
	}

	getEntryIndexes(entryIndexes){
		return this.entryIndexes;
	}

	isCorrect(){
		return this.value == this.answer;
	}

	isEmptySpace(){
		return this.entryIndexe == EMPTY_SPACE;
	}

	getValue(){
		return this.value;
	}

	getAnswer(){
		return this.answer;
	}

	setAnswer(answer){
		this.answer = answer;
	}

	getPosition(){
		return [this.x, this.y];
	}

	setValue(value){
		this.value = value;
	}

}

// testing

var crossword = new Crossword(2);

var aa = new SpaceReference(0, 0);
var ab = new SpaceReference(0, 1);
var bb = new SpaceReference(1, 1);
var cb = new SpaceReference(2, 1);
var ca = new SpaceReference(2, 0);
var cc = new SpaceReference(2, 2);

var entryOne = new Entry(HORIZONTAL_ENTRY, 'AB');
var entryTwo = new Entry(VERTICAL_ENTRY, 'BCD');
var entryThree = new Entry(HORIZONTAL_ENTRY, 'FDA')

entryOne.setSpaceRefs([aa, ab]);
entryTwo.setSpaceRefs([ab, bb, cb]);
entryThree.setSpaceRefs([ca, cb, cc]);

crossword.setVerticalEntries([entryTwo]);
crossword.setHorizontalEntries([entryOne, entryThree]);

crossword.printCrossword();

crossword.fillSpace([0, 0], 'A');
crossword.fillSpace([0, 1], 'B');

console.log(crossword.isEntryCorrect(HORIZONTAL_ENTRY, 0))
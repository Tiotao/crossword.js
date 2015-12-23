# crossword.js
simple crossword game written in ES6

### Usage

```
// create a crossword instance with size 3
var crossword = new Crossword(2);

// define spaces that are going to carry letters
var aa = new SpaceReference(0, 0);
var ab = new SpaceReference(0, 1);
var bb = new SpaceReference(1, 1);
var cb = new SpaceReference(2, 1);
var ca = new SpaceReference(2, 0);
var cc = new SpaceReference(2, 2);

// create vertical and horizontal entries and define its answer
var entryOne = new Entry(HORIZONTAL_ENTRY, 'AB');
var entryTwo = new Entry(VERTICAL_ENTRY, 'BCD');
var entryThree = new Entry(HORIZONTAL_ENTRY, 'FDA')

// associate spaces with entries
entryOne.setSpaceRefs([aa, ab]);
entryTwo.setSpaceRefs([ab, bb, cb]);
entryThree.setSpaceRefs([ca, cb, cc]);

// associate entries with crossword instance
crossword.setVerticalEntries([entryTwo]);
crossword.setHorizontalEntries([entryOne, entryThree]);

// print crossword for preview
crossword.printCrossword();

// fill a space with a value
crossword.fillSpace([0, 0], 'A');
crossword.fillSpace([0, 1], 'B');

// check if an entry is correctly filled up
console.log(crossword.isEntryCorrect(HORIZONTAL_ENTRY, 0))

```
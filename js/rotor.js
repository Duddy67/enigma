CRotor = (function () {

    const _letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const _stator = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
    const _wheel_1 = ['L','P','G','S','Z','M','H','A','E','O','Q','K','V','X','R','F','Y','B','U','T','N','I','C','J','D','W'];
    const _wheel_2 = ['S','L','V','G','B','T','F','X','J','Q','O','H','E','W','I','R','Z','Y','A','M','K','P','C','N','D','U'];
    const _wheel_3 = ['C','J','G','D','P','S','H','K','T','U','R','A','W','Z','X','F','M','Y','N','Q','O','B','V','L','I','E'];
    const _reflector = ['I','M','E','T','C','G','F','R','A','Y','S','Q','B','Z','X','W','L','H','K','D','V','U','P','O','J','N'];


    var Rotor = function () {

        this._left = null;
        this._right = null;
        this._position = 0;

        this._createWheel();

    };

    // Methods
    Rotor.prototype = {

        _createWheel: function () {
	    this._left = [];
	    this._right = [];
	    let right = [];

	    _letters.forEach((letter, i) => {
	        let pos = i + 1;
	        
	        this._right.push(pos);
	        let w_letter = _wheel_1[i];

	        for (let j = 0; j < _letters.length; j++){
		    let p = j + 1;
		    if (_letters[j] == w_letter) {
			this._left.push(p);
		    }
		}
	    });
	},

        forward: function () {
	    this._position = this._position == 25 ? 0 : this._position++;
	},

        back: function () {
	    this._position = this._position == 0 ? 25 : this._position--;
	},

        _slideLetters: function (letter, position) {

	    let letters = [];
	    let currentPosition = position - 1;
	    // The initial position of the given letter.
	    let initialPosition = _letters.indexOf(letter);
	    // Compute the initial start position by taking into account the offset due to the current position.
	    let initialStartPosition = currentPosition - initialPosition;
	    // The start position for the previous letters (if any).
	    let previous = currentPosition < initialPosition ? initialPosition - currentPosition : 0;
	    let newStart = 0;
	    // The initial position of the first letter that "went out of" the array due to the current position.
	    let shift = _letters.length - (currentPosition - initialPosition);
console.log('currentPosition: '+currentPosition+' initialPosition:'+initialPosition+' initialStartPosition: '+initialStartPosition+' shift: '+shift);

	    // The letter is at its initial position.
	    if (initialPosition + 1 == position) {
	        // No need to modify the letter string.
		return _letters;
	    }

	    for (let i = 0; i < _letters.length; i++) {

	        // Store the letters from the current position to the last initial position.
	        if (i >= currentPosition && _letters[initialPosition] !== undefined) {
		    letters.push(_letters[initialPosition]);
		    initialPosition++;
		}
	        // The last initial position has been reached. 
	        // Start over from the zero position.
	        else if (_letters[initialPosition] === undefined) {
		    letters.push(_letters[newStart]);
		    newStart++;
		}
	        // Store the letters preceding the given letter (if any).
	        else if (i < currentPosition && i >= initialStartPosition) {
		    letters.push(_letters[previous]);
		    previous++;
		}
	        // Store (at the beginning of the array) the remaining letters which have exceeded the last initial position.  
	        else {
		    letters.push(_letters[shift]);
		    shift++;
		}
	    }

	    return letters;
	},

        getOutput: function (letter) {
	    let rgtWiring = this._right[this._position];
	    let lftWiring = this._left[this._position];

	    /*if (start == end) {
	        return letter;
	    }*/

	    let letters = this._slideLetters(letter, rgtWiring);

	    return letters[lftWiring - 1];

	}
    };

    return {
        init: Rotor
    };

})();

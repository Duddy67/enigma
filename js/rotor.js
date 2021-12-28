CRotor = (function () {

    const _alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const _stator = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
    const _offset_1 = ['L','P','G','S','Z','M','H','A','E','O','Q','K','V','X','R','F','Y','B','U','T','N','I','C','J','D','W'];
    const _offset_2 = ['S','L','V','G','B','T','F','X','J','Q','O','H','E','W','I','R','Z','Y','A','M','K','P','C','N','D','U'];
    const _offset_3 = ['C','J','G','D','P','S','H','K','T','U','R','A','W','Z','X','F','M','Y','N','Q','O','B','V','L','I','E'];
    const _reflector = ['I','M','E','T','C','G','F','R','A','Y','S','Q','B','Z','X','W','L','H','K','D','V','U','P','O','J','N'];
    const _offsets = {_offset_1, _offset_2, _offset_3};


    const Rotor = function (id) {

        this._id = id;
        this._pins = null;
        this._contacts = null;
        this._position = 0;
        this._notch = null;

        this._createRotor();
        this._createInternalWiring();

    };

    // Methods
    Rotor.prototype = {

        _createRotor: function () {
	    let rotorContainer = document.createElement('div');
	    rotorContainer.setAttribute('id', 'rotorContainer_'+this._id);
	    rotorContainer.setAttribute('class', 'rotorContainer');
	    document.getElementById('enigma').appendChild(rotorContainer);

	    let positionNumber = document.createElement('div');
	    positionNumber.setAttribute('id', 'positionNumber_'+this._id);
	    positionNumber.setAttribute('class', 'positionNumber');
	    positionNumber.textContent = '01';

	    let wheel = document.createElement('div');
	    wheel.setAttribute('class', 'wheel');

	    document.getElementById('rotorContainer_'+this._id).appendChild(positionNumber);
	    document.getElementById('rotorContainer_'+this._id).appendChild(wheel);
	    document.getElementById('rotors').appendChild(rotorContainer);
	},

        _createInternalWiring: function () {
	    // The connections on each side of the rotor.
	    this._pins = [];
	    this._contacts = [];
console.log(_offsets['_offset_'+this._id]);
	    // Loop through the alphabet letters.
	    _alphabet.forEach((letter, i) => {
	        // Set the pin position for each letter.
	        let pinPosition = i + 1;
	        this._pins.push(pinPosition);

	        // Get the letter set to the same position in the offset.
	        let offsetLetter = _offset_1[i];

	        // Loop again to match the alphabet position to the offset position.
	        for (let j = 0; j < _alphabet.length; j++){
		    let contactPosition = j + 1;

		    if (_alphabet[j] == offsetLetter) {
			this._contacts.push(contactPosition);
		    }
		}
	    });
	},

        forward: function () {
	    this._position = this._position == 25 ? 0 : this._position + 1;

	    let position = document.getElementById('positionNumber_'+this._id);
	    position.textContent = this._pins[this._position] < 10 ? '0'+this._pins[this._position] : this._pins[this._position];
	},

        back: function () {
	    this._position = this._position == 0 ? 25 : this._position - 1;

	    let position = document.getElementById('positionNumber_'+this._id);
	    position.textContent = this._pins[this._position] < 10 ? '0'+this._pins[this._position] : this._pins[this._position];
	},

        _setLetterString: function (letterString, letter, position) {

	    let letters = [];
	    let currentPosition = position - 1;
	    // The initial position of the given letter.
	    let initialPosition = letterString.indexOf(letter);
	    // Compute the initial start position by taking into account the offset due to the current position.
	    let initialStartPosition = currentPosition - initialPosition;
	    // The start position for the previous letters (if any).
	    let previous = currentPosition < initialPosition ? initialPosition - currentPosition : 0;
	    let startOver = 0;
	    // The initial position of the first letter that "went out of" the array due to the current position.
	    let shift = letterString.length - (currentPosition - initialPosition);
//console.log('currentPosition: '+currentPosition+' initialPosition:'+initialPosition+' initialStartPosition: '+initialStartPosition+' shift: '+shift);

	    // The letter is at its initial position.
	    if (initialPosition + 1 == position) {
	        // No need to modify the letter string.
		return letterString;
	    }

	    for (let i = 0; i < letterString.length; i++) {
	        // Store the letters from the current position to the last initial position.
	        if (i >= currentPosition && letterString[initialPosition] !== undefined) {
		    letters.push(letterString[initialPosition]);
		    initialPosition++;
		}
	        // The last initial position has been reached. 
	        // Start over from the zero position.
	        else if (letterString[initialPosition] === undefined) {
		    letters.push(letterString[startOver]);
		    startOver++;
		}
	        // Store the letters preceding the given letter (if any).
	        else if (i < currentPosition && i >= initialStartPosition) {
		    letters.push(letterString[previous]);
		    previous++;
		}
	        // Store (at the beginning of the array) the remaining letters which have exceeded the last initial position.  
	        else {
		    letters.push(letterString[shift]);
		    shift++;
		}
	    }

	    return letters;
	},

        getOutput: function (letter) {
	    let pin = this._pins[this._position];
	    let contact = this._contacts[this._position];

	    // No offset, so the letter doesn't change.
	    if (pin == contact) {
	        return letter;
	    }

	    let letters = this._setLetterString(_alphabet, letter, pin);

	    return letters[contact - 1];

	}
    };

    return {
        init: Rotor
    };

})();

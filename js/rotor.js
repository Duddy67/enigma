CRotor = (function () {
    // The regular letter sequence. The number for each letter is equal to the array index A -> 0, B -> 1 etc...
    const _alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    // The offsets used to create the wiring of the 3 rotors. Ex first offset: 0 (A) -> 4 (E), 1 (B) -> 10 (K) etc...
    const _offset_1 = ['E','K','M','F','L','G','D','Q','V','Z','N','T','O','W','Y','H','X','U','S','P','A','I','B','R','C','J'];
    const _offset_2 = ['A','J','D','K','S','I','R','U','X','B','L','H','W','T','M','C','Q','G','Z','N','P','Y','F','V','O','E'];
    const _offset_3 = ['B','D','F','H','J','L','C','P','R','T','X','V','Z','N','Y','E','I','W','G','A','K','M','U','S','Q','O'];
    const _offsets = {_offset_1, _offset_2, _offset_3};
    // The notch positions for each rotor.
    const _notch_1 = 'Y';
    const _notch_2 = 'M';
    const _notch_3 = 'D';
    const _notches = {_notch_1, _notch_2, _notch_3};


    const Rotor = function (id) {
        // Initialize parameters.
        this._id = id;
        this._position = 0;
        this._notch = _alphabet.indexOf(_notches['_notch_'+id]);
        this._wiring = [];
        this._step = 0;
        this._turns = 0;

        // Create the rotor.
        this._createWiring();
        this._createRotor();
    };

    // Methods
    Rotor.prototype = {

        /*
	 * Builds the HTML code for the rotor.
	 *
	 * @return  void
	 */ 
        _createRotor: function () {
	    let rotorContainer = document.createElement('div');
	    rotorContainer.setAttribute('id', 'rotorContainer_'+this._id);
	    rotorContainer.setAttribute('class', 'rotorContainer');
	    document.getElementById('enigma').appendChild(rotorContainer);

	    let positionNumber = document.createElement('div');
	    positionNumber.setAttribute('id', 'positionNumber_'+this._id);
	    positionNumber.setAttribute('class', 'positionNumber');
	    positionNumber.textContent = '01';

	    let forwardBtn = document.createElement('button');
	    forwardBtn.setAttribute('data-rotor', this._id);
	    forwardBtn.setAttribute('class', 'forwardButton');
	    forwardBtn.textContent = 'F';

	    let backBtn = document.createElement('button');
	    backBtn.setAttribute('data-rotor', this._id);
	    backBtn.setAttribute('class', 'backButton');
	    backBtn.textContent = 'B';

	    let wheel = document.createElement('div');
	    wheel.setAttribute('class', 'wheel');

	    document.getElementById('rotorContainer_'+this._id).appendChild(forwardBtn);
	    document.getElementById('rotorContainer_'+this._id).appendChild(positionNumber);
	    document.getElementById('rotorContainer_'+this._id).appendChild(backBtn);
	    document.getElementById('rotorContainer_'+this._id).appendChild(wheel);
	    document.getElementById('rotors').appendChild(rotorContainer);
	},

        /*
	 * Sets the connections between the 26 contacts of the rotor.
	 *
	 * @return  void
	 */ 
        _createWiring: function () {
	    // Get the offset matching the rotor id.
	    let offset = _offsets['_offset_'+this._id];

	    // Loop through the regular letter sequence (which correspond to the array indexes: 0,1,2...).
	    _alphabet.forEach((letter, i) => {
		// Get the index of the corresponding letter in the offset array.  
	        let id = _alphabet.indexOf(offset[i]); 
		this._wiring.push(id);
	    });
	},

        /*
	 * Increments the rotor step and position.
	 *
	 * @return  void
	 */ 
        stepForward: function () {
	    // Update the _turns and _step values.
	    this._turns = this._step == 25 ? this._turns + 1 : this._turns;
	    this._step = this._step > 25 ? 0 : this._step + 1;
	    this.forward();
	},

        /*
	 * Increments the rotor position.
	 *
	 * @return  void
	 */ 
        forward: function () {
	    // Reset the position to zero in case the current position is at the end of the array. 
	    // Increment by one step otherwise.
	    this._position = this._position == 25 ? 0 : this._position + 1;
	    // Same thing for the rotor's notch.
	    this._notch = this._notch == 25 ? 0 : this._notch + 1;
	    // Refresh the position number.
            let newPos = this._position + 1;
	    let position = document.getElementById('positionNumber_'+this._id);
	    position.textContent = newPos < 10 ? '0'+newPos : newPos;
	},

        /*
	 * Decrements the rotor position.
	 *
	 * @return  void
	 */ 
        backward: function () {
	    // Reset the position to the end of the array in case the current position is at the beginning. 
	    // Decrement by one step otherwise.
	    this._position = this._position == 0 ? 25 : this._position - 1;
	    // Same thing for the rotor's notch.
	    this._notch = this._notch == 0 ? 25 : this._notch - 1;
	    // Refresh the position number.
            let newPos = this._position + 1;
	    let position = document.getElementById('positionNumber_'+this._id);
	    position.textContent = newPos < 10 ? '0'+newPos : newPos;
	},

        /*
	 * Returns the corresponding letter number according to the right rotor position.
	 * The wiring direction is from right to left (ie: before the reflector).
	 *
	 * @param integer letterNb      The input letter number.
	 * @param integer rgtRotorPos   The right rotor position.
	 * 
	 * @return integer  The output letter number.
	 */
        getLeftOutput: function (letterNb, rgtRotorPos) {
	    // Compute the offset against the right rotor position.
	    let offset = rgtRotorPos == 0 ? this._position : this._position - rgtRotorPos;

	    // Get the letter number to use once the offset is taken into account.
	    letterNb = this._getOutput(letterNb, offset);

	    // Return the letter number corresponding to the left wiring (ie: the indexed value).
	    return this._wiring[letterNb];
	},

        /*
	 * Returns the corresponding letter number according to the right rotor position.
	 * The wiring direction is from left to right (ie: after the reflector).
	 *
	 * @param integer letterNb      The input letter number.
	 * @param integer rgtRotorPos   The right rotor position.
	 * 
	 * @return integer  The output letter number.
	 */
        getRightOutput: function (letterNb, rgtRotorPos) {
	    // Compute the offset against the right rotor position.
	    let offset = rgtRotorPos == 0 ? 0 - this._position : rgtRotorPos - this._position;
	    // Get the letter number corresponding to the right wiring (ie: the array index).
	    letterNb = this._wiring.indexOf(letterNb);

	    return this._getOutput(letterNb, offset);
	},

        /*
	 * Moves the given letter number according to the given offset value.
	 *
	 * @param integer letterNb      The input letter number.
	 * @param integer offset        The offset to apply.
	 * 
	 * @return integer  The output letter number.
	 */
        _getOutput: function (letterNb, offset) {
	    // Move the letter number from right to left.
	    if (offset < 0) {
	        // Convert negative value to positive.
	        offset = Math.abs(offset);
		for (let i = 0; i < offset; i++) {
		    letterNb--;
		    letterNb = letterNb < 0 ? 25 : letterNb;
		}
	    }
	    // Move the letter number from left to right.
	    else {
		for (let i = 0; i < offset; i++) {
		    letterNb++;
		    letterNb = letterNb > 25 ? 0 : letterNb;
		}
	    }

	    return letterNb;
	},

	/*
	 * Returns the current position of the rotor.
	 *
	 * @return integer  
	 */
        getPosition: function () {
	    return this._position;
	},

	/*
	 * Returns the notch position of the rotor.
	 *
	 * @return integer  
	 */
        getNotch: function () {
	    return this._notch;
	},

	/*
	 * Returns the current step number of the rotor.
	 *
	 * @return integer  
	 */
        getStepNb: function () {
	    return this._step;
	},

	/*
	 * Returns the number of turns.
	 *
	 * @return integer  
	 */
        getNbOfTurns: function () {
	    return this._turns;
	}
    };

    return {
        init: Rotor
    };

})();

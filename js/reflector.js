CReflector = (function () {

    // The regular letter sequence. The number for each letter is equal to its index A -> 0, B -> 1 etc...
    const _alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    // The offset used to create the reflector wiring. 0 (A) -> 24 (Y), 1 (B) -> 17 (R) etc...
    const _offset = ['Y','R','U','H','Q','S','L','D','P','X','N','G','O','K','M','I','E','B','F','Z','C','W','V','J','A','T'];

    const Reflector = function () {
        this._wiring = [];
        this._createWiring();
    };


    // Methods
    Reflector.prototype = {

        /*
	 * Sets the connections between the 26 contacts of the reflector.
	 *
	 * @return  void
	 */ 
        _createWiring: function () {
	    // Loop through the regular letter sequence (which correspond to the array indexes: 0,1,2...).
	    _alphabet.forEach((letter, i) => {
	        // Get the index of the corresponding letter in the offset array.  
	        let id = _alphabet.indexOf(_offset[i]); 
		this._wiring.push(id);
	    });
	},

        /*
	 * Returns the corresponding output letter number according to the right rotor position.
	 *
	 * @param integer letterNb      The input letter number.
	 * @param integer rgtRotorPos   The right rotor position.
	 * 
	 * @return integer  The output letter number.
	 */
        getOutput: function (letterNb, rgtRotorPos) {
	    // For debugging purpose only.
	    console.log('reflector input letter: '+_alphabet[letterNb]+' number: '+letterNb);

            // The right rotor is at its initial position.
	    if (rgtRotorPos == 0) {
	        // Just return the corresponding letter number.
		return this._wiring[letterNb];
	    }

	    // Adjust the reflector wiring to the right rotor position to get 
	    // the letter number pair to use.

	    let offset = letterNb;

	    for (let i = 0; i < rgtRotorPos; i++) {
		offset--;
	        // Restart from the end if needed.
		offset = offset < 0 ? 25 : offset;
	    }
	    
	    // Work out the gap between the two letter numbers.
	    let gap = offset < this._wiring[offset] ? this._wiring[offset] - offset : offset - this._wiring[offset];

	    // Move the given letter number according to the gap value.

	    // Move from right to left.
	    if (offset > this._wiring[offset]) {
		for (let i = 0; i < gap; i++) {
		    letterNb--;
		    // Restart from the end if needed.
		    letterNb = letterNb < 0 ? 25 : letterNb;
		}
	    }
	    // Move from left to right.
	    else {
		for (let i = 0; i < gap; i++) {
		    letterNb++;
		    // Restart from the beginning if needed.
		    letterNb = letterNb > 25 ? 0 : letterNb;
		}
	    }

	    // For debugging purpose only.
	    console.log('reflector output letter: '+_alphabet[letterNb]+' number: '+letterNb);

	    return letterNb;
	}
    };

    return {
        init: Reflector
    };
})();

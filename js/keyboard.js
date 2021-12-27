CKeyboard = (function () {

    const Keyboard = function () {

	this._keyContainer = null;
	this._bulbContainer = null;
	this._keys = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
        this._createBoard('bulb');
        this._createBoard('key');
    };

    // Methods
    Keyboard.prototype = {

        _createBoard: function (type) {
	    this['_'+type+'Container'] = document.createElement('div');
	    this['_'+type+'Container'].setAttribute('id', type+'Container');
	    this['_'+type+'Container'].setAttribute('class', type+'Container');
	    document.getElementById('enigma').appendChild(this['_'+type+'Container']);

	    let rowId = 0;

	    this._keys.forEach(function (letter, i) {
	        // Create the 3 rows which contain the keys/bulbs.
	        if (i == 0 || i == 9 || i == 17) {
		    rowId++;
		    let row  = document.createElement('div');
		    row.setAttribute('id', type+'Row-'+rowId);
		    row.setAttribute('class', type+'Rows');
		    document.getElementById(type+'Container').appendChild(row);
	        }

	        let key = document.createElement('button');
	        let shadow = type == 'key' ? 'key-shadow' : '';
	        key.setAttribute('class', 'btn '+shadow+' btn-dark '+type+'s');

	        if (type == 'key') {
		    key.setAttribute('data-letter', letter);
		}
	        else {
		    key.setAttribute('id', 'letter_'+letter);
		}

	        key.textContent = letter;
	        document.getElementById(type+'Row-'+rowId).appendChild(key);
	    }); 
	},

        pushKey: function (key, swapLetter) {
	    // Ensure first that is the left button that has been pushed.
	    if (event.button === 0) {
	        let letter = swapLetter(key.dataset.letter);
		let bulb = document.getElementById('letter_'+letter);
		bulb.classList.remove('switchedOff');
		bulb.classList.add('switchedOn');
	    }
	},

        releaseKey: function (key) {
	    // Ensure first that is the left button that has been released.
	    if (event.button === 0) {
	        let bulbs = document.getElementsByClassName('switchedOn');

	        for (let i = 0; bulbs.length; i++) {
		    bulbs[i].classList.add('switchedOff');
		    bulbs[i].classList.remove('switchedOn');
		}

	        key.blur();
	    }
	},
    };

    return {
        init: Keyboard
    };

})();

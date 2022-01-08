CPlugboard = (function () {

    const _sockets = ['Q','W','E','R','T','Z','U','I','O','A','S','D','F','G','H','J','K','P','Y','X','C','V','B','N','M','L'];
    const _alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    const Plugboard = function () {
        this._connections = [null, null, null, null, null, null, null, null, null, null, null, null, null, null,
			     null, null, null, null, null, null, null, null, null, null, null];
        this._onHold = null;
        this._createPlugboard();
    };

    // Methods
    Plugboard.prototype = {

        _createPlugboard: function () {
	    this['plugboardContainer'] = document.createElement('div');
	    this['plugboardContainer'].setAttribute('id', 'plugboardContainer');
	    this['plugboardContainer'].setAttribute('class', 'plugboardContainer');
	    document.getElementById('enigma').appendChild(this['plugboardContainer']);

	    let rowId = 0;

	    _sockets.forEach(function (letter, i) {
	        // Create the 3 rows which contain the sockets.
	        if (i == 0 || i == 9 || i == 17) {
		    rowId++;
		    let row  = document.createElement('div');
		    row.setAttribute('id', 'plugboardRow-'+rowId);
		    row.setAttribute('class', 'plugboardRows');
		    document.getElementById('plugboardContainer').appendChild(row);
	        }

		let socketContainer = document.createElement('div');
		socketContainer.setAttribute('class', 'socketContainer');
		socketContainer.setAttribute('id', 'socketContainer-'+i);

	        let letterNb = _alphabet.indexOf(letter);

	        let label = document.createElement('label');
	        label.setAttribute('for', 'socket_'+letterNb);
		label.setAttribute('class', 'socketLabel');
	        label.textContent = letter;

	        let socket = document.createElement('input');
	        socket.setAttribute('type', 'checkbox');
	        socket.setAttribute('class', 'control-input sockets');
	        socket.setAttribute('id', 'socket_'+letterNb);
		socket.setAttribute('data-letter-nb', letterNb);

		let socketLetter = document.createElement('div');
		socketLetter.setAttribute('class', 'socketLetter');
		socketLetter.setAttribute('id', 'socketLetter_'+letterNb);
	        socketLetter.textContent = letter;

	        document.getElementById('plugboardRow-'+rowId).appendChild(socketContainer);
	        document.getElementById('socketContainer-'+i).appendChild(label);
	        document.getElementById('socketContainer-'+i).appendChild(socket);
	        document.getElementById('socketContainer-'+i).appendChild(socketLetter);
	    }); 
	},

	/*
	 * Set up a connection between 2 letters.
	 *
	 * @param object socket		The clicked checkbox.
	 *
	 * @return  void
	 */
        connection: function (socket) {
	    // Get the corresponding letter number.
	    const letterNb = socket.dataset.letterNb;

	    // A socket has just been clicked.
	    if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && !this._onHold) {
	        // Put the letter number on hold until the next click.
	        this._onHold = letterNb;
	    }
	    // A second socket has been clicked. 
	    else if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && this._onHold) {
	        // Ensure the same socket is not clicked again.
	        if (letterNb != this._onHold) {
		    // Set the connection between the 2 sockets.
		    this._connections[this._onHold] = letterNb;
		    this._connections[letterNb] = this._onHold;

		    document.getElementById('socketLetter_'+this._onHold).classList.add('socketConnection');
		    document.getElementById('socketLetter_'+letterNb).classList.add('socketConnection');
		    // Show the corresponding letters at the bottom of each socket. 
		    document.getElementById('socketLetter_'+this._onHold).textContent = _alphabet[letterNb];
		    document.getElementById('socketLetter_'+letterNb).textContent = _alphabet[this._onHold];
		}

		this._onHold = null;
	    }
	    // The socket of an existing connection has been clicked.
	    else if (this._connections[letterNb]) {
	        // Get the connected letter. 
		const connectedLtr = this._connections[letterNb];

                // Cancel the connection.
		document.getElementById('socketLetter_'+this._connections[letterNb]).classList.remove('socketConnection');
		document.getElementById('socketLetter_'+this._connections[letterNb]).textContent = _alphabet[this._connections[letterNb]];
		document.getElementById('socketLetter_'+this._connections[connectedLtr]).classList.remove('socketConnection');
		document.getElementById('socketLetter_'+this._connections[connectedLtr]).textContent = _alphabet[this._connections[connectedLtr]];
		document.getElementById('socket_'+this._connections[letterNb]).checked = false;

		this._connections[letterNb] = null;
		this._connections[connectedLtr] = null;
	    }
	},

        /*
	 * Checks whether a connection exists for a given letter number then returns 
	 * the corresponding letter number .
	 *
	 * @param integer letterNb      The input letter number.
	 * 
	 * @return integer  The output letter number.
	 */
        output: function (letterNb) {
	    // The given letter is not connected.
	    if (!this._connections[letterNb] && this._connections.indexOf(letterNb) === -1) {
	        return letterNb;
	    }

	    return this._connections[letterNb] ? this._connections[letterNb] : this._connections.indexOf(letterNb);
	},
    };

    return {
        init: Plugboard
    };

})();

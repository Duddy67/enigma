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

        connection: function (socket) {
	    // Get the corresponding letter number.
	    const letterNb = socket.dataset.letterNb;

//console.log('test: '+this._connections[letterNb]);
	    if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && !this._onHold) {
	        // Put the letter number on hold until the next click.
	        this._onHold = letterNb;
	    }
	    else if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && this._onHold) {
	        if (letterNb != this._onHold) {
		    this._connections[this._onHold] = letterNb;
		    this._connections[letterNb] = this._onHold;

		    document.getElementById('socketLetter_'+this._onHold).classList.add('socketConnection');
		    document.getElementById('socketLetter_'+letterNb).classList.add('socketConnection');
		    document.getElementById('socketLetter_'+this._onHold).textContent = _alphabet[letterNb];
		    document.getElementById('socketLetter_'+letterNb).textContent = _alphabet[this._onHold];
		}
console.log('connections: '+this._connections);

		this._onHold = null;
	    }
	    else if (this._connections.indexOf(letterNb) >= 0 || this._connections[letterNb]) {
console.log('indexOf: '+this._connections.indexOf(letterNb)+' : '+this._connections[letterNb]);

	        if (this._connections[letterNb]) {
		    document.getElementById('socketLetter_'+this._connections[letterNb]).classList.remove('socketConnection');
		    document.getElementById('socketLetter_'+this._connections[letterNb]).textContent = _alphabet[this._connections[letterNb]];
		    document.getElementById('socket_'+this._connections[letterNb]).checked = false;

		    const conLetter = this._connections[letterNb];
		    this._connections[letterNb] = null;
		    this._connections[conLetter] = null;
		}
	        else {
		    document.getElementById('socketLetter_'+this._connections.indexOf(letterNb)).classList.remove('socketConnection');
		    document.getElementById('socketLetter_'+this._connections.indexOf(letterNb)).textContent = _alphabet[this._connections.indexOf(letterNb)];
		    document.getElementById('socket_'+this._connections.indexOf(letterNb)).checked = false;

		    const conLetter = this._connections[this._connections.indexOf(letterNb)];
		    this._connections[this._connections.indexOf(letterNb)] = null;
		    this._connections[conLetter] = null;
		}

		document.getElementById('socketLetter_'+letterNb).textContent = _alphabet[letterNb];
		document.getElementById('socketLetter_'+letterNb).classList.remove('socketConnection');

console.log('cancelConnection: '+this._connections);
	    }

	    //alert(socket.dataset.letterNb);
	},

        output: function (letterNb) {
console.log('plugboard input: '+letterNb);
	    if (!this._connections[letterNb] && this._connections.indexOf(letterNb) === -1) {
console.log('plugboard output no connection: '+letterNb);
	        return letterNb;
	    }

	    return this._connections[letterNb] ? this._connections[letterNb] : this._connections.indexOf(letterNb);
	},
    };

    return {
        init: Plugboard
    };

})();

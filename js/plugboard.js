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

	        let letterNb = _alphabet.indexOf(letter);

	        let label = document.createElement('label');
	        label.setAttribute('for', 'socket_'+letterNb);
	        label.textContent = letter;

	        let socket = document.createElement('input');
	        socket.setAttribute('type', 'checkbox');
	        socket.setAttribute('class', 'control-input sockets');
	        socket.setAttribute('id', 'socket_'+letterNb);
		socket.setAttribute('data-letter-nb', letterNb);

	        document.getElementById('plugboardRow-'+rowId).appendChild(label);
	        document.getElementById('plugboardRow-'+rowId).appendChild(socket);
	    }); 
	},

        _setConnection: function (letterNb) {
            this._connections[this._onHold] = letterNb;
	    this._onHold = null;
console.log('_setConnection: '+this._connections);
	},

        _getConnection: function (letterNb) {
	},

        connection: function (socket) {
	    //alert(socket.getAttribute('id'));
	    const letterNb = socket.dataset.letterNb;

console.log('test: '+this._connections[letterNb]);
	    if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && !this._onHold) {
console.log('1: ');
	        this._onHold = letterNb;
	    }
	    else if (this._connections.indexOf(letterNb) < 0 && !this._connections[letterNb] && this._onHold) {
console.log('2: ');
	        this._setConnection(letterNb);
	    }
	    else if (this._connections.indexOf(letterNb) >= 0 || this._connections[letterNb]) {
console.log('indexOf: '+this._connections.indexOf(letterNb)+' : '+this._connections[letterNb]);
	        if (this._connections[letterNb]) {
		    this._connections[letterNb] = null;
		}
	        else {
		    this._connections[this._connections.indexOf(letterNb)] = null;
		}
console.log('cancelConnection: '+this._connections);
	    }

	    //alert(socket.dataset.letterNb);
	},
    };

    return {
        init: Plugboard
    };

})();

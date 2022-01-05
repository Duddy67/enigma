document.addEventListener('DOMContentLoaded', () => {

    const _alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    const rotor1 = new CRotor.init(1);
    const rotor2 = new CRotor.init(2);
    const rotor3 = new CRotor.init(3);
    const rotors = {rotor1, rotor2, rotor3};
    const reflector = new CReflector.init();
    console.log(rotor1);
    console.log(reflector);


    const keyboard = new CKeyboard.init();

    const plugboard = new CPlugboard.init();

    //let keys = document.getElementsByClassName('keys');
    let keys = document.querySelectorAll('.keys');

    keys.forEach((key) => {
        key.addEventListener('mousedown', function() {
	    keyboard.pushKey(key, swapLetter);
	}, true);

        key.addEventListener('mouseup', function() {
	    keyboard.releaseKey(key);
	}, true);
    });

    let forwardBtn = document.querySelectorAll('.forwardButton');

    forwardBtn.forEach((button) => {
        button.addEventListener('mousedown', function() {
	    forwardButton(button);
	}, true);
    });

    let backBtn = document.querySelectorAll('.backButton');

    backBtn.forEach((button) => {
        button.addEventListener('mousedown', function() {
	    backButton(button);
	}, true);
    });

    let sockets = document.querySelectorAll('.sockets');

    sockets.forEach((socket) => {
        socket.addEventListener('click', function() {
	    plugboard.connection(socket);
	}, true);
    });

    function forwardButton(button) {
        const rotorId = button.dataset.rotor;
        const rotor = rotors['rotor'+rotorId].forward();
    }

    function backButton(button) {
        const rotorId = button.dataset.rotor;
        const rotor = rotors['rotor'+rotorId].backward();
    }

    function swapLetter(letter) {

	if (rotor3.getNotch() == rotor2.getNotch() && rotor2.getStepNb() == rotor3.getNbOfTurns()) {
	    rotor2.stepForward();
	}

        if (rotor2.getNotch() == rotor1.getNotch() && rotor1.getStepNb() == rotor2.getNbOfTurns()) {
	    rotor1.stepForward();
	}

        rotor3.stepForward();

        // Grab the letter number associated to the pressed key.
	let letterNb = _alphabet.indexOf(letter);

        letterNb = rotor3.getLeftOutput(letterNb, 0);
        letterNb = rotor2.getLeftOutput(letterNb, rotor3.getPosition());
        letterNb = rotor1.getLeftOutput(letterNb, rotor2.getPosition());

        letterNb = reflector.getOutput(letterNb, rotor1.getPosition());

        letterNb = rotor1.getRightOutput(letterNb, rotor2.getPosition());
        letterNb = rotor2.getRightOutput(letterNb, rotor3.getPosition());
        letterNb = rotor3.getRightOutput(letterNb, 0);

	return _alphabet[letterNb];
    }
});

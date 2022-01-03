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


    function forwardButton(button) {
        const rotorId = button.dataset.rotor;
        const rotor = rotors['rotor'+rotorId].stepForward();
    }

    function backButton(button) {
        const rotorId = button.dataset.rotor;
        const rotor = rotors['rotor'+rotorId].stepBack();
    }

    function swapLetter(letter) {
        rotor3.stepForward();
	let letterNb = _alphabet.indexOf(letter);
        letterNb = rotor3.getLeftOutput(letterNb, 0);
	  //console.log('pos '+rotor3._letterNb);
        letterNb = rotor2.getLeftOutput(letterNb, rotor3.getPosition());
        letterNb = rotor1.getLeftOutput(letterNb, rotor2.getPosition());

        letterNb = reflector.getOutput(letterNb, rotor1.getPosition());

        letterNb = rotor1.getRightOutput(letterNb, rotor2.getPosition());
        letterNb = rotor2.getRightOutput(letterNb, rotor3.getPosition());
        letterNb = rotor3.getRightOutput(letterNb, 0);
	  //console.log('pos '+letterNb);
//console.log('contacts: '+rotor1._contacts);
	return _alphabet[letterNb];
    }
});

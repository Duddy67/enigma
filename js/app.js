document.addEventListener('DOMContentLoaded', () => {

    const rotor3 = new CRotor.init(3);
    const rotor2 = new CRotor.init(2);
    const rotor1 = new CRotor.init(1);
    //console.log(rotor);
    //console.log(rotor._slideLetters('D', 4));
    //console.log(rotor.getOutput('U'));


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

    function swapLetter(letter) {
	  //alert(letter);
        rotor1.forward();
	return rotor1.getOutput(letter);
    }
});

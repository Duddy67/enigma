document.addEventListener('DOMContentLoaded', () => {

    const rotor = new CRotor.init();
    //console.log(rotor);
    //console.log(rotor._slideLetters('D', 4));
    console.log(rotor.getOutput('U'));


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
	return rotor.getOutput(letter);
    }
});

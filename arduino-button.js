const five = require('johnny-five');

const board = new five.Board();

board.on('ready', () => {
  const ledRed = new five.Led(9);
  const ledGreen = new five.Led(6);
  const button = new five.Button(12);

  button.on('press', () => {
    console.log('button pressed');
    ledRed.toggle();
  });

  button.on('release', () => {
    console.log('button released');
  });

  button.on('hold', function () {
    console.log('Button held');
    console.log('for ', button.holdtime, ' seconds');
    ledGreen.pulse();
  });
});

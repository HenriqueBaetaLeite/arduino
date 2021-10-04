const { Board, Servo } = require('johnny-five');
const keypress = require('keypress');

keypress(process.stdin);

const board = new Board();

board.on('ready', () => {
  console.log('Use Up and Down arrows for CW and CCW respectively. Space to stop. Q to quit.');

  const servo1 = new Servo({
    pin: 10,
    type: 'continuous',
    center: true,
  });

  const servo2 = new Servo.Continuous(9);

  const angleServo = 90;

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  process.stdin.on('keypress', (ch, key) => {
    console.log('imprimindo keys', key);
    if (!key) {
      return;
    }
    switch (key.name) {
      case 'q':
        console.log('Quitting...');
        process.exit();
      case 'w':
        servo2.cw(1); // top speed
        servo1.max();
        break;
      case 'f':
        servo1.to(angleServo);
        servo2.sweep();
        break;
      case 'c':
        servo1.center();
        break;
        q;
      case 'm':
        servo1.min();
        break;
      case 'e':
        servo2.ccw();
        servo1.sweep({ range: [45, 180], interval: 2000 });
        break;
      case 'up':
        servo1.cw();
        break;
      case 'down':
        servo1.ccw();
        break;
      case 'space':
        console.log('Stoping!');
        servo1.stop();
        servo2.stop();
        break;
      default:
        return;
    }

    // if (key.name === 'q') {
    //   console.log('Quitting');
    //   process.exit();
    // } else if (key.name === 'up') {
    //   console.log('CW');
    //   servo.cw();
    // } else if (key.name === 'down') {
    //   console.log('CCW');
    //   servo.ccw();
    // } else if (key.name === 'space') {
    //   console.log('Stopping');
    //   servo.stop();
    // }
  });
});

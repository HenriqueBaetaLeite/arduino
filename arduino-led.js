// digitar esse código para liberar a permissão da porta usb antes de iniciar a execução
// sudo chmod a+rw /dev/tty/ACM0



const five = require('johnny-five');

const keypress = require('keypress');

keypress(process.stdin);

const board = new five.Board();

board.on('ready', () => {
  // crio as "instâncias" de cada Led, vindo do johnny-five
  const ledGreen = new five.Led(9);
  const ledYellow = new five.Led(10);
  const ledRed = new five.Led(11);

  // função que inicia o semáforo, ainda trabalhando nela, pois ela demora o tempo do setInterval
  // para começar, e eu quero que ela inicie no momento em que for chamada, no caso quando apertar
  // a tecla 's' (start).
  const startSignal = () => {
    setInterval(() => {
      ledRed.on();

      setTimeout(() => {
        ledRed.off();
        ledGreen.on();
      }, 5000);

      setTimeout(() => {
        ledGreen.off();
        ledYellow.on();
      }, 10000);

      setTimeout(() => {
        ledYellow.off();
      }, 13000);
    }, 13000);
  };

  // necessários ao keypress:
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  // aqui eu inicio a função .on() que da início ao keypress
  process.stdin.on('keypress', (ch, key) => {
    console.log('imprimindo keys', key);
    if (!key) {
      return;
    }

    // faço um switch em cima das teclas digitadas, ou seja,
    // de acordo com cada tecla pressionada realizo uma função.
    // tbm posso utilizar os botões do arduino para realizar funções
    switch (key.name) {
      case 'q':
        console.log('Quitting...');
        process.exit();
      case 's':
        startSignal();
        break;
      case 'space':
        console.log('Stopped!');
        ledGreen.stop().off();
        ledRed.stop().off();
        ledYellow.stop().off();
        break;
      case 'g':
        ledGreen.pulse();
        break;
      case 'r':
        ledRed.fadeIn(8000);
        break;
      case 'y':
        ledYellow.on();
        break;
      case 'k':
        ledGreen.strobe();
        ledRed.strobe();
        ledYellow.blink();
        break;
      default:
        return;
    }
  });
});

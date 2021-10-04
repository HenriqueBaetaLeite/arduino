const five = require('johnny-five');

const firebase = require('firebase');

const board = new five.Board();

board.on('ready', () => {
  const rele = new five.Relay(8);

  this.repl.inject({
    rele: rele,
  });

  // pego esses dados do meu database do firebase
  const config = {
    apiKey: 'AIzaSyCG-P-OAVu2AYqpBVhaTk8GAl-FpWZD3Zg',
    authDomain: 'iot-tutorial-68b4b.firebaseapp.com',
    databaseURL: 'https://iot-tutorial-68b4b.firebaseio.com',
    storageBucket: 'iot-tutorial-68b4b.appspot.com',
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  // Função que modifica o "estado",
  // o .on() pega o value do snapshot e dependendo liga ou desliga o rele.
  const starCountRef = firebase
    .database()
    .ref('lampada')
    .on('value', function (snapshot) {
      let lampada = snapshot.val();

      if (lampada == 'on') {
        rele.on();
      } else {
        rele.off();
      }
    });
});

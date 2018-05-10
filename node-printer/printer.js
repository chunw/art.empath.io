/*
* The node.js module used to communicate with Adafruit Thermal Printer.
*/
var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/cu.usbmodem14241', {
  	   baudRate: 19200
  	}),
Printer = require('thermalprinter');
http = require('http');

serialPort.on("open", function() {
  console.log('port opened successfully');

  function checkPrinterStatus() {
    http.get('http://0.0.0.0:5000/print', (resp) => {
      let data = '';
      resp.on('data', (chunk) => {  // A chunk of data has been received.
        data += chunk;
      });
      resp.on('end', () => { // The whole response has been received. Print out the result.
        const printer_on = JSON.parse(data);
        if (printer_on) {
          console.log("printer should print now...");
          fetchAndPrint();
        } else {
          console.log(printer_on);
        }
      });
    }).on("error", (err) => {
      console.log("Error checking printer status: " + err.message);
    });
  }

  function fetchAndPrint() {
    http.get('http://0.0.0.0:5000/random', (resp) => {
      let data = '';

      resp.on('data', (chunk) => {  // A chunk of data has been received.
        data += chunk;
      });

      resp.on('end', () => { // The whole response has been received. Print out the result.
        const json = JSON.parse(data);
        sendDataToArduino(json);
      });
    }).on("error", (err) => {
      console.log("Error getting data from server: " + err.message);
    });
  }

  function sendDataToArduino(json) {
    setTimeout(() => {
      console.log("Printing this message...");
      console.log(json);

      setTimeout(() => {

        serialPort.write(json.date + "           " + json.time + "\n\n");

        setTimeout(() => {
          serialPort.write(json.name + " says: \n\n");

          setTimeout(() => {
            serialPort.write(json.message + "\n\n");

            setTimeout(() => {
              serialPort.write("--------------------------------" + "\n\n\n");

            }, 1000);

          }, 1000);

        }, 1000);

      }, 1000);

    }, 1000);
  }

  checkPrinterStatus();
  setInterval(checkPrinterStatus, 3000);
});

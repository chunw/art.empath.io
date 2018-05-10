/*
The node.js module used to communicate with Adafruit/Sparkfun Thermal Printer:
https://github.com/xseignard/thermalPrinter
https://www.npmjs.com/package/thermalprinter
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-control-of-an-arduino/

Example application: https://medium.com/offline-camp/how-to-fall-in-love-with-receipts-cd383ef31c3c
https://iotfall2015.wordpress.com/tag/node-js/
https://stackoverflow.com/questions/42560154/node-js-thermal-printer-issue-in-loop-printing

Alternative pyduino (much more manual coding needed) https://github.com/lekum/pyduino/blob/master/pyduino_sketch.ino
*/

var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/cu.usbmodem14241', {
  	   baudRate: 19200
        //parser: SerialPort.parsers.readline("\n")
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

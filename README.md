Project page: https://chunwang.me/2018/05/09/art-io/

#### Infrastructure
Web -->
  The main user interface is a Python Flask app using a Mongo database.

Adafruit Thermal Receipt Printer -->
  The printer is connected to Arduino that runs the printer-arduino sketch.

Web-Printer communication -->
  This is done via a Node.JS script that continuously pings an API provided
  by the local Web App and sends the signal and message to printer for printing.

For detailed list of the hardware involved:
https://docs.google.com/document/d/1vy0cOMW_tLCxA9J4DVGg1hq2T_NKagUQzExrIdEPeg0/edit?usp=sharing

#### How to run

Install Python dependencies:

```shell
pip install -r requirements.txt

```

Start Flask Web App:

```shell
python main.py
```
Then navigate to http://0.0.0.0:5000/.

Start a new terminal window and

```shell
cd node-printer
node printer.js
```
When Arduino and printer are also connected to the laptop,
Arduino should be listening to the user interaction with the
web app and start printing when a user message is received in database.

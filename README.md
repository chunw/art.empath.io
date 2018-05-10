#### Infrastructure
Web -->
  The main interface is a Python Flask app talking to a MongoDB backend.

Adafruit Thermal Receipt Printer -->
  Connected to Arduino that runs the printer-arduino sketch.

Web-Printer communication -->
  This is done via a Node.JS script that continuously pings an API provided
  by the local Web App and sends the signal and message to printer for printing.

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

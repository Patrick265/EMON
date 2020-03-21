import os
import time
import json

import paho.mqtt.client as mqttclient

from datetime import datetime
from dbManager import dbManager

connected_own = False

def main():
    print("Starting DB and MQTT Manager!")
    # Own smartmeter
    broker_address = "iot.paulhobbel.me"
    port = 1883
    topic = "smartmeter/log"

    client_own = mqttclient.Client("TIMDB_PATJON_BACKEND")
    client_own.on_connect = on_connect
    client_own.on_message = on_message
    client_own.connect(broker_address, port=port)
    client_own.loop_start()

    while connected_own != True:
        time.sleep(0.1)
        client_own.subscribe(topic, 1)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("connected to broker of our own")
        connected_own = True
    else:
        print("Connection failed")


def on_message(client, userdata, message):
    db = dbManager(os.path.dirname(os.path.realpath(__file__)) + "/emonv3.db")
    db.setup()
    mes = str(message.payload.decode("utf-8"))
    parsed_js = (json.loads(mes))
    message_id = str((parsed_js['id']))
    if message_id == "TIMDB_PATJON_EMON":
        print("Received data from: TIMDB_PATJON_EMON")
        result = db.retrieve_iskra_energie_last()
        energymeter_name = str((parsed_js['identification']))
        watt = parsed_js['watt']
        signature = str((parsed_js['signature']))
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
        if result == None:
            wattHour = watt / 30
            totalkwh = wattHour / 1000
            db.insert_iskra_energie(message_id, energymeter_name, watt, wattHour, totalkwh, signature, timestamp)
        else:
            wattHour = watt / 30
            totalkwh = (wattHour / 1000) + result[5]
            db.insert_iskra_energie(message_id, energymeter_name, watt, wattHour, totalkwh, signature, timestamp)

    if message_id == "TIMDB_PAJTON_EMON_TEMP":
        print("Received data from: TIMDB_PATJON_EMON_TEMP_SENSOR")
        temperature = parsed_js['temperature']
        signature = str((parsed_js['signature']))
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
        db.insert_iskra_temperature(message_id, temperature, signature, timestamp)

    # simon

    if str(parsed_js['signature']) == "2019-ETI-EMON-V01-SIM":
        print("Received data from: 2019-ETI-EMON-V01-SIM")
        result = db.retrieve_iskra_energie_last()
        watt = parsed_js['w']
        wattHour = watt / 12
        kwH = (wattHour / 1000) + result[5]
        signature = str(parsed_js['signature'])
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
        db.insert_simon_energymeter("ISKRA-MT382", watt, wattHour, kwH, signature, timestamp)

if __name__ == "__main__":
    main()

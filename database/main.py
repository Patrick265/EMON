import os
import time
import json
import logging
import paho.mqtt.client as mqttclient

from datetime import datetime
from dbManager import dbManager

connected_own = False

def main():
    logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
    logging.info("Starting DB and MQTT Manager!")

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
        logging.info("connected to broker iot.paulhobbel.me")
        connected_own = True
    else:
        logging.error("Connection failed to broker")


def on_message(client, userdata, message):
    db = dbManager(os.path.dirname(os.path.realpath(__file__)) + "/emonv3.db")
    db.setup()
    mes = str(message.payload.decode("utf-8"))
    parsed_js = (json.loads(mes))
    if 'id' in parsed_js:
        message_id = str(parsed_js['id'])
    elif 'MeterGuid' in parsed_js:
        message_id = str(parsed_js['MeterGuid'])
    elif 'name' in parsed_js:
        message_id = str(parsed_js['name'])


    if message_id == "TIMDB_PATJON_EMON":
        logging.info("Received data from: %s", message_id)
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
        logging.info("Received data from: %s", message_id)
        temperature = parsed_js['temperature']
        signature = str((parsed_js['signature']))
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
        db.insert_iskra_temperature(message_id, temperature, signature, timestamp)

    # Om de minuut
    if message_id == "858A559A-58E7-4429-8753-AC239E49C489":
        logging.info("Received data from: %s", "858A559A-58E7-4429-8753-AC239E49C489")
        result = db.retrieve_tom_energy_last()
        wattHour = parsed_js["wattHour"] / 17
        meterguid = message_id
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
        if result == None:
            watt = wattHour * 30
            total = wattHour / 2000
            db.insert_tom_energiemeter(meterguid, watt, wattHour, total, timestamp)
        else:
            watt = wattHour * 30
            total = (wattHour / 2000) + result[4]
            db.insert_tom_energiemeter(meterguid, watt, wattHour, total, timestamp)

    # om de 5 minuten
    if message_id == "AngstHuisMeter":
        logging.info("Received data from: %s", "AngstHuisMeter")
        result = db.retrieve_simon_energie_last()
        name = message_id
        watt = parsed_js["watt"]
        wattHour = watt / 12
        signature = parsed_js["signature"]
        dateTimeObj = datetime.now()
        timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")

        if result == None:
            total = wattHour / 1000
            db.insert_simon_energiemeter(name, watt, wattHour, total, signature, timestamp)
        else:
            total = (wattHour / 1000) + result[4]
            db.insert_simon_energiemeter(name, watt, wattHour, total, signature, timestamp)


if __name__ == "__main__":
    main()

from dbmanager import dbManager
import os
import uuid
import paho.mqtt.client as mqttClient
import time
import json
from datetime import datetime

connected = False

def main():
	print("Starting DB Manager!")

	broker_address="iot.paulhobbel.me"
	port = 1883
	topic = "smartmeter/log"
	client = mqttClient.Client("TIMDB_PATJON_BACKEND")
	client.on_connect= on_connect
	client.on_message = on_message

	client.connect(broker_address, port=port)
	client.loop_start()

	while connected != True:
		time.sleep(0.1)
		client.subscribe(topic, 1)
		

def on_connect(client, userdata, flags, rc):
	if rc == 0:
		print("Connected to broker")
		connected = True
	else:
		print("Connection failed")

def on_message(client, userdata, message):
	db = dbManager(os.path.dirname(os.path.realpath(__file__)) + "/emonv3.db")
	db.setup()
	mes = str(message.payload.decode("utf-8"))
	parsed_js = (json.loads(mes))
	message_id = str((parsed_js['id']))
	if message_id == "TIMDB_PATJON_EMON":
			energymeter_name = str((parsed_js['identification']))
			watt = parsed_js['watt']
			wattHour = watt / 12
			signature = str((parsed_js['signature']))
			dateTimeObj = datetime.now()
			timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
			db.insert_data(message_id, energymeter_name, watt, wattHour, signature, timestamp)

if __name__ == "__main__":
	main()
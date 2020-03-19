from dbmanager import dbManager
import os
import uuid
import paho.mqtt.client as mqttclient
import time
import json
from datetime import datetime

connected_own = False
connected_school = False

def main():
	print("Starting DB Manager!")


	
	# Own smartmeter
	broker_address="iot.paulhobbel.me"
	port = 1883
	topic = "smartmeter/log"

	client_own = mqttclient.Client("TIMDB_PATJON_BACKEND")
	client_own.on_connect= on_connect
	client_own.on_message = on_message

	client_own.connect(broker_address, port=port)
	client_own.loop_start()

	# School
	port_school = 11883 
	topic_school = "smartmeter/log"
	username_school = "smartmeter_admin"
	password_school = "s3_sm4rtm3t3r"
	host_school = "sendlab.avansti.nl"
	client_school = mqttclient.Client("TIMDB_PATJON_BACKEND_SCHOOl")
	client_school.on_connect= on_connect_school
	client_school.on_message = on_message_school
	client_school.username_pw_set(username_school, password=password_school)
	client_school.connect(host_school, port=port_school)
	client_school.loop_start()

	while connected_own != True and connected_school != True:
		time.sleep(0.1)
		client_own.subscribe(topic, 1)
		client_school.subscribe(topic_school, 1)
		

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
		if result == None:
			
			energymeter_name = str((parsed_js['identification']))
			watt = parsed_js['watt']
			wattHour = watt / 12
			signature = str((parsed_js['signature']))
			dateTimeObj = datetime.now()
			timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
			db.insert_iskra_energie(message_id, energymeter_name, watt, wattHour,watt, signature, timestamp)
		else:
			energymeter_name = str((parsed_js['identification']))
			watt = parsed_js['watt']
			wattHour = watt / 12
			total = watt + result[5]
			signature = str((parsed_js['signature']))
			dateTimeObj = datetime.now()
			timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")

			db.insert_iskra_energie(message_id, energymeter_name, watt, wattHour,total, signature, timestamp)
			
	if message_id == "TIMDB_PATJON_EMON_TEMP_SENSOR":
		outside_temp = parsed_js['watt']
		inside_temp = parsed_js['watt']
		signature = str((parsed_js['signature']))
		dateTimeObj = datetime.now()
		timestamp = dateTimeObj.strftime("%d-%b-%Y %H:%M:%S")
		db.insert_iskra_temperature(message_id, outside_temp, inside_temp, signature, timestamp)


def on_connect_school(client, userdata, flags, rc):
	if rc == 0:
		print("connected to broker of school")
		connected_school = True
	else:
		print("Connection failed")


def on_message_school(client, userdata, message):
	mes = str(message.payload.decode("utf-8"))
	print(mes)


if __name__ == "__main__":
	main()
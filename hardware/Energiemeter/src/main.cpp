#include <Arduino.h>

// Wifi and MQTT
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <WiFiManager.h>


// JSON
#include <ArduinoJson.h>


// Config file
#include "smartmeter.h"
#include "conn.h"
#include <PubSubClient.h>
const int pResistor = A0; // Photoresistor at Arduino analog pin A0

StaticJsonDocument<200> createJSON();

WiFiClient wificlient;
PubSubClient client(wificlient);

int value;				  //Store value from photoresistor (0-1023)
int timerTracker;     //Keeps track if 15 minute timer has been hit, if true send mqtt with collected data and reset.

bool meterFlag;
float metervalue;
void readPhotoSensor();

void setup() {
	Serial.begin(9600);
	Serial.println("Starting Program...");
	timerTracker = 9000;
	WiFi.begin(SSID, SSID_PASS);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(500);
		Serial.printf("Connecting to %s...\n", SSID);
	}
	
	Serial.printf("Connected to %s...\n", SSID);

	client.setServer(MQTT_SERVER, MQTT_PORT);
	while(!client.connected()) {
		Serial.println("Connecting to MQTT...");

		if (client.connect("TIMDB_PATJON_EMON_WEMOS", MQTT_USER, MQTT_PASSWORD )) {
			Serial.println("connected");  
		} else {
			Serial.print("failed with state ");
			Serial.print(client.state());
			delay(2000);
		}
	}
}

void loop() {
	readPhotoSensor();
  	timerTracker++;
	//client.publish(MQTT_TOPIC, "WAT EEN KANKER BROKER");
  	//Check if 5 minutes passes
	//Serial.println(timerTracker);
	if(timerTracker >= 3000) {
		Serial.println("Sending Mqtt...");
		char buffer[512];
		SmartMeter meter("", "-", "-", "ISKRA-MT382", 5,5,5,5,5);
		StaticJsonDocument<200> doc;
		doc["id"].set("TIMDB_PATJON_EMON");
		doc["identification"].set("ISKRA-MT382");
		//doc["timestamp"].set("timestamp");
        doc["watt"].set(((metervalue/500) * 1000)*12);
		doc["signature"].set("2019-ETI-EMON-V01-TIMDB-PATJON");

		size_t n = serializeJson(doc, buffer);
		Serial.printf("JSON =\n%s\n",buffer);
		bool return_val = client.publish(MQTT_TOPIC, buffer);
		Serial.printf("Succesful publish?: %i\n", return_val);
		metervalue=0;
		timerTracker=0;
	}
	client.loop();
	delay(10);
}

void readPhotoSensor() {
  //Reading of lumen meter
  value = analogRead(pResistor);
  Serial.printf("time: %i value: %i, meter: %.5f\n ", timerTracker, value, metervalue);
  if(value > 1000 && meterFlag == false){
    meterFlag= true;
    metervalue++;
  } else if (value < 1000 && meterFlag == true){
    meterFlag= false;
  }
}
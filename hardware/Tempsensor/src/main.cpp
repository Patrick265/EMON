#include <Arduino.h>
#include "conn.h"
#include <PubSubClient.h>
#include <Ethernet.h>
#include <SPI.h>
#include <ArduinoJson.h>

const int temp_pin = A1;
int temp_val;

byte mac_adress[] = {  0x90, 0xA2, 0xDA, 0x0D, 0x01, 0x8B }; 
EthernetClient ethClient;
PubSubClient client(ethClient);

int simon_counter;
char buffer[512];


void setup() {
	Serial.begin(9600);
	Serial.println("[SMART SENSOR] Starting program....");
	pinMode(temp_pin, INPUT);

	Ethernet.begin(mac_adress);
	delay(1500);
	client.setServer(MQTT_SERVER, MQTT_PORT);
	while(!client.connected()) {
		Serial.println("Connecting to MQTT...");

		if (client.connect("SENSOR")) {
			Serial.println("connected");
		} else {
			Serial.print("failed with state");
			Serial.print(client.state());
			delay(2000);
		}
	}
}

void loop() {
	temp_val = analogRead(temp_pin);
	float millivolts= (temp_val / 1024.0) * 4000;
	float celsius = (millivolts / 10);
	Serial.print("Celsius: ");
	Serial.println(celsius);
	Serial.println(client.state());
	StaticJsonDocument<200> doc;
	doc["id"].set("TIMDB_PAJTON_EMON_TEMP");
	doc["temperature"].set(celsius);
	doc["signature"].set("2019-ETI-EMON-V01-TIMDB-PATJON");
	serializeJson(doc, buffer);
	Serial.println("Sending data to Patrick");
	Serial.println(buffer);
	client.publish("smartmeter/log", "Test Message");

	// simon_counter++;
	// Serial.println(simon_counter);
	// if(simon_counter == 3) {
	// 	doc.remove("temperature");
	// 	doc["id"].set("MESH_TEMP_SENSOR");
	// 	doc["c"].set(celsius);
	// 	doc["signature"].set("standaard-SIM-SEN");
	// 	serializeJson(doc, buffer);

	// 	client.publish(MQTT_TOPIC, buffer);
	// 	doc.remove("c");
		
	// 	simon_counter = 0;
	// }
	delay(10000);
}
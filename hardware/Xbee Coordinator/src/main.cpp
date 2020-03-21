#include <Arduino.h>
#include "conn.h"
#include <PubSubClient.h>
#include <Ethernet.h>
#include <SPI.h>
#include <ArduinoJson.h>


byte mac[]    = {  0x90, 0xA2, 0xDA, 0x0D, 0x01, 0x8B };  // Ethernet shield (W5100) MAC address

const char* mqttServer = MQTT_SERVER;
const int mqttPort = MQTT_PORT;
const char* mqttUser = MQTT_USER;
const char* mqttPassword = MQTT_PASSWORD;
void callback(char*, byte*, unsigned int);

EthernetClient ethClient;
PubSubClient client(ethClient);

int received = 0;
int check = 0;
bool timerOn = false;
int endtime = 0;

int counter = 0;
int values[7];
void checkTimer();

void setup() {
	
	Serial.begin(9600);
	// Serial.println("Started");
	pinMode(8, OUTPUT);
	digitalWrite(8, HIGH);
	// Ethernet shield configuration
	Ethernet.begin(mac);
	delay(1500); // Allow hardware to stabilize
	client.setServer(mqttServer, mqttPort);
	client.setCallback(callback);

}   

void loop() {
	while (!client.connected()) {
		// Serial.println("Connecting to MQTT...");
	
		if (client.connect("TIMDB_PATJON_COORDINATOR_SMART_SENSOR", mqttUser, mqttPassword )) {
			// Serial.println("connected");
			client.publish(MQTT_TOPIC, "\"connected\": \"true\""); 
		} else {
			// Serial.print("failed with state ");
			// Serial.print(client.state());
			delay(2000);
	
		}
	}
	while(Serial.available() > 0){
		StaticJsonDocument<200> doc;
		// doc["value"].set(Serial.read());
		// char buffer_json[512];
		// serializeJson(doc, buffer_json);
		// client.publish(MQTT_TOPIC, buffer_json);
		
		counter++;
		// client.publish(MQTT_TOPIC, counter);
		values[counter] = Serial.read();
		if(counter == 7) {
			counter = 0;
			doc["value1"].set(values[0]);
			doc["value2"].set(values[1]);
			doc["value3"].set(values[2]);
			doc["value4"].set(values[3]);
			doc["value5"].set(values[4]);
			doc["value6"].set(values[5]);
			doc["value7"].set(values[6]);
			char buffer_json[512];
			serializeJson(doc, buffer_json);
			client.publish(MQTT_TOPIC, buffer_json);
			counter = 0;
			values[0] = 0;
			values[1] = 0;
			values[2] = 0;
			values[3] = 0;
			values[4] = 0;
			values[5] = 0;
			values[6] = 0;
		}
		// int temp_value = Serial.read(); 
		// value += Serial.read();
		// if(temp_value == 10) {
		// 	StaticJsonDocument<200> doc;
		// 	doc["value"].set(value);
		// 	char buffer_json[512];
		// 	serializeJson(doc, buffer_json);
		// 	client.publish(MQTT_TOPIC, buffer_json);
		// 	value = "";
		// }
  	}
	client.loop();
	delay(100);
}

void callback(char* topic, byte* payload, unsigned int length) {
}

void checkTimer() {
  if(millis()>=endtime){
    check = 1;
    timerOn = false;
  }
}
#include <Arduino.h>
#include "conn.h"
#include <PubSubClient.h>
#include <Ethernet.h>
#include <SPI.h>

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
void checkTimer();

void setup() {
	
	Serial.begin(9600);
	Serial.println("Started");
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
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("Coordinator", mqttUser, mqttPassword )) {
      Serial.println("connected");  
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
  if(Serial.available() > 0){
    int n = Serial.read();
		client.publish("MQTT_TOPIC", "{\"werkt dit\": \"idk\"}");
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
}

void checkTimer() {
  if(millis()>=endtime){
    check = 1;
    timerOn = false;
  }
}
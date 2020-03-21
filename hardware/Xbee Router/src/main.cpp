#include <Arduino.h>

const int temp_pin = A1;
int temp_val;
int led_pin = 13;


void setup() {
	Serial.begin(9600);
	Serial.println("[SMART SENSOR] Starting program....");
	pinMode(temp_pin, INPUT);
	pinMode(led_pin, OUTPUT);
}

void loop() { 
	temp_val = analogRead(temp_pin);
	float millivolts= (temp_val / 1024.0) * 3300;
 	float celsius = (millivolts / 10);
	Serial.println(celsius);
	delay(10000);
}
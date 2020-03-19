#include <Arduino.h>

const int temp_pin = A1;
int temp_val;

void setup() {
	Serial.begin(9600);
	Serial.println("[SMART SENSOR] Starting program....");
	pinMode(temp_pin, INPUT);
}

void loop() {
	temp_val = analogRead(temp_pin);
	float millivolts= (temp_val / 1024.0) * 3300;
 	float celsius = (millivolts / 10) + 5;
	Serial.print(celsius);
	//Serial.println("Light: %i\tTemp: %f\n", light_val, celsius);
	delay(2000);
}
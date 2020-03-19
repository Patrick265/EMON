#include <string.h>
#include <iostream>
#include <ArduinoJson.h>

class SmartMeter {
	public:
		SmartMeter(String electricity_tariff,
					String equipment_id,
					String gas_equipment_id,
					String identification,
					int energy_delivered_tariff,
					int energy_returned_tariff,
					int power_delivered,
					int power_returned,
					int gas_device_type);

		// String electricity_tariff;
		// String equipment_id;
		// String gas_equipment_id;
		// String identification;
		String electricity_tariff;
		String equipment_id;
		String gas_equipment_id;
		String identification;
		int energy_delivered_tariff;
		int energy_returned_tariff;
		int power_delivered;
		int power_returned;
		int gas_device_type;
		String signature;
};
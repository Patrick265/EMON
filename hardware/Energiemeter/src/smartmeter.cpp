#include "smartmeter.h"

SmartMeter::SmartMeter(String electricity_tariff,
						String equipment_id,
						String gas_equipment_id,
						String identification,
						int energy_delivered_tariff,
						int energy_returned_tariff,
						int power_delivered,
						int power_returned,
						int gas_device_type) 
{;
		this->electricity_tariff = electricity_tariff;
		this->equipment_id = equipment_id;
		this->gas_equipment_id = gas_equipment_id;
		this->identification = identification;
		this->energy_delivered_tariff = energy_delivered_tariff;
		this->energy_returned_tariff = energy_returned_tariff;
		this->power_delivered = power_delivered;
		this->power_returned = power_returned;
		this->gas_device_type = gas_device_type ;
		this->signature = "2019-ETI-EMON-V01-TIMDB-PATJON";
}


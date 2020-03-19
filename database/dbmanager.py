import sqlite3
import paho.mqtt.client as mqttClient
from sqlite3 import Error


class dbManager:

	def __init__(self, location):
		self.dbLocation = location
		self.dbCreate = """CREATE TABLE IF NOT EXISTS iskra_energie (
								id integer PRIMARY KEY AUTOINCREMENT,
								message_id TEXT NOT_NULL,
								energymeter_name TEXT NOT_NULL,
								watt INTEGER NOT_NULL,
								wH REAL NOT_NULL,
								total INTEGER NOT_NULL,
								signature TEXT NOT_NULL,
								timestamp TEXT NOT_NULL
							);"""

		self.dbCreateTemperature = """CREATE TABLE IF NOT EXISTS iskra_temperature (
								id integer PRIMARY KEY AUTOINCREMENT,
								message_id TEXT NOT_NULL,
								outside_temp REAL NOT_NULL,
								inside_temp REAL NOT_NULL,
								signature TEXT NOT_NULL,
								timestamp TEXT NOT_NULL
							);"""

		self.dbSmartmeter = """CREATE TABLE IF NOT EXISTS emon_smartmeter (
							id integer PRIMARY KEY AUTOINCREMENT,
							electricity_tariff TEXT,
							energy_delivered_tariff1 REAL,
							energy_delivered_tariff2 REAL,
							energy_returned_tariff1 REAL,
							energy_returned_tariff2 REAL,
							equipment_id TEXT,
							gas_device_type REAL,
							gas_equipment_id TEXT,
							identification TEXT,
							p1_version TEXT,
							power_delivered REAL,
							power_delivered_l1 REAL,
							power_returned REAL,
							power_returned_l1 REAL,
							timestamp TEXT,
							signature TEXT
						);"""

			
		self.overviewdb = """CREATE TABLE IF NOT EXISTS overview (
							name TEXT,
							table_name TEXT
						);"""
		self.conn = self.create_connection()





	def create_connection(self):
		conn = None
		try:
			conn = sqlite3.connect(self.dbLocation)
			return conn
		except Error as e:
			print(e)

			return conn


	def create_table(self):
		try:
			c = self.conn.cursor()
			c.execute(self.dbCreate)
			c.execute(self.dbCreateTemperature)
			c.execute(self.dbSmartmeter)
			c.execute(self.overviewdb)
			#self.insert_overview()
		except Error as e:
			print(e)

	def insert_iskra_energie(self, message_id, energymeter_name, watt, wH, total, signature, timestamp):
		sql = ''' INSERT INTO iskra_energie(message_id, energymeter_name, watt, wH, total, signature, timestamp)
					VALUES(?,?,?,?,?,?,?)'''
		try:
			cur = self.conn.cursor()
			result = cur.execute(sql, (str(message_id), str(energymeter_name), watt, wH, total,
						  str(signature), str(timestamp)))
			self.conn.commit()
			result = self.conn.commit()
			# return cur.lastrowid
		except Error as e:
			print(e)
		except Exception as e:
			print("Exception in _query: {e}")
		

	def insert_iskra_temperature(self, message_id, outside_temp, inside_temp, signature, timestamp):
		sql = ''' INSERT INTO iskra_temperature(message_id, outside_temp, inside_temp, signature, timestamp)
					VALUES(?,?,?,?,?)'''
		try:
			cur = self.conn.cursor()
			result = cur.execute(sql, (str(message_id),outside_temp, inside_temp, str(signature), str(timestamp)))
			self.conn.commit()
			result = self.conn.commit()
			# return cur.lastrowid
		except Error as e:
			print(e)
		except Exception as e:
			print("Exception in _query: {e}")	

	def insert_emon_smartmeter(self, electricity_tariff, energy_delivered_tariff1, energy_delivered_tariff2, 
							energy_returned_tariff1, energy_returned_tariff2, equipment_id, gas_device_type, 
							gas_equipment_id, identification, p1_version, power_delivered, power_delivered_l1, 
							power_returned, power_returned_l1, timestamp, signature):
		sql = ''' INSERT INTO emon_smartmeter(electricity_tariff, energy_delivered_tariff1, energy_delivered_tariff2, 
							energy_returned_tariff1, energy_returned_tariff2, equipment_id, gas_device_type, 
							gas_equipment_id, identification, p1_version, power_delivered, power_delivered_l1, 
							power_returned, power_returned_l1, timestamp, signature)
			VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'''
		try:
			cur = self.conn.cursor()
			result = cur.execute(sql, (str(electricity_tariff),
										energy_delivered_tariff1,
										energy_delivered_tariff2,
										energy_returned_tariff1,
										energy_returned_tariff2, 
										str(equipment_id),
										gas_device_type, 
										str(gas_equipment_id),
										str(identification),
										str(p1_version),
										power_delivered,
										power_delivered_l1,
										power_returned,
										power_returned_l1,
										str(timestamp),
										str(signature)))
			self.conn.commit()
			result = self.conn.commit()
			# return cur.lastrowid
		except Error as e:
			print(e)
		except Exception as e:
			print("Exception in _query: {e}")	

	def setup(self):
		if self.conn is not None:
			self.create_table()
		else:
			print("Error! cannot create the database connection.")

	def retrieve_iskra_energie_last(self):
		cur = self.conn.cursor()
		cur.execute("SELECT * FROM iskra_energie ORDER BY id DESC LIMIT 1")
		result = cur.fetchone()
		return result

	def insert_overview(self):
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Patjon energiemeter\", \"iskra_energie\")'''
		print(sql)
		self.insert(sql)
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Overige energiemeter\", \"emon_smartmeter\")'''
		print(sql)
		self.insert(sql)
		
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Temperatuur Sensor\", \"iskra_temperature\")'''
		print(sql)
		self.insert(sql)



	def insert(self, query):
		try:
			cur = self.conn.cursor()
			result = cur.execute(query)
			self.conn.commit()
			result = self.conn.commit()
			# return cur.lastrowid
		except Error as e:
			print(e)
		except Exception as e:
			print("Exception in _query: ")
			print(e)
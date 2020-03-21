import sqlite3

from sqlite3 import Error
import logging
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
								temperature REAL NOT_NULL,
								signature TEXT NOT_NULL,
								timestamp TEXT NOT_NULL
							);"""

		self.dbSimonMeter = """CREATE TABLE IF NOT EXISTS simon_meter (
								id integer PRIMARY KEY AUTOINCREMENT,
								energymeter_name TEXT NOT_NULL,
								watt INTEGER NOT_NULL,
								wH REAL NOT_NULL,
								total INTEGER NOT_NULL,
								signature TEXT NOT_NULL,
								timestamp TEXT NOT_NULL
							);"""

		self.overviewdb = """CREATE TABLE IF NOT EXISTS overview (
							name TEXT,
							table_name TEXT
						);"""
		logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')

		self.conn = self.create_connection()

	def create_connection(self):
		conn = None
		try:
			conn = sqlite3.connect(self.dbLocation)
			return conn
		except Error as e:
			logging.error(e)

			return conn

	def create_table(self):
		try:
			c = self.conn.cursor()
			c.execute(self.dbCreate)
			c.execute(self.dbCreateTemperature)
			c.execute(self.dbSimonMeter)
			c.execute(self.overviewdb)
			#self.insert_overview()
		except Error as e:
			logging.error(e)

	def setup(self):
		if self.conn is not None:
			self.create_table()
		else:
			logging.error("Error! cannot create the database connection.")

	def insert_iskra_energie(self, message_id, energymeter_name, watt, wH, total, signature, timestamp):
		sql = '''INSERT INTO iskra_energie(message_id, energymeter_name, watt, wH, total, signature, timestamp)
					VALUES(?,?,?,?,?,?,?)'''
		logging.info("Inserting data into iskra energie")
		try:
			cur = self.conn.cursor()
			cur.execute(sql, (str(message_id), str(energymeter_name), watt, wH, total,
						  str(signature), str(timestamp)))
			self.conn.commit()
		except Error as e:
			logging.error(e)
		except Exception as e:
			logging.error("Exception in _query: %s", e)

	def insert_iskra_temperature(self, message_id, temperature, signature, timestamp):
		sql = '''INSERT INTO iskra_temperature(message_id, temperature, signature, timestamp)
					VALUES(?,?,?,?)'''
		logging.info("Inserting data into iskra temperature")
		try:
			cur = self.conn.cursor()
			cur.execute(sql, (str(message_id),temperature, str(signature), str(timestamp)))
			self.conn.commit()
		except Error as e:
			logging.error(e)
		except Exception as e:
			logging.error("Exception in _query: %s", e)

	def insert_simon_energiemeter(self, energymeter_name, watt, wH, total, signature, timestamp):
		sql = '''INSERT INTO simon_meter(energymeter_name, watt, wH, total, signature, timestamp)
							VALUES(?,?,?,?,?,?)'''
		logging.info("Inserting data into simon energie meter")
		try:
			cur = self.conn.cursor()
			cur.execute(sql, (str(energymeter_name), watt, wH, total, str(signature), str(timestamp)))
			self.conn.commit()
		except Error as e:
			logging.error(e)
		except Exception as e:
			logging.error("Exception in _query: %s", e)

	def insert_tom_energiemeter(self, energymeter_name, watt, wH, total, timestamp):
		sql = '''INSERT INTO tom_energymeter(energymeter_name, watt, wH, total, timestamp)
							VALUES(?,?,?,?,?)'''
		logging.info("Inserting data into tom energiemeter")
		try:
			cur = self.conn.cursor()
			cur.execute(sql, (str(energymeter_name), watt, wH, total,str(timestamp)))
			self.conn.commit()
		except Error as e:
			logging.error(e)
		except Exception as e:
			logging.error("Exception in _query: %s", e)

	def retrieve_iskra_energie_last(self):
			cur = self.conn.cursor()
			cur.execute("SELECT * FROM iskra_energie ORDER BY id DESC LIMIT 1")
			result = cur.fetchone()
			logging.info("Retrieving from iskra energy last row")
			return result

	def retrieve_tom_energy_last(self):
		cur = self.conn.cursor()
		cur.execute("SELECT * FROM tom_energymeter ORDER BY id DESC LIMIT 1")
		logging.info("Retrieving from tom energy last row")
		result = cur.fetchone()
		return result

	def retrieve_simon_energie_last(self):
		cur = self.conn.cursor()
		cur.execute("SELECT * FROM simon_meter ORDER BY id DESC LIMIT 1")
		logging.info("Retrieving from simon energy last row")
		result = cur.fetchone()
		return result

	def insert_overview(self):
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Patjon energiemeter\", \"iskra_energie\")'''
		logging.info(sql)
		self.insert(sql)
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Overige energiemeter\", \"emon_smartmeter\")'''
		logging.info(sql)
		self.insert(sql)
		
		sql = '''INSERT INTO overview(name, table_name)VALUES(\"Temperatuur Sensor\", \"iskra_temperature\")'''
		logging.info(sql)
		self.insert(sql)

	def insert(self, query):
		try:
			cur = self.conn.cursor()
			result = cur.execute(query)
			self.conn.commit()
			result = self.conn.commit()
			# return cur.lastrowid
		except Error as e:
			logging.error(e)
		except Exception as e:
			logging.error("Exception in _query: ")
			logging.error(e)
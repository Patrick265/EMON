import sqlite3
import paho.mqtt.client as mqttClient
from sqlite3 import Error


class dbManager:

	def __init__(self, location):
		self.dbLocation = location
		self.dbCreate = """CREATE TABLE IF NOT EXISTS sensordata (
								id integer PRIMARY KEY AUTOINCREMENT,
								message_id TEXT NOT_NULL,
								energymeter_name TEXT NOT_NULL,
								watt INTEGER NOT_NULL,
								wH REAL NOT_NULL,
								signature TEXT NOT_NULL,
								timestamp TEXT NOT_NULL
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
		except Error as e:
			print(e)

	def insert_data(self, message_id, energymeter_name, watt, wH, signature, timestamp):
		sql = ''' INSERT INTO sensordata(message_id, energymeter_name, watt, wH, signature, timestamp)
					VALUES(?,?,?,?,?,?)'''
		try:
			cur = self.conn.cursor()
			result = cur.execute(sql, (str(message_id), str(energymeter_name), watt, wH,
						  str(signature), str(timestamp)))
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


	def show_all_data(self):
		cur = self.conn.cursor()
		cur.execute("SELECT * FROM sensordata")

		rows = cur.fetchall()

		for row in rows:
			print(row)

	
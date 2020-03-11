import sqlite3
import paho.mqtt.client as mqttClient
from sqlite3 import Error


class dbManager:

    def __init__(self, location):
        self.dbLocation = location
        self.dbCreate = """CREATE TABLE IF NOT EXISTS sensordata (
                                id integer PRIMARY KEY AUTOINCREMENT,
                                uuid text NOT NULL,
                                name text NOT NULL,
                                watt integer NOT NULL,
                                totalEnergyUse integer NOT NULL,
                                returnedEnergy integer NOT NULL
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


    def insert_data(self, uuid, name, watt, totalEnergyUse, returnedEnergy):
        sql = ''' INSERT INTO sensordata(uuid,name,watt,totalEnergyUse,returnedEnergy)
                    VALUES(?,?,?,?,?) '''
        cur = self.conn.cursor()

        cur.execute(sql, (str(uuid), str(name), watt,
                          totalEnergyUse, returnedEnergy))
        self.conn.commit()
        return cur.lastrowid


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

    
import sqlite3
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

    def create_connection(self, db_file):
        conn = None
        try:
            conn = sqlite3.connect(db_file)
            return conn
        except Error as e:
            print(e)

            return conn

    def create_table(self, conn):
        try:
            c = self.conn.cursor()
            c.execute(self.dbCreate)
        except Error as e:
            print(e)

    def setup(self):
        self.conn = self.create_connection(self.dbLocation)
        if self.conn is not None:
            # create projects table
            self.create_table(self.conn)

            # create tasks table
        else:
            print("Error! cannot create the database connection.")

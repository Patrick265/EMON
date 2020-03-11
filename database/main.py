from dbmanager import dbManager
import os


def main():
    print("Starting DB Manager!")
    db = dbManager(os.path.dirname(os.path.realpath(__file__)) + "/emon.db")
    db.setup()


if __name__ == "__main__":
    main()

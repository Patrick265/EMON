from dbmanager import dbManager
import os
import uuid


def main():
    print("Starting DB Manager!")
    db = dbManager(os.path.dirname(os.path.realpath(__file__)) + "/emon.db")
    db.setup()
    #test_data(db)
    db.show_all_data()


def test_data(db):
    totalenergy = 40
    returnedEnergy = 20
    for x in range(0, 35):
        result = db.insert_data(uuid.uuid1(), "ISKRA MT382",
                                40, totalenergy, returnedEnergy)
        totalenergy += 40
        returnedEnergy += 20
        print(result)


if __name__ == "__main__":
    main()

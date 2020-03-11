from dbmanager import dbManager
import os
import uuid


def main():
    print("Starting DB Manager!")

    broker_address="sendlab.avansti.nl"
    port = 11883
    user = "smartmeter_admin"
    password = "s3_sm4rtm3t3r"
    topic = "smartmeter/log"
    client = mqttClient.Client("Python")
    client.username_pw_set(user, password=password)
    client.on_connect= on_connect
    client.on_message = on_message

    client.connect(broker_address, port=port)
    client.loop_start()

    while Connected != True:
    time.sleep(0.1)
    client.subscribe(topic, 1)

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


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        global Connected
        Connected = True
    else:
        print("Connection failed")

def on_message(client, userdata, message):
    mes = str(message.payload.decode("utf-8"))
   
    print(mes)
    #parsed_js = (json.loads(mes))
    #temp = ""
    #hum = ""
    #energy = ""
    #if 'temp' in parsed_js and 'humidity' in parsed_js and 'energy' in parsed_js:
    #    temp = str((parsed_js['temp']))
    #    hum = str((parsed_js['humidity']))
    #    energy = str((parsed_js['energy']))
    #    print('temp: ' + temp + ' -- humidity: ' + hum + ' -- energy: ' + energy + ' -- time: ' + datetime.now().strftime("%d-%b-%Y-%H:%M:%S"))
    #    dynamic_query = "INSERT INTO testtable (time, temp, humidity, energy) VALUES('" + datetime.now().strftime("%d-%b-%Y-%H:%M:%S") + "'," + temp + "," + hum + "," + energy + ")"
       
    #    cursor.execute(dynamic_query)
    #    connection.commit()
    #    print("inserted: " + dynamic_query)
   
    #else:
    #    print('object not of the correct format')

    
    

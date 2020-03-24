from clearblade.ClearBladeCore import System
import time

#System credentials
SystemKey = "b4bab3e70baaaa8cae8397bff6be01"
SystemSecret = "9CBFB3E70BC8D0D1F0C4EE8DA79501"
mySystem = System(SystemKey,SystemSecret)
#User credentials
email = "varoonpartha04@gmail.com"
password = "test123"
#Authenticating as username
username = mySystem.User(email,password)

#use username to message
mqtt = mySystem.Messaging(username)

def on_connect(client, userdata, flags, rc):
    # When we connect to the broker, subscribe to the analytics topic
    client.subscribe("analytics")

def on_message(client, userdata, message):
    # When we receive a message, print it out
    print("Received message '" + message.payload.decode("utf-8") + "' on topic '" + message.topic + "'")

# Connect callbacks to client
mqtt.on_connect = on_connect
mqtt.on_message = on_message

mqtt.connect()
while(True):
    time.sleep(1)  # wait for messages

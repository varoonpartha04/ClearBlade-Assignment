from clearblade.ClearBladeCore import System
import time
import psutil
import json
from datetime import datetime

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
mqtt.connect()
code = mySystem.Service("storedata")

while(1):
    unixTimeStamp = float(time.time())
    cpu = psutil.cpu_percent()
    mqtt.publish("CpuUsageInfo",json.dumps({"usageinpercentage" : str(cpu),"timestamp" : str(unixTimeStamp)}))
    time.sleep(10)

mqtt.disconnect()

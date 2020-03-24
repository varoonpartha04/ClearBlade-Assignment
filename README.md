# ClearBlade-Assignment


Pre-requisites to run the program

1. The two source code files attached, create two microservices 
    1. PublishToDataStore.js and
    2. FindAverageCpuUsage.js 
2. Create a trigger in UI for PublishToDataStore.js
     ![Screenshot of my trigger](https://github.com/varoonpartha04/ClearBlade-Assignment/blob/master/docs/Screen_Shot_of_Trigger.png)
     Link to my trigger(https://platform.clearblade.com/console/system/b4bab3e70baaaa8cae8397bff6be01/code/services/PublishToDataStore?tab=Triggers) 
3. Create Timer in UI for FindAverageCpuUsage.js
     ![Screenshot of my timer](https://github.com/varoonpartha04/ClearBlade-Assignment/blob/master/docs/Screen_Shot_of_Timer.png) 
      Link to my timer(https://platform.clearblade.com/console/system/b4bab3e70baaaa8cae8397bff6be01/code/services/FindAverageCpuUsage?tab=Timers)


Steps to run the program 

1. Start the analytics_client.py in a terminal, make sure you are authenticated and subscribed to topic ‘analytics’
2. Start message_producer.py in another new terminal, make sure you are authenticated and pushing records to topic ‘CpuUsageInfo’


Please reach out to varoonpartha04@gmail.com for further questions. 

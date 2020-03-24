/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */
/*
Query CpuUsage for data published in the last 60 seconds and
find the average CPU usage.
Publish this data to 'analytics' topic every 60 seconds.
*/
 function FindAverageCpuUsage(req,resp){
    ClearBlade.init({request:req});
    var analysis = function() {
        var q =ClearBlade.Query({collectionName:"CpuUsage"});
        var prevTime =parseInt( Date.now()/1000) -60;
        q.greaterThan("timestamp",prevTime);
        var averageCPUusage;
        q.fetch(function(err,itemsArray){
            if(err)
            resp.error(itemsArray);
            else{
                var sum, count;
                sum = count = 0;
                log(itemsArray);
                for(var i in itemsArray.DATA){
                    sum += parseFloat(itemsArray.DATA[i].usageinpercentage);
                    count++;
                }
                averageCPUusage = sum/count;
            }
        });
        var mqtt = ClearBlade.Messaging();
	    mqtt.subscribe('analytics', function(err, message) {
	  	if (err) {
	  	} else {
              log(averageCPUusage);
              mqtt.publish("analytics",averageCPUusage.toString());
	  	}
  	});
    }
    analysis();

    resp.success("Success");
}

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
 This function will be triggered whenever new data is published
 into the topic 'CpuUsageInfo'. It parses the published record
 and stores it into CpuUsage db.
 */

function PublishToDataStore(req,resp){
  var myString = req.params.body;
	var dataList = myString.split(',');
	var cpuUsage = dataList[0];
	var localTimeStamp = dataList[1];
	//Separating the value of cpu usage percentage using regex
  var myCpuRegexp = /{\"usageinpercentage\":\s+\"(.*)\"/g;
  var final_cpu = myCpuRegexp.exec(cpuUsage);
  var fcpu = final_cpu[1];
	//Separating the value of timestamp usage percentage using regex
  var myTsRegexp = /\"timestamp\":\s+\"(.*)\"}/g;
  var final_ts = myTsRegexp.exec(localTimeStamp);
  var fTs = final_ts[1];
	ClearBlade.init({request:req});

 	var insertintoCollection = function() {
		var collection = ClearBlade.Collection({collectionName:"CpuUsage"});
		var newRow = {
			usageinpercentage: fcpu,
			timestamp:fTs
		};
		var callback = function(err, data) {
			if (err) {
				resp.error(data);
			} else {
				resp.success("Data stored successfully");
			}
		};
		collection.create(newRow, callback);
	};

	insertintoCollection();
}

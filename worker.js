var Odeskify = require('./lib/odeskify'),
    config = require('./config/config'),
    request = require('request');

var cronJob = require('cron').CronJob,
    lastJobID = null;

odeskify = new Odeskify(config);

new cronJob('* 0,10,20,30,40,50 * * * *', function(){
    odeskify.getFirst(function(data){
        if(lastJobID !== data.id) {
            request({
                url: config.webhook_url,
                method: "POST",
                json: {payload: data}
            }, function(err, resp, body){
                if (err) throw err;
                console.log(body);
            })
            lastJobID = data.id;
        }
    });
}, null, true);


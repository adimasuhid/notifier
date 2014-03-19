var odesk = require('node-odesk');

var Odeskify = function(details){
    var                 key = details.app_key,
                     secret = details.app_secret,
               access_token = details.access_token,
        access_token_secret = details.access_token_secret,
                      query = details.query;

    this.getAccessToken = function(){
        return access_token;
    }

    this.getAccessTokenSecret = function(){
        return access_token_secret;
    }

    this.getQuery = function(){
        return query;
    }

    this.getKey = function(){
        return key;
    }

    this.getSecret = function(){
        return secret;
    }
}

Odeskify.prototype.setup = function(){
    var o = new odesk(this.getKey(), this.getSecret());

    o.OAuth.accessToken = this.getAccessToken();
    o.OAuth.accessTokenSecret = this.getAccessTokenSecret();

    return o;
}

Odeskify.prototype.getData = function(callback){
    var o = this.setup(),
        query = 'profiles/v2/search/jobs.json?q='+ this.getQuery() +'&sort=create_time%20desc';

    o.get(query, function(error, data){
        callback(data);
    });
}

Odeskify.prototype.getFirst = function(callback){
    this.getData(function(data){
        var firstData = data.jobs[0];

        callback(firstData);
    });
}

module.exports = Odeskify;

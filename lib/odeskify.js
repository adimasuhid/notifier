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

Odeskify.prototype.getData = function(){
    var o = new odesk(this.getKey(), this.getSecret()),
        query = 'profiles/v2/search/jobs.json?q='+ this.getQuery() +'&sort=create_time%20desc'

    o.OAuth.accessToken = this.getAccessToken();
    o.OAuth.accessTokenSecret = this.getAccessTokenSecret();

    o.get(query, function(error, data){
        console.log("Rails Jobs:\n", error || data, "\n");
    });

}

module.exports = Odeskify;

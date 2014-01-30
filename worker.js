var Odeskify = require('./lib/odeskify'),
    config = require('./config/config')

odeskify = new Odeskify(config);
odeskify.getData();

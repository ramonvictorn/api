const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/',{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// , {useMongoClient:true}

module.exports = mongoose;
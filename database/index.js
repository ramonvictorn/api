const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/',{ useNewUrlParser: true });
// mongoose.connect('mongodb://ramon:Lantec2018@ds125912.mlab.com:25912/agendador-beta',{ useNewUrlParser: true });

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// , {useMongoClient:true}

module.exports = mongoose;
//start //end //date //tickets[Tid1,......Tid20]

var Ticket = require('./ticket');

var mongoose = require('mongoose');

var show_schema = new mongoose.Schema({
    start: {type: String, default: "00:00:00"},
    tickets: [{type: mongoose.Schema.Types.ObjectId, ref: "ticket"}]
}); 

module.exports = mongoose.model("shows",show_schema);
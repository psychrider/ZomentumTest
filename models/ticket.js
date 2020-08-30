// ticketID
//userdetails{ name, phone, booking time}
//show-timing{ start, end}

var mongoose = require('mongoose');

var ticket_schema = new mongoose.Schema({
    // MONGODB WILL ADD TICKET ID HERE
    user_detail: {
        name: String,
        phone: Number,
        booking_time: {type: String, default: "00:00:00"}
    },
    start: {type:String, default:"00:00:00"},
    //expired: { type: Number, default: 0}
});

module.exports = mongoose.model("tickets",ticket_schema);
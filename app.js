var express        = require('express'),
    app            = express(),
    mongoose       = require('mongoose'),
    bodyParser     = require("body-parser"),
    Ticket         = require('./models/ticket.js'),
    Show           = require('./models/show.js'),
    methodOverride = require('method-override');


// Connection to database
mongoose.connect('mongodb://localhost:27017/new_DB_3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// for PUT and DELETE methods
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));//don't ask why
app.set("view engine","ejs");

// index route to display all shows 
app.get('/show',function(req,res){
    Show.find({},function(err,show){
        if(err){
            console.log(err);
        }
        else{
            res.send(show);
        }
    })
})
//create route
app.post('/show',function(req,res){
    var start = "10:00:00";
    Show.create({
        start: start,
    },function(err,show){
        if(err){
            console.log(err);
        }
        else{
            console.log("new show added");
            res.send(show);
        }
    })
})

//TICKET ROUTES---

//An endpoint to book a ticket using a user’s name, phone number, and timings.
app.post('/ticket',function(req,res){
    // data hard-coded for testing
    var ud = {
        name: "abcdefghj",
        phone: 8834544944,
        booking_time: "09:30:00"
    }
    Ticket.create({
        user_detail:ud,
        start:"10:00:00",
    },function(err,ticket){
        Show.find({start : "10:00:00"},function(err,show){
            console.log(show);
            if(typeof show[0].tickets == 'undefined' || show[0].tickets.length < 20){
                if(err){
                    console.log(err);
                }
                else{
                    if(typeof (show[0].tickets) == 'undefined'){ show[0].tickets.push(ticket._id);}
                    else show[0].tickets.push(ticket._id);       
                    res.send("ticket booked");
                }
            }
        })
    })
})


//An endpoint to update a ticket timing.
app.put('/ticket/:id',function(req,res){
    Ticket.findByIdAndUpdate(req.params.id,{start: req.body.start},{new:true},function(err,updatedTicket){
        if(err){
            console.log(err);
        }
        else{
            console.log("ticket updated");
            res.send(updatedTicket);
        }
    })
})


//An endpoint to view all the tickets for a particular time.
app.get('/ticket',function(req,res){
    Ticket.find({start:req.query.start},function(err,ticket){
        res.send(ticket);
    })    
})

//An endpoint to delete a particular ticket.
app.delete('/ticket/:id',function(req,res){
    Ticket.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        else{
            res.send("deleted!")
        }
    })
})

// An endpoint to view the user’s details based on the ticket id.

app.get('/ticket/:id',function(req,res){
    Ticket.findById(req.params.id,function(err,ticket){
        //show user
        res.send({ticket:ticket});
    })
})

app.listen(3000,function(){
    console.log("server is litening");
})

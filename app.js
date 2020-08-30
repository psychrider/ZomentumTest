var express = require('express');
var app = express()
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var Ticket = require('./models/ticket.js');
var Show = require('./models/show.js');
var methodOverride = require('method-override');
const { findByIdAndDelete } = require('./models/ticket.js');


mongoose.connect('mongodb://localhost:27017/new_DB_3', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));//don't ask why
app.set("view engine","ejs");

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
//--------------------------------------------------------------
// app.get('/show/new',function(req,res){
//     res.render("new_show.ejs");
// })

//TICKET ROUTES---

app.get('/ticket',function(req,res){
    Ticket.find({},function(err,ticket){
        res.send(ticket);
    })    
})

//start:req.query.start
app.get('/ticket/:id',function(req,res){
    Ticket.findById(req.params.id,function(err,ticket){
        //show user
        res.send({ticket:ticket});
    })
})
//NEW TICKET CREATION
app.post('/ticket',function(req,res){
    var ud = {
        name: "rbaterae",
        phone: 99934343,
        booking_time: "07:30:00"
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

//SHOW FORM FOR NEW TICKET
// app.get('/ticket/new',function(req,res){
//     Show.find({},function(err,show){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(show);
//             res.render("new_ticket.ejs",{show:show});
//         }
//     })
// })
//EDIT
app.get('/ticket/:id/edit',function(req,res){
    res.send("id for ticket to be updated is taken form database and then redirected to update route")
})
//UPDATE ROUTE
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
//DELETE ROUTE
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


// var name = "shivam pandey";
// var number = "9984473834";
// var booktime = Date.now;

// Ticket.create({

//     },function(){

// })

// })
app.listen(3000,function(){
    console.log("server is litening");
})

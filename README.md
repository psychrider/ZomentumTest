# Zomentum Hiring Assignment
### Back-End
#### Used
- mongoDB
- Express.js

### Business Cases: 
- [An endpoint to book a ticket using a user’s name, phone number, and timings.](./app.js)
- [An endpoint to update a ticket timing.](./app.js)
- [An endpoint to view all the tickets for a particular time.](./app.js)
- [An endpoint to delete a particular ticket.](./app.js)
- [An endpoint to view the user’s details based on the ticket id.](./app.js)
- [Mark a ticket as expired if there is a diff of 8 hours between the ticket timing and current time.](./app.js)

### Schema:
The Database Schemas were made with following assumptions-
- the [show](./models/show.js) needs to be created for a specific time, then [tickets](./models/ticket.js) for the show exist.

- ![show schema](./ss/showSchemapng.png)
- ![show schema](./ss/showSchema.png)
- ![ticket schema](./ss/tickeSchema.png)

### POSTMAN Screenshots:
- ![An endpoint to book a ticket using a user’s name, phone number, and timings.](./ss/t1.png)
- ![An endpoint to update a ticket timing.](./ss/t2.png)
- ![An endpoint to view all the tickets for a particular time.](./ss/t3.png)
- ![An endpoint to delete a particular ticket.](./ss/t4.png)
- ![An endpoint to view the user’s details based on the ticket id.](./ss/t5.png)


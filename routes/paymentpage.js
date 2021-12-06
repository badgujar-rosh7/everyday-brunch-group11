const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const { route } = require('./users');
const { Router, response } = require('express');
const { ObjectId } = require('bson');
const cartData = data.cart;
const userData = data.user;
var Publishable_Key = 'pk_test_51K0juZCsyI93mWA70otfl7zDJgeF6RXUZjSNpUk20pDMRV7Ia6a5mqYOBCEr3aHp5Wh21CJQiDKdTTiIY7BmujbG00WCFZBW95'
var Secret_Key = 'sk_test_51K0juZCsyI93mWA7U5FlUvzECuroJrru73V3MrVSWXfgVCY0xrANdpDqEEmzUTCGNeNwRlMAH0MtOMDJUJ9dfgar00yMxJKw4V'
const stripe = require('stripe')(Secret_Key) 



    router.post('/', async(req, res)=>{ 

        // Moreover you can take more details from user 
        // like Address, Name, etc from form
        var num = Math.floor(Math.random() * 90000) + 10000;

    if(req.session.user){
        stripe.customers.create({ 
            email: req.body.stripeEmail, 
            source: req.body.stripeToken, 
        }) 
        .then((customer) => { 
    
            return stripe.charges.create({ 
                amount: req.session.user.cartvalue,    // Charing Rs 25 //pass saem value as previous page
                description: req.session.user.cartdescription, /// product names
                currency: 'USD', 
                customer: customer.id 
            }); 
        }) 
        .then((charge) => { 
                req.session.user.paymentstatus=true;
            //add entry to database

    

            ////////////////////
    
            ////mailing system
            // let mailto=req.session.user.email
            // var transporter = nodemailer.createTransport({
            //   service: 'gmail',
            //   auth: {
            //     user: 'sudronikbusiness@gmail.com',
            //     pass: '8454949819'
            //   }
            // });
            
            // var mailOptions = {
            //   from: 'sudronikbusiness@gmail.com',
            //   to: mailto,
            //   subject: `order placed with `,
            //   text: 'placed order. you can get your receipt here'
            // };
            
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ' + info.response);
            //   }
            // });
            // //////
        }).then(()=>{



            console.log("inside")
            let order= cartData.UpdateOrderIdByUserId(req.session.user.userId,num);



        }).then(()=>{
            console.log("ioioioioi")
            let neworder= cartData.createOrder(req.session.user.userId,num);
            console.log(neworder)
        })
        .catch((err) => { 
            res.send(err)    // If some error occurs 
        }); 

    

    } else {
            res.send({error:'need to login to access this page'})
    }  
    
     setTimeout(() => {


        res.redirect('/')
        
    }, 9000);


    }) 
    module.exports=router

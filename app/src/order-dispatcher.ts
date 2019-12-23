import express = require("express");
import mysql = require("mysql");
import pool from './db/database'

const router = express.Router();
export default router;

router.get('',(req, res) => {
   res.send("Orders");
});


router.post('',(req, res) => {

    if (!req.body.id && req.body.date && req.body.customerId && typeof req.body.id == 'string' && req.body.id.trim().length>0){
        res.status(400);
        res.send();
        return;
    }
    pool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err){
            if (err){
                res.status(500);
                res.send();
                return;
            }
            // connection.commit();
            console.log(req.body.orderDetails.length);
            console.log(req.body);
            console.log(req.body.orderDetails[0]);

            //save order
            connection.query('INSERT INTO orders values(?,?,?)',[req.body.id,req.body.date,req.body.customerId],function (err,results ) {
                    if (err || results.affectedRows==0){
                        connection.rollback();
                        res.status(500);
                        res.send("error in orders");
                        return;
                    }

                for (var i = 0; i <req.body.orderDetails.length ; i++) {

                    //Save orderDetials
                    connection.query('INSERT INTO orderDetails VALUES (?,?,?,?)',[req.body.id,req.body.orderDetails[i].itemCode,req.body.orderDetails[i].unitPrice,req.body.orderDetails[i].qty],function (err,results) {
                        if (err || results.affectedRows==0){
                            connection.rollback();
                            res.status(500);
                            res.send("error in orderDetails");
                            return;
                        }
                    });
                    //get qtyOnHand
                    connection.query('Update item SET qty=qty-? WHERE code=?',[req.body.orderDetails[i].qty,req.body.orderDetails[i].itemCode],function (err,results) {
                        if (err || results.affectedRows==0){
                            connection.rollback();
                            res.status(500);
                            res.send("error in orderDetails");
                            return;
                        }
                        console.log("Item updated!");
                    });



                }
                connection.commit();
                res.status(201);
                res.send("<h1>Order Detail inserted!!</h1>");

            });

        });


    })
});

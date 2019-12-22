import express = require("express");
import mysql = require("mysql");
import pool from './db/database'

const router = express.Router();
export default router;

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
            connection.query('INSERT INTO orders vlaues(?,?,?)',[req.body.id,req.body.date,req.body.customerId],function (err ) {
                    if (err){
                        connection.rollback();
                        res.status(500);
                        res.send();
                        return;
                    }
                    connection.query('INSERT INTO orderDetails VALUES (?,?,?,?)',function (err) {
                        if (err){
                            connection.rollback();
                            res.status(500);
                            res.send();
                            return;
                        }
                    });

            })

        })


    })
});

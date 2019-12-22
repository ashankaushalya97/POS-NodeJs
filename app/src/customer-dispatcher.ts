import express = require("express");
import mysql = require("mysql");
import pool from "./db/database";

const router = express.Router();
export default router;

router.get('',(req, res) => {
   pool.query('SELECT * FROM customer',(err, results) => {
       res.send(results);
   })
});

router.post('',(req, res) => {

    if (req.body.id && req.body.name && req.body.address && typeof req.body.id == 'string' && req.body.id.trim().length>0){

        pool.query('INSERT INTO customer values (?,?,?)',[req.body.id,req.body.name,req.body.address],(err, results) => {
            if (err || results.affectedRows == 0){
                console.log(err);
                res.status(500);
                return;
            }
            res.status(201);
            res.send(req.body.id);
        });

    }else{
        res.status(400);
    }


});

router.put('',(req, res) => {
    // language=SQL
    pool.query('UPDATE customer SET name=? , address=? WHERE id=?',[req.body.name,req.body.address,req.body.id] ,(err, results) => {
        if (err){
            res.status(500);
            res.send("error!");
            return;
        }
        res.status(204);
    })
});

router.delete('/:id',(req, res) => {
    console.log(req.params.id);

    // language=SQL
    // pool.query('DELETE FROM customer where id=?',req.get("id") ,(err, results) => {
    //     if (err){
    //         res.status(500);
    //         res.send("error!");
    //         return;
    //     }
    //     res.status(204);
    // })
});


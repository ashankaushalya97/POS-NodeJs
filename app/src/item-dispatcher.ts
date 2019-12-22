import express = require("express");
import mysql = require("mysql");
import pool from "./db/database";

const router = express.Router();
export default router;

router.get('',(req, res) => {
    pool.query('SELECT * FROM item',(err, results) => {
        res.send(results);
    })
});

router.post('',(req, res) => {

    if (req.body.code && req.body.description && req.body.qty && req.body.unitPrice && typeof req.body.code == 'string' && req.body.code.trim().length>0){

        pool.query('INSERT INTO item values (?,?,?,?)',[req.body.code,req.body.description,req.body.qty,req.body.unitPrice],(err, results) => {
            if (err || results.affectedRows == 0){
                console.log(err);
                res.status(500);
                return;
            }
            res.status(201);
            res.send(req.body.code);
        });

    }else{
        res.status(400);
        res.send()
    }


});

router.put('/:id',(req, res) => {
    if (!req.body.code && req.body.description && req.body.qty && req.body.unitPrice && typeof req.body.code == 'string' && req.body.code.trim().length>0 && req.params.id==req.body.code){
        res.status(400);
        res.send();
        return;
    }

    // language=SQL
    pool.query('UPDATE item SET description=? , qty=?,unit_price=? WHERE code=?',[req.body.description,req.body.qty,req.body.unitPrice,req.params.id] ,(err, results) => {
        if (err){
            res.status(500);
            res.send("error!");
            res.send();
            return;
        }
        res.status(204);
        res.send();
    })
});

router.delete('/:id',(req, res) => {
    console.log(req.params.id);

    // language=SQL
    pool.query('DELETE FROM item where code=?',[req.params.id] ,(err, results) => {
        if (err){
            res.status(500);
            res.send("error!");
            return;
        }
        res.status(204);
        res.send();
    })
});


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = __importDefault(require("./db/database"));
var router = express.Router();
exports.default = router;
router.get('', function (req, res) {
    res.send("Orders");
});
router.post('', function (req, res) {
    if (!req.body.id && req.body.date && req.body.customerId && typeof req.body.id == 'string' && req.body.id.trim().length > 0) {
        res.status(400);
        res.send();
        return;
    }
    database_1.default.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                res.status(500);
                res.send();
                return;
            }
            console.log(req.body.orderDetails.length);
            console.log(req.body);
            console.log(req.body.orderDetails[0]);
            connection.query('INSERT INTO orders values(?,?,?)', [req.body.id, req.body.date, req.body.customerId], function (err, results) {
                if (err || results.affectedRows == 0) {
                    connection.rollback();
                    res.status(500);
                    res.send("error in orders");
                    return;
                }
                for (var i = 0; i < req.body.orderDetails.length; i++) {
                    connection.query('INSERT INTO orderDetails VALUES (?,?,?,?)', [req.body.id, req.body.orderDetails[i].itemCode, req.body.orderDetails[i].unitPrice, req.body.orderDetails[i].qty], function (err, results) {
                        if (err || results.affectedRows == 0) {
                            connection.rollback();
                            res.status(500);
                            res.send("error in orderDetails");
                            return;
                        }
                    });
                }
                res.status(201);
                res.send("<h1>Order Detail inserted!!</h1>");
            });
        });
    });
});

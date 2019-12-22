"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var database_1 = __importDefault(require("./db/database"));
var router = express.Router();
exports.default = router;
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
            connection.query('INSERT INTO orders vlaues(?,?,?)', [req.body.id, req.body.date, req.body.customerId], function (err) {
                if (err) {
                    connection.rollback();
                    res.status(500);
                    res.send();
                    return;
                }
                connection.query('INSERT INTO orderDetails VALUES (?,?,?,?)', function (err) {
                    if (err) {
                        connection.rollback();
                        res.status(500);
                        res.send();
                        return;
                    }
                });
            });
        });
    });
});

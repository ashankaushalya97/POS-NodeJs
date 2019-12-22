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
    database_1.default.query('SELECT * FROM item', function (err, results) {
        res.send(results);
    });
});
router.post('', function (req, res) {
    if (req.body.code && req.body.description && req.body.qty && req.body.unitPrice && typeof req.body.code == 'string' && req.body.code.trim().length > 0) {
        database_1.default.query('INSERT INTO item values (?,?,?,?)', [req.body.code, req.body.description, req.body.qty, req.body.unitPrice], function (err, results) {
            if (err || results.affectedRows == 0) {
                console.log(err);
                res.status(500);
                return;
            }
            res.status(201);
            res.send(req.body.code);
        });
    }
    else {
        res.status(400);
        res.send();
    }
});
router.put('/:id', function (req, res) {
    if (!req.body.code && req.body.description && req.body.qty && req.body.unitPrice && typeof req.body.code == 'string' && req.body.code.trim().length > 0 && req.params.id == req.body.code) {
        res.status(400);
        res.send();
        return;
    }
    // language=SQL
    database_1.default.query('UPDATE item SET description=? , qty=?,unit_price=? WHERE code=?', [req.body.description, req.body.qty, req.body.unitPrice, req.params.id], function (err, results) {
        if (err) {
            res.status(500);
            res.send("error!");
            res.send();
            return;
        }
        res.status(204);
        res.send();
    });
});
router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    // language=SQL
    database_1.default.query('DELETE FROM item where code=?', [req.params.id], function (err, results) {
        if (err) {
            res.status(500);
            res.send("error!");
            return;
        }
        res.status(204);
        res.send();
    });
});

const express = require("express");

const keycloak = require('../config/keycloak-config.js').getKeycloak();

const router = express.Router();
const mysqlConnection = require("../database");


router.get("/", keycloak.protect('user'), keycloak.checkSso(), (req, res) => {
    mysqlConnection.query("SELECT * FROM employees", (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

router.get("/:id", keycloak.protect('admin'), keycloak.checkSso(), (req, res) => {
    const { id } = req.params;
    mysqlConnection.query("SELECT * FROM employees WHERE id = ?", [id] , (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
})


router.post("/create", keycloak.protect('admin'), (req, res) => {
    const { id, name, salary } = req.body;
    console.log(req.body)
        const query =  `
        CALL employeeAddOrEdit(?, ?, ?);
    `;

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err) {
            res.json({Status: "Employeed Saved"})
        } else {
            console.log(err);
        }

    })
})

module.exports = router;


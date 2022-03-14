'use strict';
const bcrypt = require('bcryptjs');

const pool = require('../../../dao/db');

const login = (req, res) => {
    let sql = "Select \"isManager\" from auth where \"userId\" = '" + req.query.userId + "'";
    pool.query(sql, (error, results) => {
        if (error) throw error;
        console.log("results.rows[0]: "+results.rows[0]);
        let isManager = results.rows[0]["isManager"]
        console.log("data: " + isManager);
        res.status(200).json({"auth":isManager});
    });
};

const login2 = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    username = username.toLowerCase();

    console.log(username);

    let cols = [username];
    let sql = 'SELECT * FROM public.\"user\" WHERE username = \'' + username + '\' LIMIT 1';
    console.log(sql);
    pool.query(sql, (err, data) => {
        console.log(err);
        if (err) {
            res.json({
                success: false,
                msg: 'An error occured, please try again'
            });
            return;
        }


        // let pswrd = bcrypt.hashSync('123', 9);

        if(data && data.rows.length === 1){
            bcrypt.compare(password, data.rows[0]["password"], (bcryptErr, verified) => {
            // bcrypt.compare(password, pswrd, (bcryptErr, verified) => {

                // console.log("pwd1: " + password);
                // console.log("pwd2: " + data.rows[0]["password"]);
                // console.log("verified: " + verified);
                if(verified){
                    res.json({
                        success: true,
                        username: data.rows[0]["username"],
                        isManager: data.rows[0]["isManager"]
                    });

                    return;
                }else{
                    res.json({
                        success: false,
                        msg: 'Invalid password'
                    });
                }
            });
        }else{
            res.json({
                success: false,
                msg: 'User not found.'
            });
        }
    });
};

module.exports = {
    login,
    login2
};
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

const register = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;

    if(password != passwordConfirm){
        // console.log("asdfasdfasdfasdfasdf");
        res.json({
            success: false,
            message: 'The two passwords are different.'
        });
        return;
    } else {
        username = username.toLowerCase();
    
        let sql = 'SELECT * FROM public.\"user\" WHERE username = \'' + username + '\' LIMIT 1';
        // console.log(sql);
    
        pool.query(sql, (err, data) => {
            // console.log(err);
            if (err) {
                res.json({
                    success: false,
                    message: 'An error occured, please try again'
                });
                return;
            }
            // let pswrd = bcrypt.hashSync('123', 9);
    
            if(data && data.rows.length === 1){
                // return msg: username already exists
                res.json({
                    success: false,
                    message: "Username already exists."
                });
            }else{
                let pswrd = bcrypt.hashSync(password, 9);
                let sqlInsert = 'INSERT INTO public.\"user\"(username, password, "isManager") VALUES (\'' + username + '\', \'' + pswrd + '\', true)';
                // console.log(sqlInsert);
    
                // insert username and pwd to db
                pool.query(sqlInsert, (err, data) => {
                    console.log(err);
                    if (err) {
                        res.json({
                            success: false,
                            message: 'An error occured, please try again'
                        });
                        return;
                    }else{
                        res.json({
                            success: true,
                        });
                        return;
                    }
                });
            }
        });
    }
};

module.exports = {
    login,
    login2,
    register
};

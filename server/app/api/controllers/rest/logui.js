'use strict';

const pool = require('../../../dao/db');

const insert_single_logui_data = (req, res) => {
    // console.log('insert_single_logui_data called!!: ' + JSON.stringify(req.body));

    let logui_data_arr = req.body;
    console.log('logui_data_arr: ' + logui_data_arr);

    let userId = logui_data_arr["applicationSpecificData"]["userID"];
    let type = logui_data_arr["eventDetails"]["type"];
    let trackingType = "";
    let details = JSON.stringify(logui_data_arr["eventDetails"]);
    let eventTimestamp = logui_data_arr["timestamps"]["eventTimestamp"];

    console.log('type: ' + type);

    if(type == "cursorTracking"){
        trackingType = logui_data_arr["eventDetails"]["trackingType"];
    }

    let sql = "INSERT INTO public.\"loguiData\"(" + 
        " user_id, type, tracking_type, details, time_stamp)" +
        "VALUES ('"+ 
        userId + "', '" + 
        type  + "', '" + 
        trackingType  + "', '" + 
        details  + "', '" + 
        eventTimestamp  + "');";

    //console.log('sql: ' + sql);
    pool.query(sql, (error, result) => {
        if (error) return false;
        //console.log('saved');
        res.status(200).json({"result": true});
    });
};

const get_logui_data = (req, res) => {
    let sql = "SELECT * FROM public.\"loguiData\" OFFSET " + req.query.offset + " LIMIT " + req.query.topN + ";";
    let sql2 = "SELECT COUNT(1) FROM public.\"loguiData\";";

    console.log("sql: " + sql);
    console.log("sql2: " + sql2);

    pool.query(sql, (error, results) => {
        if (error) throw error;
        // res.status(200).json({"results": JSON.stringify(results.rows)});
        console.log("results: " + JSON.stringify(results.rows));

        pool.query(sql2, (error, result) => {
            if (error) throw error;
            res.status(200).json({"results": JSON.stringify(results.rows), "totalNumber": JSON.stringify(result.rows[0].count)});
            console.log("totalNumber: " + JSON.stringify(result.rows[0].count));
        })
    });
};

module.exports = {
    insert_single_logui_data,
    get_logui_data,
};
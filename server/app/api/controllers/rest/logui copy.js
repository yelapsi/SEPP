'use strict';

const pool = require('../../../dao/db');

const insert_single_logui_data = (req, res) => {
    // console.log('insert_single_logui_data called!!: ' + JSON.stringify(req.body));

    let logui_data_arr = req.body;
    console.log('logui_data_arr: ' + logui_data_arr);

    let userId = logui_data_arr["applicationSpecificData"]["userID"];
    let type = logui_data_arr["eventDetails"]["type"];
    let eventTimestamp = logui_data_arr["timestamps"]["eventTimestamp"];
    let queryBoxFocus = "";
    let queryBoxLoseFocus = "";
    let queryBoxChange = "";
    let querySubmission = "";
    let leftRailItemMouseMovements = "";
    let leftRailItemMouseClick = "";
    let entityMouseMovements = "";

    if(type == "cursorTracking"){
        let trackingType = logui_data_arr["eventDetails"]["trackingType"];
        if(trackingType == "cursorEnteredViewport"){

        } else if(trackingType == "positionUpdate"){
    
        } else if(trackingType == "cursorLeftViewport"){
    
        }

    } else if(type == "focus"){

    } else if(type == "viewportResize"){

    } else if(type == "viewportFocusChange"){

    } else if(type == "blur"){

    } else if(type == "keyup"){

    } else if(type == "started"){

    } else if(type == "submit"){

    } else if(type == "contextMenuFired"){

    }

    //console.log('eventDetails: ' + logui_data_arr["eventDetails"]["type"]);

    let sql = "INSERT INTO public.\"loguiData\"(" + 
        " query_box_focus, query_box_lose_focus, query_box_change, query_submission, left_rail_item_mouse_movements, left_rail_item_mouse_click, entity_mouse_movements, user_id, time_stamp)" +
        "VALUES ('"+ 
        queryBoxFocus + "', '" + 
        queryBoxLoseFocus  + "', '" + 
        queryBoxChange  + "', '" + 
        querySubmission  + "', '" + 
        leftRailItemMouseMovements  + "', '" + 
        leftRailItemMouseClick  + "', '" + 
        entityMouseMovements  + "', '" + 
        userId  + "', '" + 
        eventTimestamp  + "');";

    //console.log('sql: ' + sql);
    console.log('saved');
    pool.query(sql, (error, result) => {
        if (error) return false;
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
const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123",
    database: "postgres"
})

exports.getAuth = function(userId) {
    
    client.connect();
    
    let sql = "Select \"isManager\" from auth where \"userId\" = '" + userId + "'";

    client.query(sql, (err, res) => {
        let data = false;
        if(!err){
            data = res.rows[0]["isManager"];
        }else{
            console.log(err.message);
        }
        client.end;

        console.log("data3: " + data);
        return data;
    })
};
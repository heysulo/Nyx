/**
 * Created by sulochana on 7/18/17.
 */
var fs = require('fs');
exports.log = function (msg,code) {
    if (code === undefined){
        code = 0;
    }
    var now = new Date();
    var date = now.getFullYear() + "/" + ("0" + now.getMonth()).substr(-2,2) + "/" + ("0" + now.getDate()).substr(-2,2);
    var time = ("0" + now.getHours()).substr(-2,2) + ":" + ("0" + now.getMinutes()).substr(-2,2) + ":" + ("0" + now.getSeconds()).substr(-2,2);
    switch (code){
        case 0:
            //info
            code = "INFO";
            break;
        case 1:
            //warn
            code = "WARN";
            break;
        case 2:
            //error
            code = "ERRR";
            break;
        case 3:
            //crit
            code = "CRIT";
            break;
        case 4:
            //debug
            code = "DBUG";
            break;
        case 5:
            //authenticate
            code = "AUTH";
            break;
        case 6:
            //authenticate
            code = "PING";
            break;
        case 7:
            //authenticate
            code = "ARIA";
            break;
        default:
            //unk
            code = "UNKN";
            break;
    }
    console.log(date,"|",time,"|",code,"|",msg);


    fs.appendFile('nyx_log.txt', date+" | "+time+" | "+code+" | "+msg+"\n", function (err) {
        if (err) {
            // append failed
            console.log(date,"|",time,"|","CRIT","|","Unable to append new entry to the log file.");
        }
    })
};
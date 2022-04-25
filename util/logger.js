const fs = require('fs');

class Logger {

    static format_message(level, message){
        let current_datetime = new Date();
        let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes() +
            ":" +
            current_datetime.getSeconds();

        return `[${formatted_date}]: [${level}]: ${message} \n`;
    }


    static debug(message){
        fs.appendFile("logs.txt", Logger.format_message('DEBUG', message), err => {
            if(err){
                console.log(err)
            }
        })
    }

    static info(message){
        fs.appendFile("logs.txt", Logger.format_message('INFO', message), err => {
            if(err){
                console.log(err)
            }
        })
    }
}

module.exports = Logger
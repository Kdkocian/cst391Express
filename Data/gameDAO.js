const res = require('express/lib/response');
var mysql = require('mysql');
var Game = require('../models/game');
var Logger = require('../util/logger');

class GamesDAO
{
    constructor()
    {
        this.connection = mysql.createConnection
        ({
            host: process.env.EXPRESS_DATABASE_URL,
            port: process.env.EXPRESS_DATABASE_PORT,
            user: process.env.EXPRESS_DATABASE_USER,
            password: process.env.EXPRESS_DATABASE_PASSWORD
        })
    }   

    findAllGames(callback)
    {
        try{
            //get connection the database
            this.connection.connect();
            //define helper variables
            var games = [];
            this.connection.query('SELECT * FROM games.games', (err, rows, fields) => {
            
                //rethrow any errors along the way for our code to handle
                if(err)
                    throw err;
                //loop through the returned rows and add the row to the games array
                var rowsLength = rows.length;
                Logger.debug(`Rows length: ${rowsLength}` )
                for(let i = 0; i < rowsLength; i++){

                    games.push(new Game(
                    
                        rows[i].id,
                        rows[i].Title,
                        rows[i].Type,
                        rows[i].Price
                    ))
                }
                //returns results to the caller
                callback(games);
            })
            //closes connection to the database
            Logger.debug('Closing the connection')
            this.connection.end()
        } catch(e){
            //log any errors that appear
            console.log(e); 

            return [];
        } 
    }

    findGameById(callback, id)
    {
        try{
            //get connection the database
            this.connection.connect();
            this.connection.query('SELECT * FROM games.games WHERE id = ?', id, (err, rows, fields) => {
            
                //rethrow any errors along the way for our code to handle
                if(err) {                    
                    Logger.debug(err.message);
                    throw (err);
                }

                var game = new Game(
                
                    rows[0].id,
                    rows[0].Title,
                    rows[0].Type,
                    rows[0].Price
                )
                
                //returns results to the caller
                callback(game);
            })
            //closes connection to the database
            Logger.debug('Closing the connection')
            this.connection.end()
        } catch(e){
            //log any errors that appear
            console.log(e); 

            return [];
        } 
    }


    insertGame(callback, game)
        {
            try{
                //get connection the database
                this.connection.connect();
                this.connection.query('INSERT INTO games.games (id, Title, Price, Type) VALUES (?, ?, ?, ?)', [game.Id, game.Title, game.Type, game.Price], (err, rows, fields) => {
                
                    //rethrow any errors along the way for our code to handle
                    if(err)
                        throw err;
                    //returns results to the caller
                    callback(true);
                })
                //closes connection to the database
                Logger.debug('Closing the connection')
                this.connection.end()
            } catch(e){
                //log any errors that appear
                console.log(e); 

                callback(false);
            } 
        }


    deleteGameById(callback, id)
        {
            try{
                //get connection the database
                this.connection.connect();
                //define helper variables
                this.connection.query('DELETE FROM games.games WHERE id = ?', id, (err, rows, fields) => {
                
                    //rethrow any errors along the way for our code to handle
                    if(err)
                        throw err;
                    //returns results to the caller
                    callback(true);
                })
                //closes connection to the database
                Logger.debug('Closing the connection')
                this.connection.end()
            } catch(e){
                //log any errors that appear
                console.log(e); 

                callback(false);
            } 
        }
}

module.exports = GamesDAO
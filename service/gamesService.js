const GamesDAO = require('../Data/gameDAO');

class GamesService{

    getAllGames(callback)
    {
        var dao = new GamesDAO();        
        return dao.findAllGames(callback);
    }

    getGameById(callback, id)
    {
        var dao = new GamesDAO();
        return dao.findGameById(callback, id);
    }

    createGame(callback, game)
    {
        var dao = new GamesDAO();
        return dao.insertGame(callback, game);
    }

    deleteGameById(callback, id)
    {
        var dao = new GamesDAO();
        return dao.deleteGameById(callback, id);
    }
}

module.exports = GamesService
const {Router} = require("express");
const musics = require("../controller/musics");
const musicRouter = Router();

musicRouter.get('/musics/query',musics.query);


module.exports = musicRouter;
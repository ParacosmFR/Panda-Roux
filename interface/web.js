const fs = require("fs");
const express = require('express')
const app = express()
const path = require('path');
const root = path.dirname(require.main.filename);
const config = require(root + '/config.json');
const port = 8455;
module.exports.init = function() {

    app.get('/status', (req,res) => {
        if (req.query.key == config.status_key) {
            var status = fs.readFileSync(root + '/logs/status.json');
            status = JSON.parse(status);
            res.status(200).json(status);
        } else {
            res.status(401).sendStatus(401);
        }
    })

    app.get('/', (req, res) => {
        res.redirect('https://paracosm.fr')
    })

    app.listen(port, () => {
        console.log('Serveur à l\'écoute')
    })
};
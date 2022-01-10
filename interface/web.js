const fs = require("fs");
const express = require('express')
const app = express()
const path = require('path');
const root = path.dirname(require.main.filename);
const port = 8455;
module.exports.init = function() {

    app.listen(port, () => {
        console.log('Serveur à l\'écoute')
    })
    var status = fs.readFileSync(root + '/logs/status.json');
    status = JSON.parse(status);
    app.get('/status', (req,res) => {
        res.status(200).json(status);
    })
};
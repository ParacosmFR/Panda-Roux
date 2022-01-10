const fs = require('fs');
const birthday = [{
    "user_id":"12345",
    "user_birthday": "01/01",
    "server_id": "12345",
}];

try {
    fs.readFileSync(__dirname + "/../data/birthday.json");
  } catch (err) {
    fs.writeFileSync(__dirname + "/../data/birthday.json", JSON.stringify(birthday));
}
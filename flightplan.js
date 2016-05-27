var plan = require('flightplan');
var fs = require("fs");

var tmpDir = 'ninja' + new Date().getTime();
var secret = JSON.parse(fs.readFileSync("secret.json"))

plan.target('prod', {
  host: secret.prod.host,
  port: secret.prod.port,
  username: secret.prod.username,
  privateKey: process.env.PRIVATEKEY,
  passphrase: secret.prod.passphrase,
});

plan.local(function(local) {
  local.exec('grunt build');
  local.log('Copy dist/app to remote hosts');
  local["with"]("cd dist/app", function() {
    var files = local.find(". -type f", {silent: true});
    local.transfer(files, 'www/ninja');
    local.transfer(files, 'www/ninjaBuilds/' + tmpDir);
  });
});

//first time run:
//PRIVATEKEY=~/.ssh/id_rsa fly prod

var GoogleHomePlayer = require('.');

var ip = 'x.x.x.x'; // your Google Home's ip address

var googleHome = new GoogleHomePlayer(ip, 'en');
googleHome
  .say('first text')
  .then(function() {
    return googleHome.say('second text', 'ja', true);
  })
  .then(function() {
    return googleHome.say('final text');
  })
  .then(function() {
    console.log('done');
  })
  .catch(function(err) {
    console.error(err);
  });

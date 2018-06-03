google-home-player
==================

Play a sound or say a text on Google Home.

## Usage

```js
var GoogleHomePlayer = require('google-home-player');

var ip = 'x.x.x.x'; // your Google Home's ip address

var googleHome = new GoogleHomePlayer(ip, 'en', 1);
googleHome
  .say('first text')
  .then(function() {
    return googleHome.say('second text', 'ja', 0.5);
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
```

## Usage with async/await

```js
const example = async () => {
  await googleHome.say('first text');
  await googleHome.say('second text', 'ja', 0.5);
  await googleHome.say('final text');
  console.log('done');
};

example();
```

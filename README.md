google-home-player
==================

Play a sound or say a text on Google Home.
This is an alternative implementation of [google-home-notifier](https://www.npmjs.com/package/google-home-notifier) by using Promise.

## Usage

```js
var GoogleHomePlayer = require('google-home-player');

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
```

## Usage with async/await

```js
const example = async () => {
  await googleHome.say('first text');
  await googleHome.say('second text', 'ja', true);
  await googleHome.say('final text');
  console.log('done');
};

example().catch(err => {
  console.error(err);
});
```

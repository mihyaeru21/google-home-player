var castv2 = require('castv2-client');
var tts = require('google-tts-api');

var GoogleHomePromise = function(ip, language, speed) {
  var self = this;

  this.ip = ip;
  this.language = language;
  this.speed = speed;

  this.say = function(text, language, speed) {
    language = language || self.language;
    speed = speed || self.speed;
    return tts(text, language, speed).then(function(url) {
      return self.play(url);
    });
  };

  this.play = function(url) {
    return new Promise(function(resolve, reject) {
      var client = new castv2.Client();

      client.on('error', function(err) {
        client.close();
        reject(err);
      });

      client.connect(self.ip, function() {
        client.launch(castv2.DefaultMediaReceiver, function(err, player) {
          if (err != null) {
            client.close();
            reject(err);
            return;
          }

          player.on('status', function(status) {
            if (status && status.idleReason === 'FINISHED') {
              client.close();
              resolve();
            }
          });

          var media = {
            contentId: url,
            contentType: 'audio/mp3',
            streamType: 'BUFFERED'
          };

          player.load(media, { autoplay: true }, function(err, status) {
            if (err != null) {
              client.close();
              reject(err);
            }
          });
        });
      });
    });
  };
};

module.exports = GoogleHomePromise;

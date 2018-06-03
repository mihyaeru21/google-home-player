var castv2 = require('castv2-client');
var tts = require('google-tts-api');

/**
 * @param {string} ip Google Home's ip address
 * @param {string} [language] default: 'en'
 * @param {number} [speed] default: 1
 */
var GoogleHomePlayer = function(ip, language, speed) {
  var self = this;

  this.ip = ip;
  this.language = language || 'en';
  this.speed = speed || 1;

  /**
   * @param {string} text a text to play
   * @param {string} [language] default: this.language
   * @param {number} [speed] default: this.speed
   * @return {Promise<void>}
   */
  this.say = function(text, language, speed) {
    language = language || self.language;
    speed = speed || self.speed;
    return tts(text, language, speed).then(function(url) {
      return self.play(url);
    });
  };

  /**
   * @param {string} url a sound url to play
   * @param {string} [contentType] default: 'audio/mp3'
   * @return {Promise<void>}
   */
  this.play = function(url, contentType) {
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
            contentType: contentType || 'audio/mp3',
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

module.exports = GoogleHomePlayer;

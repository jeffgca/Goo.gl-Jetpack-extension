const widgets = require("widget");
const tabs = require("tabs");
const data = require("self").data;
const Hotkey = require("hotkeys").HotKey;
const notifications = require("notifications");
const Request = require("request").Request;

var shorten = function(longUrl, callback) {
    
    var json = JSON.stringify({longUrl: longUrl});
    
    var googlRequest = Request({
       url: 'https://www.googleapis.com/urlshortener/v1/url',
       content: json,
       contentType: 'application/json',
       onComplete: function(response) {
            callback(response.json);
       }
    });
    googlRequest.post();
}

var shortenHotKey = Hotkey({
  combo: "accel-shift-u",
  onPress: function() {
    if (/^http[s]*:\/\//.test(tabs.activeTab.url)) {
      shorten(tabs.activeTab.url, function(response) {
        let clipboard = require("clipboard");
        clipboard.set(response.id)
        notifications.notify({
          title: "Copied url: " + response.id + " to the clipboard.",
          text: "Click this notification to test the new Url.",
          data: response.id,
          iconUrl: data.url("google.png"),
          onClick: function(url) {
            tabs.open(url);
          }
        });
      });
    } else {
      notifications.notify({
        title: "Url error!",
        text: "The url " + tabs.activeTab.url + " doesn't seem to be a valid web url.",
        iconUrl: data.url("google.png")
      });
    }
  }
});

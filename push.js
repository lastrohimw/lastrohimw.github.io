const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BNNcozcf6xAS90Qho9lJmKPytY3rhxHVkq2f77IGH9LJFrQfFEPdbFv5VjwvC-EIvtyN3r9-jTXA_662q3pnkiY",
   "privateKey": "7nTlHIcZ-BSHw8P2YfRrNVsRYG9YJGH9jI6h3izVeNw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ci9mIhVt6CE:APA91bEtchzgVRIaCEaNL8nFarWVDqHGdiUaw4LY_tzI7YHzpP8q_FE6KCJ-lk8aeAf0ZgNJueaKOtmiY6o5nZb3GSbN8BXxoYlGE2J2Q78bhakd1JERv3G4JWnwbKhm3orSlP5ubsdl",
   "keys": {
        "p256dh": "BJ7p3z3Igrbf5VdAup7HGC7dF4h2RaQePlKvRuJ3oo7RLTdbj/dGopSSCoGs8UJSdS2LKoXBv/3PdpViYYpLOGo=",
        "auth": "rAX331e9fR4OwYZxh7d1bQ=="
   }
};
var payload = 'Klasemen Bundesliga terbaru';
 
var options = {
   gcmAPIKey: '899910078692',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
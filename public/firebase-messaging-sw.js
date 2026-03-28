importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBjRR0CiU6lUNJUX84gGLeLNWAhsOkdh1Q",
  authDomain: "lifetrack-298c2.firebaseapp.com",
  projectId: "lifetrack-298c2",
  storageBucket: "lifetrack-298c2.appspot.com",
  messagingSenderId: "272784721328",
  appId: "1:272784721328:web:5f69debd6d387e1d7b4275"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
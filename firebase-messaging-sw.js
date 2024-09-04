importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyB7Zs8GM5eQgGJDqLrQye5LJpr4wm7DZYs",
  authDomain: "add-app-indonesia.firebaseapp.com",
  projectId: "add-app-indonesia",
  storageBucket: "add-app-indonesia.appspot.com",
  messagingSenderId: "1096092734184",
  appId: "1:1096092734184:web:901c558f60a1cc187bef5d",
  measurementId: "G-RLSETK47T6"
}
firebase.initializeApp(firebaseConfig)
// Retrieve firebase messaging
const messaging = firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload)
  // Customize notification here
  const notificationTitle = payload?.notification?.title
  const notificationOptions = {
    body: payload.notification?.body
  }
  // self.registration.showNotification(notificationTitle, notificationOptions)
})

//// Handle notification click event
// self.addEventListener("notificationclick", function (event) {
//   console.log(event)
//   event.notification.close() // Close the notification
//   const url = event.notification.data.click_action
//   if (url) {
//     event.waitUntil(
//       clients
//         .matchAll({ type: "window", includeUncontrolled: true })
//         .then((windowClients) => {
//           // Check if there is already a window/tab open with the target URL
//           for (let i = 0; i < windowClients.length; i++) {
//             const client = windowClients[i]
//             if (client.url === url && "focus" in client) {
//               return client.focus()
//             }
//           }
//           // If not, then open the URL in a new window/tab
//           if (clients.openWindow) {
//             return clients.openWindow(url)
//           }
//         })
//     )
//   }
// })

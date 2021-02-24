// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:1000',

  firebase : {
    apiKey: "AIzaSyAQxu9fpRTqmL7zOXDzrFBb_AZh0gVJw_Q",
    authDomain: "schickmagazine-c910c.firebaseapp.com",
    projectId: "schickmagazine-c910c",
    storageBucket: "schickmagazine-c910c.appspot.com",
    messagingSenderId: "944967872371",
    appId: "1:944967872371:web:79b5a97634aae92c7a1f06",
    measurementId: "G-JV137LD8DK"
  },

  pay_pal_client_key: "AVqWUkei8nO6x02ZJYoqrKe-yNqow-8Bxwd2e1yCu3QgEPs5orDDWcr9a3bnKUhD41aHjiEWpMIUoux_",
  sand_box_id: "sb-qgutw1624743@business.example.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

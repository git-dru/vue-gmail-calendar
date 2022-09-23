const express = require('express');
const cors = require("cors");
const { google } = require('googleapis');

require('dotenv').config()

console.log(process.env.SCOPES)


const app = express();
app.use(cors());

const SCOPES = process.env.SCOPES
const GOOGLE_PRIVATE_KEY= process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID
  
const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);
  
const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});
  
app.get('/', (req, res) => {

  let now = new Date();
  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date(now.getFullYear(), now.getMonth() , 1)).toISOString(),
    timeMax:  (new Date(now.getFullYear(), now.getMonth() + 1, 0)).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});
  
app.listen(3000, () => console.log(`App listening on port 3000!`));
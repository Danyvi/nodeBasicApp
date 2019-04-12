// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// Require https module (To require the https module in our code we need to use the require function)
const https = require('https');

// let define the username
const username = 'danielevinci';

// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log('Logged Output: printMessage -> message', message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
const request = https.get(
  `https://teamtreehouse.com/${username}.json`,
  response => {
    console.log('statusCode: ', response.statusCode);
    console.log('headers: ', response.headers);
    // Read the data (it will read the data as a string)
    // Parse the data (since it JSON we'll need to pass that data)
    // Print out the information we obtained from the API
  }
);

// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// Require https module (To require the https module in our code we need to use the require function)
const https = require('https');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}
// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  // if an error occurs in this block, it will throw an error
  try {
    // Connect to the API URL (https://eamtreehouse.com/username.json)
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        // console.log('statusCode: ', response.statusCode);
        // console.log('headers: ', response.headers);
        let responseBody = '';
        // Read the data (it will read the data as a string)
        response.on('data', dataChunk => {
          responseBody += dataChunk.toString();
        });

        response.on('end', () => {
          // Parse the data (since it JSON we'll need to parse that data)
          // (process of converting a string into a data structure is called parsing)
          // JSON.parse(text), we pass a string to get parsed into a JSON object
          try {
            const profile = JSON.parse(responseBody);
            //console.dir(profile);
            // console.log(responseBody);
            // console.log(typeof responseBody);
            // Print out the information we obtained from the API
            printMessage(
              username,
              profile.badges.length,
              profile.points.JavaScript
            );
          } catch (error) {
            printError(error);
          }
        });
      }
    );
    // error handler
    // all error objects have a message property
    request.on('error', error =>
      console.error(`Problem with request ${error.message}`)
    );
  } catch (error) {
    printError(error);
  }
}

// process; it is the corrispondent of window in JS in the browser
// console.dir(process.argv);

// const users = ['chalkers', 'alenaholligan', 'davemcfarland'];
const users = process.argv.slice(2);

// Expanded version of the forEach loop
// users.forEach(username => {
//   getProfile(username);
// });

// shorter version
users.forEach(getProfile);

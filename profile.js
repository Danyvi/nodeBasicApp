// Require https module (To require the https module in our code we need to use the require function)
const https = require('https');
// Require http module for status codes
const http = require('http');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}
// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function get_pr(username) {
  // if an error occurs in this block, it will throw an error
  try {
    // Connect to the API URL (https://eamtreehouse.com/username.json)
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        if (response.statusCode === 200) {
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
        } else {
          const message = `There was an error getting the profile for ${username} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
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

module.exports.get_pr = get_pr;

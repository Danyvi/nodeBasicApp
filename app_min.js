const https = require('https');
const http = require('http');

function printError(error) {
  console.error(error.message);
}

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        if (response.statusCode === 200) {
          let responseBody = '';

          response.on('data', dataChunk => {
            responseBody += dataChunk.toString();
          });

          response.on('end', () => {
            try {
              const profile = JSON.parse(responseBody);
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
    request.on('error', error =>
      console.error(`Problem with request ${error.message}`)
    );
  } catch (error) {
    printError(error);
  }
}

const users = process.argv.slice(2);

users.forEach(getProfile);

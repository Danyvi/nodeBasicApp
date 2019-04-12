const https = require('https');

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        let responseBody = '';

        response.on('data', dataChunk => {
          responseBody += dataChunk.toString();
        });

        response.on('end', () => {
            try {}
                const profile = JSON.parse(responseBody);
                printMessage(
                    username,
                    profile.badges.length,
                    profile.points.JavaScript
                );
        } catch (error) {
            console.error(error.message);
        }
        });
      }
    );
    request.on('error', error =>
      console.error(`Problem with request ${error.message}`)
    );
  } catch (error) {
    console.error(error.message);
  }
}

const users = process.argv.slice(2);

users.forEach(getProfile);

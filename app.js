// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const profile = require('./profile.js');

// const users = ['chalkers', 'alenaholligan', 'davemcfarland'];
const users = process.argv.slice(2);

// Expanded version of the forEach loop
// users.forEach(username => {
//   get_pr(username);
// });

// shorter version
users.forEach(profile.get_pr);

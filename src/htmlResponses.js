const fs = require('fs');
const path = require('path');

const clientHTML = fs.readFileSync(path.join(__dirname, '../client', 'client.html'));
const pollHTML = fs.readFileSync(path.join(__dirname, '../client', 'poll.html'));

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(clientHTML);
  response.end();
};

const getPollPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(pollHTML);
  response.end();
};

module.exports = {
  getIndex,

  getPollPage,
};

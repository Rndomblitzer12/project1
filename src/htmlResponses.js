const fs = require('fs');

const clientHTML = fs.readFileSync(`${__dirname}/../client/client.html`);
const pollHTML = fs.readFileSync(`${__dirname}/../client/poll.html`);
const style = fs.readFileSync(`${__dirname}/../client/client.css`);
const stylePoll = fs.readFileSync(`${__dirname}/../client/poll.css`);

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

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

const getStylePoll = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(stylePoll);
  response.end();
};

module.exports = {
  getIndex,
  getPollPage,
  getStyle,
  getStylePoll,
};

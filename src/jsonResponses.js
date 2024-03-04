const url = require('url');
const uuid = require('uuid').v4;

const polls = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const getPoll = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { id } = parsedUrl.query;

  if (!id || !polls[id]) {
    const responseJSON = {
      message: 'Poll not found',
    };
    return respondJSON(request, response, 404, responseJSON);
  }
  return respondJSON(request, response, 200, polls[id]);
};

const createPoll = (request, response, body) => {
  console.log('Request body:', body);

  const parsedBody = JSON.parse(Object.keys(body)[0]);
  const { question, options } = parsedBody;

  // Ensure options is an array and has at least two elements
  if (!Array.isArray(options) || options.length < 2) {
    const responseJSON = {
      message: 'Invalid options data',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  const id = uuid();
  polls[id] = {
    question,
    options: options.map((option) => ({ option, count: 0 })),
  };
  return respondJSON(request, response, 201, { id });
};

const vote = (request, response, body) => {
  const parsedBody = JSON.parse(Object.keys(body)[0]);
  const { pollId, option } = parsedBody;

  // Ensure pollId and option are not undefined
  if (!pollId || !option) {
    const responseJSON = {
      message: 'Invalid vote data',
    };
    return respondJSON(request, response, 400, responseJSON);
  }

  const poll = polls[pollId];
  const selectedOption = poll.options.find((o) => o.option === option);
  if (!selectedOption) {
    const responseJSON = {
      message: 'Invalid option',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  selectedOption.count++;
  return respondJSON(request, response, 200, { message: 'Vote recorded successfully' });
};

const notFound = (request, response) => {
  const responseJSON = {
    message: '404 Not Found',
  };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getPoll,
  createPoll,
  vote,
  notFound,
};

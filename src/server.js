const http = require('http');
const url = require('url');
const querystring = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const jsonResponseHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlResponseHandler.getIndex,
    '/poll.html': htmlResponseHandler.getPollPage,
    '/poll': jsonResponseHandler.getPoll,
    '/style.css': htmlResponseHandler.getStyle,
    '/poll.css': htmlResponseHandler.getStylePoll,
    notFound: jsonResponseHandler.notFound,
  },

  POST: {
    '/create': jsonResponseHandler.createPoll,
    '/vote': jsonResponseHandler.vote,
    notFound: jsonResponseHandler.notFound,
  },
};

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = querystring.parse(bodyString);
    handler(request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  if (request.method === 'POST') {
    if (urlStruct[request.method][parsedUrl.pathname]) {
      parseBody(request, response, urlStruct[request.method][parsedUrl.pathname]);
    } else {
      urlStruct[request.method].notFound(request, response);
    }
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});

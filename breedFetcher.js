const request = require('request')
const fs = require('fs');
const host = `https://api.thecatapi.com/v1/breeds/search?q=${process.argv[2]}`

const breedFetcher = function (callback) {
  request(host, (error, response, body) => {
    if (error) console.log(error);
    fs.readFile(body, 'utf8', (error, data) => {
      callback(body);
    });
  });
};

const apiCallback = function (body) {
  const data = JSON.parse(body);
  if (data.length === 0) {
    console.log('cat not found!!')
  } else {
    console.log(data[0]['description']);
  }
};

breedFetcher(apiCallback);
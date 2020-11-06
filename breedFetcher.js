const request = require('request');
const fs = require('fs');

const fetchBreedDescription = function(breedName, callback) {
  const host = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  const async = function(body) {
    const content = JSON.parse(body);
    if (content.length === 0) {
      return 'cat not found!!';
    } else {
      return content[0]['description'];
    }
  };
  
  request(host, (error, response, body) => {
    if (error) callback(error, null);
    fs.readFile(body, 'utf8', () => {
      const desc = async(body);
      callback(null, desc);
    });
  });
};


module.exports = { fetchBreedDescription };
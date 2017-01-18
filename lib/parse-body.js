'use strict';

module.exports = function(req){
  return new Promise((resolve, reject) => {
    if(req.method == 'PUT' || req.method == 'POST'){
      let bodyText = '';
      req.on('data', (buffer) => {
        bodyText += buffer.toString();
      });

      req.on('end', () => {
        try {
          let body = JSON.parse(bodyText);
          req.body = body;
          resolve(body);
        } catch (err){
          err.status = 400; // BOOM!!!
          reject(err);
        }
      });
    } else {
      resolve();
    }
  });
};

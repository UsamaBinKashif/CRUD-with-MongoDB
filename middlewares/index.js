const fs = require("fs");
const os = require("os");
const createLogs = (fileName) => {
  return (req, res, next) => {
    const logsData = ` 
    date: ${new Date()},
    osType: ${os.type()},
    url: ${req.url},
    method:${req.method},
    ip:${req.ip}
    
  `;
    if (req.url === "/favicon.ico") {
      return res.end();
    }

    fs.appendFile(fileName, logsData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        next();
      }
    });
  };
};

module.exports = { createLogs };

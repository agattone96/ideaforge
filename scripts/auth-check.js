const os = require('os');
const fs = require('fs');
const path = require('path');

const accessControlPath = path.resolve(__dirname, '../access-control.json');
const accessControl = JSON.parse(fs.readFileSync(accessControlPath, 'utf-8'));

module.exports = function authCheck(req, res, next) {
  const user = os.userInfo().username;
  if (!accessControl.allowedUsers.includes(user)) {
    console.error(`Unauthorized access attempt by ${user}`);
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

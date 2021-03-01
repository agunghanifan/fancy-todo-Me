var jwt = require('jsonwebtoken');

const token = (data) => {
    return jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET);
}


module.exports = token
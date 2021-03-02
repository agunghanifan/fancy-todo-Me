var jwt = require('jsonwebtoken');

const token = (id, email) => {
    // console.log("masuk token")
    let encrypted = jwt.sign({id: id, email: email}, process.env.JWT_SECRET);
    console.log(process.env.JWT_SECRET)
    return encrypted
}

const matchingToken = (token) => {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(process.env.JWT_SECRET)
    return decoded
}


module.exports = {
    token,
    matchingToken
}
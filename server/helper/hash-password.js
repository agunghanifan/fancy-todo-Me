var bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, passwordFromDb) => {
    let result = bcrypt.compareSync(password, passwordFromDb);
    return result
}

module.exports = {
    hashPassword,
    comparePassword
}
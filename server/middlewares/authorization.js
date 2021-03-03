const { matchingToken } =  require('../helper/jason-web-token')
const {Account, Todo} = require('../models')


const authenticate = (req, res, next) => {
    try {
        let decoded = matchingToken(req.headers.token)
            Account.findOne({where : {id : Number(decoded.id)}})
            .then((user) => {
                if(user) {
                    req.user = {id: user.id, email: user.email}
                    next()
                } 
            })
            
        } catch (error) {
            console.log("masuk sini")
            next({code: 401, message: 'Unauthorized User'})
        }
}

const authorization = (req, res, next) => {
    Todo.findOne({where : {id : Number(req.params.id)}})
        .then((data) => {
            if(req.user.id == data.AccountId) {
                next()
            } else {
                next({code: 401, message: 'Unauthorized User'})
            }
        })
        .catch((err) => {
            next({code: 404, message: 'Todo Not Found'})
        })
}


module.exports = {
    authenticate,
    authorization,
}

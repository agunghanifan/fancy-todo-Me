    const axios = require('axios')
// not completed yet
// not completed yet
// not completed yet
// not completed yet


const getEvent = (due_date, description, next) => {
    let apiKey = process.env.API_KEY
    console.log(apiKey)
    let year = new Date(due_date).getFullYear()
    let comparison = description
    let result
    axios({
        method: "GET",
        url: `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=ID&year=${year}`
    })
    
        .then(response => {
            // console.log(response.data.response.holidays)
            let body = {
                description: description,
            }
            console.log("ini tanggal yang dicari")
            console.log(due_date)
            response.data.response.holidays.forEach(data => {
                // console.log(data.date.iso)
                if(due_date == data.date.iso) {
                    console.log("masuk true")
                    body.description += `. Tanggal ini bertepatan dengan ${data.name}. berikut penjelasannya = ${data.description}`
                    result = body.description
                    // console.log(body.description)
                    // return body.description
                    console.log("ini didalam foreach")
                    console.log(result)
                }
            })
            if(comparison == body.description) {
                console.log("masuk falsy")
                body.description += `. Tidak ada event special Calendar`
                result = body.description
            }
            return result
            // console.log(result)
            // console.log(body.description)
            // return body.description
            // console.log(response.data.response.holidays)
        })
        .catch(err => {
            next({code: 500, message: "Internal Server Error"})
        })
}

module.exports = getEvent 
const baseUrl = "http://localhost:3000"

$("document").ready(function() {
    checkLocalStorage()
    
    $("#login-page").on("click", function (event) {
        event.preventDefault()
        $(".register").hide()
        $(".todos").hide()
        $("#dashboard").hide()
        $("#logout-btn").hide()
    })

    $("#register-page").on("click", function (event) {
        event.preventDefault()
        $(".login").hide()
        $(".todos").hide()
        $("#dashboard").hide()
        $("#logout-btn").hide()
    })

    $("#btn-submit").on("click", function (event) {
        event.preventDefault()
        login()
    })

    $("#dashboard").on("click", function (event) {
        event.preventDefault()
        $("#login-page").hide()
        $("#register-page").hide()
        $(".login").hide()
        $(".register").hide()
        $(".todos").show()
    })

    $("#btn-logout").on("click", function () {
        logout()
    })
})

function login() {
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    
    $.ajax({
        url: baseUrl + "/login",
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            // console.log(response)
            localStorage.setItem("token", response.session)
            checkLocalStorage()
        })
        .always(() => {
            $("#login-email").val("")
            $("#login-password").val("")
        })
        .fail((error) => {
            console.log(error)
        })
}

function checkLocalStorage() {
    if(localStorage.token) {
        $("#login-page").hide()
        $("#register-page").hide()
        $("#logout-btn").show()
        $("#dashboard").show()
        $(".todos").show()
        $(".login").hide()
        $(".register").hide()
    } else {
        $(".register").hide()
        $(".todos").hide()
        $("#logout-btn").hide()
        $("#dashboard").hide()
        $(".todos").hide()
    }
}

function logout() {
    localStorage.removeItem("token")
}
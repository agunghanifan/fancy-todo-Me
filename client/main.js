const baseUrl = "http://localhost:3000"
let idSet 
$("document").ready(function () {
  showQuotes()
  checkLocalStorage()

  // button register di halaman login
  $("#btn-register").on("click", function (event) {
    // console.log("masuk btn-register")
    event.preventDefault()
    $("#navbar").hide()
    $(".register").show()
    $(".login").hide()
    $("#todos").hide()
  })

  // text nama app di navbar setelah login
  $("#name-app").on("click", function (event) {
    event.preventDefault()
    $("#tbody-todos").empty()
    checkLocalStorage()
  })

  $("#btn-submit-addTodo").on("click", function (event) {
    event.preventDefault()
    addTodo()
  })

  // text dashboard di navbar setelah login
  $("#dashboard").on("click", function (event) {
    event.preventDefault()
    $("#tbody-todos").empty()
    checkLocalStorage()
  })

  //button addtodo di halaman dashboard
  $("#btn-add-todo").on("click", function (event) {
    event.preventDefault()
    $(".register").hide()
    $(".login").hide()
    $("#todos").hide()
    $("#add-todo-page").show()

  })

  //button login di halaman register
  $("#btn-login").on("click", function (event) {
    event.preventDefault()
    // console.log("masuk btn-login")
    $("#navbar").hide()
    $(".register").hide()
    $(".login").show()
    $("#todos").hide()
  })

  //button login di halaman login
  $("#btn-submit").on("click", function (event) {
    event.preventDefault()
    login()
  })

  //button register di halaman register
  $("#btn-submit-register").on("click", function (event) {
    event.preventDefault()
    register()
  })

  //text dashboard di halaman dashboard
  $("#dashboard").on("click", function (event) {
    event.preventDefault()
    $("#todos").show()
    $(".login").hide()
    $(".register").hide()
  })

  //button logout di halaman dashboard dan addtodo
  $("#btn-logout").on("click", function (event) {
    event.preventDefault()
    logout()
  })

  // button edit todo pada page edit todo
  $("#btn-submit-editTodo").on("click", function (event) {
    event.preventDefault()
    submitEditTodo(idSet)
  })

})

function showQuotes() {
  setInterval(() => {
    $.ajax({
      url: `${baseUrl}/todos/quotes`,
      method: "GET",
      headers: {
        token: localStorage.token
      },
    })
      .done((response) => {
        $("#quotes-test").empty()
        localStorage.removeItem("quote")
        localStorage.removeItem("author")
        console.log(response, "response client>>>>>>>>>>>>>>>")
        // console.log(localStorage.getItem("quote"))
        localStorage.setItem("quote", response.content)
        localStorage.setItem("author", response.author)  
        $("#quotes-test").append(
        `
        <h4>${response.content}</h4>
        <h5>-${response.author}</h5>
        `
        )
      })
  }, 8000);
}

function deleteTodo(id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "DELETE",
    headers: {
      token: localStorage.token
    },
  })
    .done((response) => {
    // console.log(response)
    // setTimeout(() => {
    //   checkLocalStorage()
    // }, 1000);
    })

    .always(() => {
      checkLocalStorage()
    })
    .fail((error) => {
      console.log(error)
    })
}

function checklistTodo(id) {
  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "PATCH",
    headers: {
      token: localStorage.token
    },
  })
    .done((response) => {
      // setTimeout(() => {
      //   checkLocalStorage()
      // }, 1000);
      // console.log(response)
    })
    .always(() => {
      checkLocalStorage()
    })
    .fail((error) => {
      console.log(error)
    })
}

function editTodo(id) {
  $("#edit-todo-page").show()
  $("#navbar").show()
  $(".register").hide()
  $(".login").hide()
  $("#todos").hide()

  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "GET",
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      console.log(response)
      let convertMonth = (new Date(response.due_date)).getMonth() + 1
      let dateEdit
      let monthEdit
      if(response.due_date[5] == 0) {
        monthEdit = `0${convertMonth}`  
      } else {
        monthEdit = convertMonth
      }
      if(response.due_date[8] == 0) {
        dateEdit = `0${(new Date(response.due_date)).getDate()}`
      } else {
        dateEdit = (new Date(response.due_date)).getDate()
      }
      let dateShow = `${(new Date(response.due_date)).getFullYear()}-${monthEdit}-${dateEdit}`
      // console.log(date)
      $("#edit-title").val(`${response.title}`)
      $("#edit-description").val(`${response.description}`)
      $("#edit-due_date").val(`${dateShow}`)
      $("#check-0").empty()
      $("#check-1").empty()
      if(response.status == "available") {
        $("#check-0").append(
          `
          <input class="form-check-input" type="radio" name="status" id="available" value="available" checked>
          <label class="form-check-label" for="available">Available</label>
          `
        )
        $("#check-1").append(
          `
          <input class="form-check-input" type="radio" name="status" id="closed" value="closed">
          <label class="form-check-label" for="closed">Closed</label>
          `
        )
      } else {
        $("#check-0").append(
          `
          <input class="form-check-input" type="radio" name="status" id="available" value="available">
          <label class="form-check-label" for="available">Available</label>
          `
        )
        $("#check-1").append(
          `
          <input class="form-check-input" type="radio" name="status" id="closed" value="closed" checked>
          <label class="form-check-label" for="closed">Closed</label>
          `
        )
      }

      idSet = id
    })

    .fail((error) => {
      console.log(error)
    })
}

function submitEditTodo(id) {
  const title = $("#edit-title").val()
  const description = $("#edit-description").val()
  const due_date = $("#edit-due_date").val()
  let status = $("input[type=radio][name=status]:checked").val()
  console.log(title, description, due_date, status)

  $.ajax({
    url: `${baseUrl}/todos/${id}`,
    method: "PUT",
    headers: {
      token: localStorage.token
    },
    data: {
      title,
      description,
      due_date,
      status
    }
  })
    .done((response) => {
      console.log(response)
      checkLocalStorage()
    })
    .always(() => {
      $("#edit-title").val(title)
      $("#edit-description").val(description)
      $("#edit-due_date").val(due_date)
    })
    .fail((error) => {
      console.log(error)
    })
}

//check kondisi ada token or not
function checkLocalStorage() {
  if (localStorage.token) {
    $("#alert-row-login").empty()
    $("#alert-row-register").empty()
    $("#alert-row-addtodo").empty()
    $("#greetings").empty()
    $("#greetings").append(
      `
      <div class="mb-3">
      <h2>Hi ${localStorage.getItem('name')}, welcome to Fancy Todo App List</h2>
      </div>
      `
      )
    $("#tbody-todos").empty()
    $(".login").hide()
    $(".register").hide()
    $("#navbar").show()
    $("#todos").show()
    $("footer").show()
    loadAddtodo()
    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
    // loadGoogleId()
  } else {
    $("#alert-row").empty()
    $(".login").show()
    $(".register").hide()
    $("#todos").hide()
    $("#navbar").hide()
    $("#add-todo-page").hide()
    $("#edit-todo-page").hide()
    $("footer").hide()
    // loadGoogleId()
  }
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `${baseUrl}/loginGoogle`,
    method: 'POST',
    data: {
      id_token
    }
  })
    .done(res => {
      localStorage.setItem('name', res.name)
      localStorage.setItem('token', res.token)
      checkLocalStorage()
      // console.log(res);
    })
    .fail((err, res) => {
      console.log(err, res);
      $("#alert-row-signin").append(
        `
        <div class="alert alert-primary" role="alert">
          ${message.responseJSON.message}
        </div>
        `
      )
    })
}


// untuk menambahkan todo baru
function addTodo() {
  // console.log("masuk addtodo")
  const title = $("#title").val()
  const description = $("#description").val()
  let due_date = $("#due_date").val()

  $.ajax({
    url: baseUrl + "/todos",
    method: "POST",
    headers: {
      token: localStorage.token
    },
    data: {
      title,
      description,
      due_date,
    },
  })
    .done((response) => {
      checkLocalStorage()
    })
    .always(() => {
      $("#alert-row-addtodo").empty()
      $("#description").val("")
      $("#title").val("")
      $("#due_date").val("")
    })
    .fail((error) => {
      // console.log(error.responseJSON.message)
      error.responseJSON.message.forEach((error) => {
        $("#alert-row-addtodo").append(
          `
          <div class="alert alert-primary" role="alert">
            ${error}
          </div>
          `
        )
      })
    })
}

// untuk menampilkan semua todo sesuai id account
function loadAddtodo() {
  $("#tbody-todos").empty()
  $.ajax({
    url: baseUrl + "/todos",
    method: "GET",
    headers: {
      token: localStorage.token
    }
  })
    .done((response) => {
      // console.log(response.content)
      // console.log(response, "masuk Response<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      let j = 0
      let title = ""
      let desc = ""
      response.dataDisplay.forEach((data) => {
        let due_date = `${(new Date(data.due_date)).toDateString()}`
        if (data.event == null) {
          title = `${due_date}`
          desc = `Tidak ada event special tahunan kalender dihari ini`
        } else {
          // console.log(data.event)
          let titleTemp = ""
          let descTemp = ""
          // console.log(data)
          let flag1 = true
          let flag2 = false
          for (let i = 0; i < data.event.length; i++) {
            if (flag1) {
              if (data.event[i] == "@" && data.event[i + 1] == "@") {
                title += titleTemp
                // console.log(title, "<<<<< ini title")
                i += 2
                flag1 = false
                flag2 = true
              } else {
                titleTemp += data.event[i]
                // console.log(titleTemp, "<<<< ini titleTemp")
              }
            }
            // console.log(title, "ini title")
            if (flag2) {
              if (data.event[i] == "-" && data.event[i + 1] == "-") {
                desc += descTemp
                i += 2
                break
              } else if(i == data.event.length - 1) {
                desc += descTemp
                i += 2
              } else {
                descTemp += data.event[i]
              }
            }
          }
          // console.log(desc, "ini desc")
        }
        $("#tbody-todos").append(
          `
          <tr>
            <td scope="col">${data.title}</td>
            <td scope="col">${data.description}</td>
            <td scope="col">${due_date}</td>
            <td scope="col">
            <!-- Button to Open the Modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal${j}">
              Event Desc
            </button>
            <!-- The Modal -->
            <div class="modal text-primary" id="myModal${j}">
              <div class="modal-dialog">
                <div class="modal-content">

                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">${title}</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
            
                  <!-- Modal body -->
                  <div class="modal-body">
                    ${desc}
                  </div>
            
                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            </td>
            <td scope="col">${data.status}</td>
            <td scope="col">
              <input type="submit" class="btn btn-success"  value="Checked" onclick="checklistTodo(${data.id})">
              <input type="submit" class="btn btn-warning"  value="Edit" onclick="editTodo(${data.id})">
              <input type="submit" class="btn btn-danger"  value="Delete" onclick="deleteTodo(${data.id})">
            </td>
          </tr>
          `
        )
        j++
        title = ""
        desc = ""
      });
    })
}

// untuk login di halaman login page
function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  // console.log(email, password)

  $.ajax({
    url: baseUrl + "/login",
    method: "POST",
    data: {
      email,
      password,
    }
  })
    .done((response) => {
      // console.log(response)
      localStorage.setItem("token", response.session)
      localStorage.setItem("name", response.name)
      checkLocalStorage()
    })
    .always(() => {
      $("#alert-row-signin").empty()
      $("#login-email").val("")
      $("#login-password").val("")
    })
    .fail(message => {
      // alert("Masuk error")
      // console.log(message.responseJSON)
      
        $("#alert-row-signin").append(
          `
          <div class="alert alert-primary" role="alert">
            ${message.responseJSON.message}
          </div>
          `
        )
      
    
    })
}

// untuk register new Account
function register() {
  const email = $("#register-email").val()
  const password = $("#register-password").val()
  const first_name = $("#register-first_name").val()
  const last_name = $("#register-last_name").val()
  // console.log(email, password)
  $.ajax({
    url: baseUrl + "/register",
    method: "POST",
    data: {
      email,
      password,
      first_name,
      last_name
    }
  })
    .done((response) => {
      // console.log(response)
      checkLocalStorage()
    })
    .always(() => {
      $("#alert-row-register").empty()
      $("#register-email").val("")
      $("#register-password").val("")
      $("#register-first_name").val("")
      $("#register-last_name").val("")
    })
    .fail((error) => {
      // console.log(error)
      // console.log(error.responseJSON.message)
      error.responseJSON.message.forEach((error) => {
        $("#alert-row-register").append(
          `
          <div class="alert alert-primary" role="alert">
            ${error}
          </div>
          `
        )
      })
    })
}

// untuk logout dari account yang login
function logout() {
  localStorage.removeItem("quote")
  localStorage.removeItem("author")
  localStorage.removeItem("token")
  localStorage.removeItem("name")
  checkLocalStorage()
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkLocalStorage()
}
var login = document.getElementById("loginform")

login.addEventListener('submit', function(e){
    e.preventDefault()


    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    fetch(`http://localhost:7071/api/login?email=${email}&password=${password}`)
    .then(
        function(response){
            if(response.status == 200){
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
            } else if (err){
                console.log(err)
            }
        }
    )

})

var logout = document.getElementById("logoutform")

logout.addEventListener("submit", function(e){
    e.preventDefault()
    localStorage.clear()
})


var updateUser = document.getElementById("updateUser")

updateUser.addEventListener('submit', function(e){
    e.preventDefault()

    var first_name = document.getElementById('first_name').value
    var last_name = document.getElementById('last_name').value
    var gender = document.getElementById('gender').value
    var age = document.getElementById('age').value
    var password = document.getElementById('password').value

    fetch("http://localhost:7071/api/updateusers?email=hej@hej", {
        method:'PUT',
        body: JSON.stringify({
            first_name: first_name,
            last_name:last_name,
            gender:gender,
            age:age,
            password:password
        }),
        headers:{
            "Content-Type": "application/json; charset-UTF-8"
        }
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=> {
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    })







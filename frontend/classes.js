var createuser = document.getElementById("createuser")

createuser.addEventListener('submit', function(e) {
    e.preventDefault()

    var first_name = document.getElementById("first_name").value
    var last_name = document.getElementById("last_name").value
    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var age = document.getElementById("age").value
    var password = document.getElementById("password").value

    fetch("http://localhost:7071/api/createusers", {
        method: 'POST',
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender, 
            age: age,
            password: password
        }), 
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    })
})


/*var deleteusers = document.getElementById("deleteuseres")
deleteusers.addEventListener('submit', function(e) {
    e.preventDefault()
    var email1 = document.getElementById("email").value
    fetch(`http://localhost:7071/api/deleteuser?email=${email1}`)
    .then(
        function(response){
            if(response.status !== 200){
                console.log("noget gik galt" + response.status)
                return;
            }
            response.json().then(function(data){
                console.log(data)
            })
        }
    )
})



/*var getButton = document.getElementById("getUsers")

getButton.addEventListener("click", function(){
    var name1 = document.getElementById("name").value
    fetch(`http://localhost:7071/api/user?name=${name1}`)
        .then(
            function(response){
                if (response.status !== 200){
                    console.log("Noget gik galt" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function (err){
            console.log(err);
        });
})*/
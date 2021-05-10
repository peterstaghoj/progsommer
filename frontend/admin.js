

var adminSlet = document.getElementById("adminDeleteForm")


adminSlet.addEventListener('submit', function(e){
    e.preventDefault()
    var email = document.getElementById("email").value
    fetch(`http://localhost:7071/api/deleteuser?email=${email}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
})
    .then(response=> response)
    .catch(function (err){
        console.log(err);
    });
})


var getUsers = document.getElementById("getUser")

getUsers.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(' http://localhost:7071/api/adfunc', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json; charset-UTF-8',
        }
    })
    .then((response)=> {
        return response.json();
    })
    .then((data)=> {
        console.log(data);
        const value = data[0].value;
        document.getElementById('users').textContent=value
    })
    .catch((err)=>{
        console.log(err)
    })
})


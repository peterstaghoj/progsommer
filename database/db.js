
/*const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;
*/


const { Connection, Request, TYPES} = require('tedious');
const config = require('./config.json')

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if (err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connected")
                resolve();
            }
        })
        connection.connect();
    })
}

module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

function insert(payload){
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO [eksamen].[users] (first_name, last_name, email, gender, age, password) VALUES (@first_name, @last_name, @email, @gender, @age, @password)`
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('first_name', TYPES.VarChar, payload.first_name)
        request.addParameter('last_name', TYPES.VarChar, payload.last_name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('age', TYPES.Date, payload.age)
        request.addParameter('password', TYPES.VarChar, payload.password)

        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
module.exports.insert = insert;

function select(first_name){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM [eksamen].[users] where first_name = @first_name'
        const request = new Request(sql, (err, rowCount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowCount == 0) {
                reject({message: 'User does not exist'})
            }
        });
        request.addParameter('first_name', TYPES.VarChar, first_name)
    
        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    })

}
module.exports.select = select;


function deleteusers(email){
    return new Promise((resolve, reject)=> {
        const sql = 'DELETE FROM [eksamen].[users] WHERE email = @email'
        const request = new Request(sql, (err, rowCount) =>{
            if (err, rowCount){
                reject(err)
                console.log(err)
            } else if (rowCount == 0){
                reject({message: 'No users with that email'})
            }
        });
        request.addParameter('email', TYPES.VarChar, email)

        request.on('requestCompleted', (columns) => {
            console.log('User deleted', columns);
            resolve('user deleted', columns)
        });
        connection.execSql(request)
    })
}

module.exports.deleteusers =deleteusers;

function updateusers(payload, email){
    return new Promise((resolve, reject)=>{
        const sql = 'UPDATE [eksamen].[users] SET first_name=@first_name, last_name=@last_name, gender=@gender, age=@age, password=@password WHERE email=@email'
        const request = new Request(sql, (err, rowCount)=> {
            if (err, rowCount){
                reject(err)
                console.log(err)
            } else if (rowCount == 0){
                reject({message: 'No users with that email'})
            }
        });
        request.addParameter('first_name', TYPES.VarChar, payload.first_name)
        request.addParameter('last_name', TYPES.VarChar, payload.last_name)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('age', TYPES.Date, payload.age)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('email', TYPES.VarChar, email)

        request.on('requestCompleted', (row)=>{
            console.log('user updated', row);
            resolve('user inserted', row)
        })
        connection.execSql(request)
    })
}
module.exports.updateusers=updateusers;

function countUsers(id){
    return new Promise((resolve, reject)=> {
        const sql = 'SELECT COUNT(id) FROM [eksamen].[users]'
        const request = new Request(sql, (err, rowCount)=>{
            if(err, rowCount){
                reject(err)
                console.log(err)
            } else if (rowCount == 0){
                reject({message: 'No users'})
            }
        })

        request.addParameter('id', TYPES.Int, id)
        request.on('row', (columns)=>{
            resolve(columns)
            console.log(columns)
        })
        connection.execSql(request)
    })
}



module.exports.countUsers = countUsers;

/*function seeAllMatches(id){
    return new Promise((resolve, rejects)=>{ 
        return 0
    })

}*/


function login(email, password){
    return new Promise((resolve, reject)=>{
        const sql = 'SELECT email, password FROM eksamen.users WHERE email = @email'
        const request = new Request(sql, (err, rowCount )=>{
            if(err){
                reject(err)
                console.log(err)    
            } else if(rowCount === 0){
                reject({message:'No user with that email and'})
            }
        })
        
        request.addParameter('email', TYPES.VarChar, email)
        request.addParameter('password', TYPES.VarChar, password)

        request.on('requestCompleted',(row)=>{
            resolve('email and password found', row)
            console.log(row)
        })
        connection.execSql(request)
    })
    

}

module.exports.login = login;


function getUserData(email, first_name, last_name, gender, age){
    return new Promise ((resolve, rejects)=>{
        const sql = 'SELECT first_name, last_name, gender, age FROM eksamen.users WHERE email = @email'
        const request = new Request(sql, (err)=>{
            if(err){
                rejects(err)
                console.log(err)
            }
        })
        
        request.addParameter('first_name', TYPES.VarChar, first_name)
        request.addParameter('last_name', TYPES.VarChar, last_name)
        request.addParameter('gender', TYPES.VarChar, gender)
        request.addParameter('age', TYPES.Date, age)
        request.addParameter('email', TYPES.VarChar, email)

        request.on('row', (column)=>{
            resolve('user data', column)
            console.log(column)
        })
        connection.execSql(request)
    })
}
module.exports.getUserData = getUserData;
db = require ('../database/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); 
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET':
            await getUserData (context, req);
            break;
    }

    async function getUserData(context, req){
        try{
        let email = req.query.email
        let userData = await db.getUserData(email)
        context.res = {
            body: userData
        }
    }  catch(err) {
            context.res = {
                status: 400,
                body: err
            }
    } 

    }
}
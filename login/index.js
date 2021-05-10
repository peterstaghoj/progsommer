db = require ('../database/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        await db.startDb(); 
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        default:
            context.res = {
                body: "Please get or get"
            };
            break
    }

    async function get(context, req){
        try{
        let email = req.query.email
        let password = req.query.password
        let result = await db.login(email, password)
        context.res ={
            body: {status: `you are logedin with email ${email}`}
        }
    }catch (error){
        context.res = {
            status: 400,
            body: error.message
        }
    }

}



}



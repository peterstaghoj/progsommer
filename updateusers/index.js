db = require('../database/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

try {
    await db.startDb();
} catch (error){
    console.log("error connecting to the database", error.message)
}
switch(req.method) {
    case 'PUT':
        await put(context, req);
        break;
    default:
        context.res = {
            body: "please put"
        }
        break
}
}

async function put (context, req){
    try{
        let email = req.query.email
        let payload = req.body;
        await db.updateusers(payload, email)
        context.res = {
            body: {status: 'succes user updated'}
        } 
    }catch (err) {
            context.res = {
                status: 400,
                body: err
            }
        }
    }


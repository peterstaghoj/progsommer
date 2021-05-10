db = require ('../database/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); 
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'DELETE':
            await del(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please delete or post"
            };
            break
    }
}

async function del(context, req){
    try{
        let email = req.query.email;
        let del = await db.deleteusers(email)
        context.res = {
            body: {status:'Success'}
        };
    } catch(err){
        context.res = {
            status: 400,
            body: `No user- ${err}`
        }
    }
}


db = require ('../database/db')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); 
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET':
            await get(context, req);
            break;
        case 'POST':
            await post(context, req);
            break
        default:
            context.res = {
                body: "Please get or post"
            };
            break
    }
}

async function get (context, req){
    try{
        //let id = req.query.id;
        let value = await db.countUsers()
        context.res= {
            body: value,
        }
    } catch(err){
        context.res = {
            status: 400,
            body: { message: 'no users' + err.message},
        }
    }

}
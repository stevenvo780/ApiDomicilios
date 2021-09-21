import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

const cors = initMiddleware(
    Cors({
        // Only allow request with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
)



const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {

    await cors(req, res)

    // switch the methods
    switch (req.method) {
        
        case 'GET': {
            return res.send("You're sendind GET request")
        }
        
        case 'POST': {
            return authUsers(req, res);
        }

        case 'PUT': {
            return res.send("You're sendind PUT request")
        }

        case 'DELETE': {
            return res.send("You're sendind DELETE request")
        }
    }
}

async function authUsers(req, res) { // Working

    await cors(req, res)

    try {
        // connect to the database

        const { db } = await connectToDatabase()

        const { username, password } = req.body
        const validateUser = {
            username: username,
            password:password
        }

        // Fetch the posts
        let user = await db
            .collection("User")
            .find({
                username: validateUser.username,
                password: validateUser.password
            })
            //.sort({ published: -1 })
            .toArray()

        // Return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(user)),
            success: true,
        })
    } catch (e) {

        // return the error
        return res.json({
            message: new Error(e).message,
            success: false,
        });

    }
}
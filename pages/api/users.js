import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'
import { v4 as uuidv4 } from 'uuid';

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
            return getUsers(req, res);
        }


        case 'POST': {
            return addUser(req, res);
        }

        case 'PUT': {
            return updateUser(req, res);
        }

        case 'DELETE': {
            return deleteUser(req, res);
        }
    }
}



async function getUsers(req, res) { // Working

    await cors(req, res)

    try {
        // connect to the database

        const { db } = await connectToDatabase()

        // Fetch the posts
        let users = await db
            .collection("User")
            .find({})
            .sort({ published: -1 })
            .toArray()

        // Return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(users)),
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




async function addUser(req, res) { // Working

    try {
        await cors(req, res)
        // Connect to the database
        let { db } = await connectToDatabase()

        const { username, email, address, password, rol } = req.body

        const user = {
            id: uuidv4(),
            username,
            email,
            address,
            password,
            rol
        }

        let valEmail = await db.collection("User").findOne({ email: email})

        if (valEmail) {
            res.json({
                message: 'User already exits',
                success: false
            })
        } else {
    
            // Add the User    
            //await db.collection("User").insertOne(JSON.parse(req.body))

            await db.collection("User").insertOne(user)

            // Return a message
            
        }

        return res.json({
            message: 'User Added Succesfully',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            success: true,
        })

        

    } catch (e) {
        // Return an error
        return res.json({
            message: new Error(e).message,
            success: false,
        })
    }
}



/*
async function addUser(req, res) { // Working
    try {
        // Connect to the database
        let { db } = await connectToDatabase()

        const { name, address, password, rol } = req.body

        const user = {
            name,
            address, 
            password,            
            rol
        }

        // Add the User    
        //await db.collection("User").insertOne(JSON.parse(req.body))
        await db.collection("User").insertOne(user)

        // Return a message
        return res.json({
            message: 'User Added Succesfully',
            Headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            },
            success: true,
        })
    } catch (e) {
        // Return an error
        return res.json({
            message: new Error(e).message,
            success: false,
        })
    }
}
*/













async function updateUser(req, res) { // Working
    try {
        // Connect to the database
        let { db } = await connectToDatabase()


        // Update the published status of the post

        const { _id, name, current_location } = req.body

        const updateUser = {
            _id,
            name,
            current_location
        }

        await db.collection("User").updateOne(
            {
                _id: updateUser._id
            },
            { $set: { published: true } }
        )


        /*
        await db.collection("User").updateOne(
            {
                _id: new ObjectId(req.body),
            },
            {$set: {published: true}}
        )
        */


        // Return a message
        return res.json({
            message: 'User updated successfully',
            success: true,
        })
    } catch (e) {
        // Return an error
        return res.json({
            message: new Error(e).message,
            success: false
        })
    }
}



async function deleteUser(req, res) { // Working
    try {
        // Connecting to the database
        let { db } = await connectToDatabase()

        // Deleting the post
        await db.collection("User").deleteOne({
            _id: new ObjectId(req.body),
        })

        return res.json({
            message: 'User deleted successfully',
            success: true,
        })
    } catch (e) {
        // Returning an error
        return res.json({
            message: new Error(e).message,
            success: false,
        })
    }
}

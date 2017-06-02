const Hapi = require('hapi');
const server = new Hapi.Server();
// const Joi = require('joi');
const mongoose = require('mongoose');
const corsHeaders = require('hapi-cors-headers');

// mongoose.connect('mongodb://localhost:27017/QandA-DB'); // connect to locol mongoDB
mongoose.connect('mongodb://tulakan:Kan56050206@ds133321.mlab.com:33321/q-and-a-system'); // connect to mLab mongoDB

const port = process.env.PORT || 7000; // process.env.PORT is port when deploy to heroku

server.connection({ port: port });
server.ext('onPreResponse', corsHeaders); // add corsHeader on pre-response

server.register({
    register: require('hapi-swagger'), //add swagger
    options: {
        apiVersion: "0.0.1"
    }
}, function(err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.register([ // add route to app.js
    require('./routes/user'),
    require('./routes/quiz'),
    require('./routes/playlist'),
    require('./routes/answer')
], (err) => {
    if (err) {
        throw err;
    }
});


// =============== Routes for our API =======================
/*
server.route({
    method: 'GET',      // Methods Type
    path: '/api/getUser',  // Url
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data'
    },
    handler: function (request, reply) { //Action
        // Response JSON object
        reply({
            statusCode: 200,
            message: 'Getting All User Data',
            data: [
                {
                    name:'Kashish',
                    age:24
                },
                {
                    name:'Shubham',
                    age:21
                }
            ]
        });
    }
});

server.route({
    method: 'POST',
    path: '/api/addUser',
    config: {
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Save user data',
        notes: 'Save user data',
        // We use Joi plugin to validate request
        validate: {
            payload: {
                // Both name and age are required fields
                name: Joi.string().required(),
                age: Joi.number().required()
            }
        }
    },
    handler: function (request, reply) {

        // Create mongodb user object to save it into database
        const user = new UserModel(request.payload);

        // Call save methods to save data into database
        // and pass callback methods to handle error
        user.save(function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: error
                });
            } else {
                reply({
                    statusCode: 201,
                    message: 'User Saved Successfully'
                });
            }
        });
    }
});

// Fetching all users data
server.route({
    method: 'GET',
    path: '/api/listUser',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data'
    },
    handler: function (request, reply) {
        //Fetch all data from mongodb User Collection
        UserModel.find({}, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Data Successfully Fetched',
                    data: data
                });
            }
        });
    }
});

server.route({
    method: 'GET',
    //Getting data for particular user "/api/user/1212313123"
    path: '/api/getUserbyID/{id}',
    config: {
        tags: ['api'],
        description: 'Get specific user data',
        notes: 'Get specific user data',
        validate: {
            // Id is required field
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: function (request, reply) {

        //Finding user for particular userID
        UserModel.find({_id: request.params.id}, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                if (data.length === 0) {
                    reply({
                        statusCode: 200,
                        message: 'User Not Found',
                        data: data
                    });
                } else {
                    reply({
                        statusCode: 200,
                        message: 'User Data Successfully Fetched',
                        data: data
                    });
                }
            }
        });
    }
});

server.route({
    method: 'PUT',
    path: '/api/updateUser/{id}',
    config: {
        // Swagger documentation fields tags, description, note
        tags: ['api'],
        description: 'Update specific user data',
        notes: 'Update specific user data',

        // Joi api validation
        validate: {
            params: {
                //`id` is required field and can only accept string data
                id: Joi.string().required()
            },
            payload: {
                name: Joi.string(),
                age: Joi.number()
            }
        }
    },
    handler: function (request, reply) {

        // `findOneAndUpdate` is a mongoose modal methods to update a particular record.
        UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Updated Successfully',
                    data: data
                });
            }
        });

    }
});

server.route({
    method: 'DELETE',
    path: '/api/deleteUser/{id}',
    config: {
        tags: ['api'],
        description: 'Remove specific user data',
        notes: 'Remove specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: function (request, reply) {

        // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
        UserModel.findOneAndRemove({_id: request.params.id}, function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Error in removing User',
                    data: error
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Deleted Successfully'
                });
            }
        });

    }
});
*/
// =============== Start our Server =======================
// Lets start the server
server.start(function() { //start  running server
    console.log('Server running at:', server.info.uri);
});
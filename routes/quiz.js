/**
 * Created by Kanrawee Karaboot on 4/3/2017.
 */
const Joi = require('joi');
const mongoose = require('mongoose');

exports.register = function(server, options, next) {

    const quizModel = require('../models/quizModel');
    // Fetching all users data
    server.route({
        method: 'GET',
        path: '/quiz/listQuiz',
        config: {
            // Include this API in swagger documentation
            tags: ['api'],
            description: 'List All Quiz',
            notes: 'List All Quiz'
        },
        handler: function (request, reply) {
            //Fetch all data from mongodb User Collection
            quizModel.find({}, function (error, data) {
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
        method: 'POST',
        path: '/quiz/addQuiz',
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Add Quiz data',
            notes: 'Add Quiz data',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    question: Joi.string().required(),
                    choice: {
                        choice1:Joi.string().required(),
                        choice2:Joi.string().required(),
                        choice3:Joi.string(),
                        choice4:Joi.string()
                    }
                }
            }
        },
        handler: function (request, reply) {

            // Create mongodb user object to save it into database
            const quiz = new quizModel(request.payload);

            // Call save methods to save data into database
            // and pass callback methods to handle error
            quiz.save(function (error) {
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

    server.route({
        method: 'GET',
        //Getting data for particular user "/api/user/1212313123"
        path: '/quiz/searchQuizbyKeyword/{searchKeyword}',
        config: {
            tags: ['api'],
            description: 'Search Quiz by Keyword',
            notes: 'Search Quiz by Keyword',
            validate: {
                // Id is required field
                params: {
                    searchKeyword: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            // const quiz = new quizModel(request.payload);
            //Finding user for particular userID
            quizModel.find({'question': {'$regex': request.params.searchKeyword}}, function (error, data) {
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
                            message: 'Quiz Not Found',
                            data: data
                        });
                    } else {
                        reply({
                            statusCode: 200,
                            message: 'Quiz Data Successfully Fetched',
                            data: data
                        });
                    }
                }
            });
        }
    });

    return next();
};



exports.register.attributes = {
    name: 'routes-quiz'
};

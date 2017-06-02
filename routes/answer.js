/**
 * Created by Kanrawee Karaboot on 4/3/2017.
 */
const Joi = require('joi');
const mongoose = require('mongoose');

exports.register = function(server, options, next) {

    const answerModel = require('../models/answerModel');

    // list all playlist
    server.route({
        method: 'GET',
        path: '/answer/list',
        config: {
            // Include this API in swagger documentation
            tags: ['api'],
            description: 'List All Answer',
            notes: 'List All Answer'
        },
        handler: function (request, reply) {
            //Fetch all data from mongodb User Collection
            answerModel.find({}, function (error, data) {
                if (error) {
                    reply({
                        status:false,
                        statusCode: 503,
                        message: 'Failed to get data',
                        data: error
                    });
                } else {

                    reply({
                        status:true,
                        statusCode: 200,
                        message: 'Playlist Data Successfully Fetched',
                        data: data
                    });
                }
            });
        }
    });

    //get Answer by ID
    server.route({
        method: 'GET',
        //Getting data for particular user "/api/user/1212313123"
        path: '/answer/getByID/{id}',
        config: {
            tags: ['api'],
            description: 'Get specific answer',
            notes: 'Get specific answer',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {

            //Finding user for particular userID
            answerModel.find({_id: request.params.id}, function (error, data) {
                if (error) {
                    reply({
                        status:false,
                        statusCode: 503,
                        message: 'Failed to get data',
                        data: error
                    });
                } else {
                    if (data.length === 0) {
                        reply({
                            status:true,
                            statusCode: 200,
                            message: 'Answer Not Found',
                            data: data
                        });
                    } else {
                        // userModel.find({equipmentNo: data.data[0]}, function (error, data) {
                        //
                        // }
                        reply({
                            statusCode: 200,
                            message: 'Answer Data Successfully Fetched',
                            data: data
                        });

                    }
                }
            });
        }
    });

    //add playlist
    server.route({
        method: 'POST',
        path: '/answer/add',
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Add Answer',
            notes: 'Add Answer',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    playlistID : Joi.string().required(),
                    playlistName : Joi.string().required(),
                    answer : Joi.array().required(),
                    dateTime : Joi.string().required(),
                }
            }
        },
        handler: function (request, reply) {

            // Create mongodb user object to save it into database
            const answer = new answerModel(request.payload);

            // Call save methods to save data into database
            // and pass callback methods to handle error
            answer.save(function (error) {
                if (error) {
                    reply({
                        status:false,
                        statusCode: 503,
                        message: error
                    });
                } else {
                    reply({
                        status:true,
                        statusCode: 201,
                        message: 'Playlist Saved Successfully'
                    });
                }
            });
        }
    });

    //search quiz by keyword
    // server.route({
    //     method: 'GET',
    //     //Getting data for particular user "/api/user/1212313123"
    //     path: '/quiz/searchQuizbyKeyword/{searchKeyword}',
    //     config: {
    //         tags: ['api'],
    //         description: 'Search Quiz by Keyword',
    //         notes: 'Search Quiz by Keyword',
    //         validate: {
    //             // Id is required field
    //             params: {
    //                 searchKeyword: Joi.string().required()
    //             }
    //         }
    //     },
    //     handler: function (request, reply) {
    //         // const quiz = new quizModel(request.payload);
    //         //Finding user for particular userID
    //         quizModel.find({'question': {'$regex': request.params.searchKeyword}}, function (error, data) {
    //             if (error) {
    //                 reply({
    //                     statusCode: 503,
    //                     message: 'Failed to get data',
    //                     data: error
    //                 });
    //             } else {
    //                 if (data.length === 0) {
    //                     reply({
    //                         statusCode: 200,
    //                         message: 'Quiz Not Found',
    //                         data: data
    //                     });
    //                 } else {
    //                     reply({
    //                         statusCode: 200,
    //                         message: 'Quiz Data Successfully Fetched',
    //                         data: data
    //                     });
    //                 }
    //             }
    //         });
    //     }
    // });

    //delete quiz
    // server.route({
    //     method: 'GET',
    //     path: '/quiz/deleteQuiz/{id}',
    //     config: {
    //         tags: ['api'],
    //         description: 'Remove specific user data',
    //         notes: 'Remove specific user data',
    //         validate: {
    //             params: {
    //                 id: Joi.string().required()
    //             }
    //         }
    //     },
    //     handler: function (request, reply) {
    //
    //         // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    //         quizModel.findOneAndRemove({_id: request.params.id}, function (error) {
    //             if (error) {
    //                 reply({
    //                     status:false,
    //                     statusCode: 503,
    //                     message: 'Error in removing Quiz',
    //                     data: error
    //                 });
    //             } else {
    //                 reply({
    //                     status:true,
    //                     statusCode: 200,
    //                     message: 'Quiz Deleted Successfully'
    //                 });
    //             }
    //         });
    //
    //     }
    // });

    //updata quiz
    // server.route({
    //     method: 'POST',
    //     path: '/quiz/updateQuiz',
    //     config: {
    //         // Swagger documentation fields tags, description, note
    //         tags: ['api'],
    //         description: 'Update specific quiz',
    //         notes: 'Update specific quiz',
    //
    //         // Joi api validation
    //         validate: {
    //             // params: {
    //             //     //`id` is required field and can only accept string data
    //             //     id: Joi.string().required()
    //             // },
    //             payload: {
    //                 // Both name and age are required fields
    //                 id: Joi.string().required(),
    //                 question: Joi.string().required(),
    //                 choice: {
    //                     choice1:Joi.string().required(),
    //                     choice2:Joi.string().required(),
    //                     choice3:Joi.string(),
    //                     choice4:Joi.string(),
    //                 },
    //                 correctChoice : Joi.string().required(),
    //                 learningGroup : Joi.string().required(),
    //                 classLevel : Joi.string().required(),
    //                 quizType : Joi.string().required(),
    //                 difficulty : Joi.string().required(),
    //                 time : Joi.string().required(),
    //                 timeUnit : Joi.string().required(),
    //                 tag : Joi.array(),
    //             }
    //         }
    //     },
    //     handler: function (request, reply) {
    //
    //         // `findOneAndUpdate` is a mongoose modal methods to update a particular record.
    //         quizModel.findOneAndUpdate({_id: request.payload.id}, request.payload, function (error, data) {
    //             if (error) {
    //                 reply({
    //                     status:false,
    //                     statusCode: 503,
    //                     message: 'Failed to get data',
    //                     data: error
    //                 });
    //             } else {
    //                 reply({
    //                     status:true,
    //                     statusCode: 200,
    //                     message: 'Quiz Updated Successfully',
    //                     data: data
    //                 });
    //             }
    //         });
    //
    //     }
    // });

    return next();
};



exports.register.attributes = {
    name: 'routes-answer'
};

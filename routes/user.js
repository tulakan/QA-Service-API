/**
 * Created by Kanrawee Karaboot on 4/3/2017.
 */
const Joi = require('joi');
const mongoose = require('mongoose');

exports.register = function(server, options, next) {

    const UserModel = require('../models/user');
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

    return next();
};

exports.register.attributes = {
    name: 'routes-user'
};

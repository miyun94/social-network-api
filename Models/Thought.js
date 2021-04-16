const { Schema, model } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat'); 

//create scehma 
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String, 
            required: 'Text is required', 
            validate: [({ length }) => length >=128]
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        }, 
        username: {
            type: String, 
            required: 'Username is required'
        }, 
        reactions: [
            //idk how to make an array of nested documents created with reactionSchema?!?
        ]
    }, 
    {
        toJSON: {
            virtuals: true
        }, 
        //is it false?!
        id: false
    },
);

//retrieve the length of the thought's reaction???

//create User model with Userschema 
const Thought = model('Thought', ThoughtSchema); 

//export
module.exports = Thought; 
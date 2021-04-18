const { Schema, model } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat'); 
const reactionSchema = require('./Reaction')

//create scehma 
const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String, 
            required: 'Text is required', 
            validate: [({ length }) => length <=128]
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
            [reactionSchema]
        ]
    }, 
    {
        toJSON: {
            virtuals: true
        }, 
        id: false
    },
);

//retrieve the length of the thought's reaction???
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//create User model with Userschema 
const Thought = model('Thought', ThoughtSchema); 

//export
module.exports = Thought; 
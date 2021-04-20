const { Schema, model, Types } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat'); 

//create schema 
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        }, 
        reactionBody: {
            type: String, 
            require: 'This section is required!', 
            maxlength: 280
        }, 
        username: {
            type: String, 
            require: 'Username required'
        },
        createdAt:{
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }, 
    {
        toJSON: {
            getters: true
        }, 
        id: false
    },
); 

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
        reaction: [reactionSchema]
    }, 
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    },
);

//retrieve the length of the thought's reaction???
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
});

//create User model with Userschema 
const Thought = model('Thought', ThoughtSchema); 

//export
module.exports = Thought; 
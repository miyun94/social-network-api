const { Schema } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat'); 

//create schema 
const ReactionSchema = new Schema (
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
            virtuals: true
        }, 
        id: false
    },
); 

module.exports = ReactionSchema; 

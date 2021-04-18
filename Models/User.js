const { Schema, model } = require('mongoose'); 

const Userschema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            trim: true, 
            required: 'Username required!', 
        },
        email: {
            type: String, 
            required: 'Email is required!', 
            unique: true, 
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        //Array of _id values referencing the Thought model 
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought',
            }
        ],
        //array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        }, 
        id: false
    },
);

//create virtual to retrieves the length of the user's friend array field on query
Userschema.virtual('friendCount').get(function(){
    return this.friends.length; 
}); 

//create User model with Userschema 
const User = model('User', Userschema); 

//export
module.exports = User; 
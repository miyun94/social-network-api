const { Thought, User } = require('../Models'); 
const router = require('express').Router(); 

//get all thoughts
router.get('/all', (req, res) => {
    Thought.find({})
    .then(dbThoughtdata => res.json(dbThoughtdata))
    .catch(err => {
        res.status(400).json(err)
    }); 
}); 

//get single thought by _id
router.get('/:id', ({params}, res) => {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({ message: "Nothing found with this id"});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err=> res.status(400).json(err))
}); 

//post to create a new thought and push the created thought's _id to the associated user's thoughts array field
router.post('/', ({body}, res) => {
    Thought.create(body)
    .then(newThought => {
        return User.findOneAndUpdate({_id: body.userid}, 
        {$push : {thoughts : newThought._id}}, 
        {new: true, runValidators: true})
    })
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(400).json({message: "Nothing found with that id"}); 
            return; 
        }
        res.json(dbThoughtdata); 
    })
    .catch(err=> res.json(err)); 
});  


//put to update a thought by its _id 
router.put('/update/:id', (({params, body}, res) => {
    Thought.findOneAndUpdate({_id: params.id}, {$set: body}, {runValidators: true, new: true})
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({ message: "Nothing found with this id"});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err=> res.status(400).json(err))
}));

//delete to remove a thought by its _id 
router.delete('/delete/:id', ({params}, res) => {
    Thought.findOneAndDelete({ _id: params.id})
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({message: "Nothing found with this id"}); 
            return; 
        }
        return User.findOneAndUpdate({thoughts: params.id}, {$pull: {thoughts: params.id}}, {new: true}); 
    })
    .then(userData => {
        if(!userData){
            return res.status(404).json()
        }
    })
    .catch(err=> res.status(400).json(err));     
})

//post to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions',({params, body}, res) => {
    Thought.findOneAndUpdate({_id: params.thoughtId}, 
        {$addToSet: {reactions: body}},
        {runValidators: true, 
            new: true})
        .then(dbThoughtdata => {
            if(!dbThoughtdata){
                res.status(404).json({message: "No thought found with this Id"}); 
                return; 
            }
            console.log(dbThoughtdata)
            res.json(dbThoughtdata); 
        })
        .catch(err=> res.status(400).json(err));
    });

//delete to pull and remove a reaction by the reaction's reactionId value 
router.delete('/:thoughtId/reactions/:reactionId', ({params, body}, res) => {
    Thought.findOneAndUpdate({_id: params.thoughtId}, 
        {$pull: {reaction: {reactionId: body.reactionId}}}, 
        {   runValidators: true,
            new: true})
        .then(dbThoughtdata => {
            if(!dbThoughtdata){
                res.status(404).json({message: "No thought found with this Id"}); 
                return; 
            }
            res.json(dbThoughtdata); 
        })
        .catch(err=> res.status(400).json(err));
    });


module.exports = router; 
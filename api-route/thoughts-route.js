const { db } = require('../Models/Thought'); 

//get all thoughts
app.get('/all', (req, res) => {
    db.Thought.find({})
    .then(dbThoughtdata => res.json(dbThoughtdata))
    .catch(err => {
        res.status(400).json(err)
    }); 
}); 

//get single thought by _id
app.get('/:id', ({params}, res) => {
    db.Thought.findOne({ _id: params.id })
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({ message: "Nothing foudn with this id"});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err=> res.status(400).json(err))
}); 

//post to create a new thought and push the created thought's _id to the associated user's thoughts array field
app.post('/thought', ({params, body}, res) => {
    db.Thought.findOneAndUpdate(
        {_id: params.thoughtId}, 
        {$push : {users : body}}, 
        {new: true, runValidators: true}
    )
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
app.put('/update/:id', ({params, body}, res => {
    db.Thought.findOneAndUpdate({_id: params.id}, body)
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({ message: "Nothing foudn with this id"});
            return;
        }
        res.json(dbThoughtdata)
    })
    .catch(err=> res.status(400).json(err))
}));

//delete to remove a thought by its _id 
app.delete('/delete/:id', ({params}, res) => {
    User.findOneAndDelete({ _id: params.id})
    .then(dbThoughtdata => {
        if(!dbThoughtdata){
            res.status(404).json({message: "Nothing found with this id"}); 
            return; 
        }
        res.json(dbUserdata); 
    })
    .catch(err=> res.status(400).json(err));     
})
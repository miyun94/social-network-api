const { db } = require("../Models/User");

//get all users 
app.get('/all', (req, res) =>{
    db.User.find({})
    .then(dbUserdata => res.json(dbUserdata))
    .catch(err=> {
        res.status(400).json(err)
    }); 
}); 

//get a single user by its _id and populated thought and friend data
app.get('/populate', ({params}, res)=>{
    db.User.findOne({_id: params.id})
    .populate({
        path: 'thoughts'
    })
    .then(dbUserdata => {
        if(!dbUserdata){
            res.status(404).json({message: "No user found with this Id"}); 
            return; 
        }
        res.json(dbUserdata)
    })
    .catch(err=> res.status(400).json(err)); 
}); 

//post a new user 
app.post('/submit/user'), ({ body }, res) => {
    db.User.create(body)
    .then(dbUserdata => {
        res.json(dbUserdata); 
    })
    .catch(err => {
        res.json(err)
    });
};

//put to update a user by its _id
app.put('/update/:id', ({ params, body }, res =>{
    db.User.findOneAndUpdate({_id: params.id}, body)
    .then(dbUserdata => {
        if(!dbUserdata){
            res.status(404).json({message: "No user found with this Id"}); 
            return; 
        }
        res.json(dbUserdata); 
    })
    .catch(err=> res.status(400).json(err)); 
})); 

//delete to remove user by its _id 
app.delete('/delete/:id', ({params}, res) => {
    User.findOneAndDelete({ _id: params.id})
    .then(dbUserdata => {
        if(!dbUserdata){
            res.status(404).json({message: "No user found with this Id"}); 
            return; 
        }
        res.json(dbUserdata); 
    })
    .catch(err=> res.status(400).json(err));     
})
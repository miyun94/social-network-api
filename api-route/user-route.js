const { User } = require("../Models"); 
const router = require('express').Router(); 

//get all users 
router.get('/all', (req, res) =>{
    User.find({})
    .then(dbUserdata => res.json(dbUserdata))
    .catch(err=> {
        res.status(400).json(err)
    }); 
}); 

//get a single user by its _id and populated thought and friend data
router.get('/:id', ({params}, res)=>{
    User.findOne({_id: params.id})
    .populate('friends')
    .populate('thoughts')
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
router.post('/submit', ({ body }, res) => {
    User.create(body)
    .then(dbUserdata => {
        console.log(dbUserdata)
        res.json(dbUserdata); 
    })
    .catch(err => {
        res.json(err)
    });
});

//put to update a user by its _id
router.put('/update/:id', (({ params, body }, res) =>{
    User.findOneAndUpdate({_id: params.id}, 
        {$set: body}, 
        {runValidators:true, 
        new: true})
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
router.delete('/delete/:id', ({params}, res) => {
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

//post to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', ({params}, res) => {
    User.findOneAndUpdate({_id: params.userId}, 
        {$addToSet: {friends: params.friendId}}, 
        {new: true})
        .then(dbUserdata => {
            if(!dbUserdata){
                res.status(404).json({message: "No user found with this Id"}); 
                return; 
            }
            res.json(dbUserdata); 
        })
        .catch(err=> res.status(400).json(err));
    });

//delete to remove a friend from user's friend list 
router.delete('/:userId/friends/:friendId', ({params}, res) => {
    User.findOneAndUpdate({_id: params.userId}, 
        {$pull: {friends: params.friendId}}, 
        {new: true})
        .then(dbUserdata => {
            if(!dbUserdata){
                res.status(404).json({message: "No user found with this Id"}); 
                return; 
            }
            res.json(dbUserdata); 
        })
        .catch(err=> res.status(400).json(err));
    });

module.exports = router; 
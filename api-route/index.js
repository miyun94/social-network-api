const router = require('express').Router(); 
const userR = require('./user-route'); 
const thoughtsR = require('./thoughts-route'); 

router.use('/api/user', userR);
router.use('/api/thoughts', thoughtsR);


// router.use((req, res) => {
//     return res.send('Route not found!'); 
// }) 

module.exports = router; 
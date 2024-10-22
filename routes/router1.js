const express=require('express');
const router=express.Router();
const {User}=require('../db/database');
router.get('/details',async(req,res)=>{
    try{
        const result=await User.find()
        res.json(result)
    }
    catch{
        console.log("error fetching data")
    }
})
router.post('/send', async (req, res) => {
    const user = new User({
        name: req.body.name,
        tech: req.body.tech,
        stack: req.body.stack
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});
router.get('/detailsById/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});
router.delete('/deleted/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});
router.patch('/update/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }        
        if (req.body.name) user.name = req.body.name;
        if (req.body.tech) user.tech = req.body.tech;
        if (req.body.stack) user.stack = req.body.stack;
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});
module.exports = router;
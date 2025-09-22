// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

router.get('/', async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry: user.pantry,
            userId: user._id,
        });
    } catch (error){
        console.log(error);
        res.redirect('/')
    }
});


router.get('/new', (req, res) => {
    res.render('foods/new.ejs' , {
    userId: req.session.user._id,
});
});

router.post('/', async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id);
        user.pantry.push(req.body);
        await user.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error){
        console.log(error);
        res.redirect('/')
    }
});

router.get('/:itemId/edit', async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id);
        const food = user.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', {
            userId: user._id,
            food: food,
        });
    } catch (error){
        console.log(error);
        res.redirect('/')
    }
});

router.put('/:itemId', async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id);
        const food = user.pantry.id(req.params.itemId);
        food.name = req.body.name;
        food.category = req.body.category;
        food.quantity = req.body.quantity;
        await user.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error){
        console.log(error);
        res.redirect('/')
    }
});


router.delete('/:itemId', async(req, res) => {
    try{
        const user = await User.findById(req.session.user._id);
        user.pantry.id(req.params.itemId).deleteOne();
        await user.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error){
        console.log(error);
        res.redirect('/')
    }
});


module.exports = router;

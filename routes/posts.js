const express = require('express');
const route = express.Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');
const User = require('../model/User');
const { JsonWebTokenError } = require('jsonwebtoken');

//CREATE POSTS IF USER IS LOGGED IN
route.post('/', verify, async (req, res) => {

    const { detail, title } = req.body;

    try {
        const post = new Post({
            detail,
            title,
            postedBy: req.user._id
        });

        //https://stackoverflow.com/questions/34985846/mongoose-document-references-with-a-one-to-many-relationship

        await Post.create(post);

        const user = await User.findById(req.user._id).exec();

        if (user) {

            user.posts.push(post);

            user.save();

            res.json({ message: 'Post created!' })
        }

    } catch (error) {
        res.status(400).send(error)
    }

});

//GET POST FROM A SPECIFIC USER
route.get('/', verify, async (req, res) => {

    const posts = await Post.find({ postedBy: req.user._id }).exec();

    res.send(posts);
});

//DELETE POST
route.delete('/:postId', verify, async (req, res) => {

    try {
        const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });

        const user = await User.findById(req.user._id).exec();

        const filteredPosts = user.posts.filter(post => post._id.toString() !== req.params.postId);

        user.posts = filteredPosts;

        await user.save();

        if (deletedPost) res.status(200).json({ message: 'post deleted' })

    } catch (error) {
        res.status(400).json({ message: error });
    }

});

module.exports = route;
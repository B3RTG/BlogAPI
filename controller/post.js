require('dotenv').config();
require('../dbaccess/mongodb');

const { request, response } = require("express");
const express = require("express");
const postErrorHandler = require('../middleware/PostErrorHandler');

//Post model
const Post = require('../models/post')

//Datos iniciales post
let posts = []

const router = express.Router();

router.get("/", (request, response) => {
    Post.find({}).then(( postdata ) => {
        response.status(200).json(postdata);
    }).catch((err) => {
        response.status(204).json({err: `No data: ${err}`});
    });    
});

router.get("/:id", (request, response, next) => {
    const id = request.params.id;
    Post.findById(id).then((postData) => {
        if(postData) {
            response.status(200).json(postData);
        } else {
            response.status(404).end();
        }
    }).catch( (err) => {
        next(err);
        // console.log(err);
        // response.status(400).end();
    });
});

router.delete("/:id", (request, response, next) => {
    const {id} = request.params;

    Post.findByIdAndRemove(id).then( result => {
        response.status(204).end();
    }).catch(err => next(err));

});

router.post("/", (request, response) => {
    const data = request.body;

    if(!data || !data.Content) {
        return response.status(400).json({
            error: 'data or data.contet is missing'
        })
    }

    const newPost = new Post( {
        Title: data.Title,
        Subtitle: data.Subtitle,
        PostType: data.PostType,
        Content: data.Content,
        CreateDate: new Date(),
        UpdateDate: new Date(),
        Author: data.Author,
        ImageURL: data.ImageURL
    });

    console.log(newPost);
    newPost.save().then(savedPost => {
        response.status(201).json(savedPost);
    }).catch(err => {
        response.status(500).json({ error: err});
    });
});

router.put("/", (request, response, next) => {

    const {id} = request.params;
    const data = request.body;

    const postData = {
        Title: data.Title,
        Subtitle: data.Subtitle,
        PostType: data.PostType,
        Content: data.Content,
        UpdateDate: new Date(),
        Author: data.Author,
        ImageURL: data.ImageURL
    };

    Post.findByIdAndUpdate(id, postData, {new:true}).then( result => {
        response.json(result);
    }).catch(err => {
        next(err);
    })
});

router.use(postErrorHandler)
module.exports = router;
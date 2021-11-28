const { request, response } = require("express");
const express = require("express");


//Datos iniciales post
var posts = [
    {
        id: 1,
        title: "Post numero uno",
        type: "generic",
        content: "post content"
    },
    {
        id: 2,
        title: "Post numero dos",
        type: "generic",
        content: "post content"
    },
    {
        id: 3,
        title: "Post numero tres",
        type: "generic",
        content: "post content"
    }
]


const router = express.Router();
router.get("/", (request, response) => {
    response.status(200).json(posts);
});

router.get("/:id", (request, response) => {
    const id = Number(request.params.id);
    const post = posts.find((p)=>p.id === id);
    if (post) response.status(200).json(post);
    else response.status(404).end();
});

router.post("/", (request, response) => {
    const data = request.body;

    if(!data || !data.content) {
        response.status(400).json({
            error: 'data or data.contet is missing'
        })
    }

    const ids = posts.map( m => m.id);
    const id = Math.max(...ids);
    const newPost = {
        id: id + 1,
        title: data.title,
        type: data.type,
        content: data.content
    }

    posts = posts.concat(newPost);
    response.status(201).json(newPost);
});


module.exports = router;
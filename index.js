const { request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");

//enable body data
app.use(express.json());
//enable cors
app.use(cors());

const postController = require("./controller/post");
const userController = require("./controller/user");
const logger = require("./logger");

// app.get("/", (request, response) => {
//     response.send("<h1>Blog api</h1>");
// })

app.use(logger);

//setup routes
app.use('/api/post', postController);
app.use('/api/user', userController);

// rutas que no llegan
app.use((request,response) => {
    response.status(404).json({
        error: 'Not found'
    })
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
})
const { request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const notFoundHandler = require("./middleware/NotFoundHandler");

//enable body data
app.use(express.json());
//enable cors
app.use(cors());
// import controllers
const postController = require("./controller/post");
const userController = require("./controller/user");

// Setup logger, maibe we can modify to better information
const logger = require("./logger");
app.use(logger);

//setup routes
app.use('/api/post', postController);
app.use('/api/user', userController);

// not defined routes, response not found
app.use(notFoundHandler);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on PORT ${port}`);
})
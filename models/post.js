const {Schema, model} = require('mongoose')

const postSchema = new Schema({
    //id autocreated
   Title: String,
   Subtitle: String,
   PostType: String,
   Content: String,
   CreateDate: Date,
   UpdateDate: Date,
   Author: String,
   ImageURL: String
});

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id=returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Post = model('Post', postSchema);

module.exports = Post;


// Sample find data in mongo db with the schema
// Post.find({}).then((result) => {
//     console.log(result);
//     mongoose.connection.close();
// });


// sample for saving data
// const post = new Post({
//     Title: 'Mongo DB setting up',
//     Subtitle: 'For Post model',
//     PostType: 'Databases',
//     CreateDate: new Date(),
//     UpdateDate: new Date(),
//     Author: '@BeRT',
//     ImageURL: ''
// });

// post.save().then( (result) => {
//     //result will be the object that will have a _id unique identify
//     console.log(result);
//     mongoose.connection.close();
// }).catch( (err) => {
//     console.log(`Error ${err}`);
// })
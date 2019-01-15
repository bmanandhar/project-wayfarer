const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	title: {
        type: String,
        required: true,
	},
	body: {
        type: String,
    },
    date: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    city: {
        type: String,
    },
    image: {
        type: String,
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post